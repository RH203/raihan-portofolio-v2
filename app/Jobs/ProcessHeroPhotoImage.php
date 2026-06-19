<?php

namespace App\Jobs;

use App\Models\Hero;
use App\Services\ImageOptimizer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Throwable;

class ProcessHeroPhotoImage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 120;
    public array $backoff = [10, 30, 60];

    public function __construct(
        public int $heroId,
        public string $temporaryPath,
        public string $extension,
        public ?string $oldPhotoPath = null,
    ) {
        $this->onConnection('redis');
        $this->onQueue('images');
    }

    public function handle(): void
    {
        $hero = Hero::findOrFail($this->heroId);
        $sourcePath = Storage::disk('local')->path($this->temporaryPath);

        $newPath = ImageOptimizer::storePathAsWebP(
            $sourcePath,
            $this->extension,
            'hero',
            480,
            600,
            90
        );

        $hero->update([
            'photo_url' => $newPath,
            'photo_processing_status' => 'completed',
        ]);

        if ($this->oldPhotoPath && $this->oldPhotoPath !== $newPath) {
            Storage::disk('public')->delete($this->oldPhotoPath);
        }

        Storage::disk('local')->delete($this->temporaryPath);
        Cache::forget('portfolio_data');
    }

    public function failed(Throwable $exception): void
    {
        Hero::whereKey($this->heroId)->update([
            'photo_processing_status' => 'failed',
        ]);

        Storage::disk('local')->delete($this->temporaryPath);
    }
}
