<?php

namespace App\Jobs;

use App\Models\BlogPost;
use App\Services\BlogCacheService;
use App\Services\ImageOptimizer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Throwable;

class ProcessBlogCoverImage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 120;
    public array $backoff = [10, 30, 60];

    public function __construct(
        public int $blogPostId,
        public string $temporaryPath,
        public string $extension,
        public ?string $oldCoverPath = null,
    ) {
        $this->onConnection('redis');
    }

    public function handle(BlogCacheService $cache): void
    {
        $blogPost = BlogPost::findOrFail($this->blogPostId);
        $sourcePath = Storage::disk('local')->path($this->temporaryPath);

        $newPath = ImageOptimizer::storePathAsWebP(
            $sourcePath,
            $this->extension,
            'blog/covers',
            1600,
            900,
            84
        );

        $blogPost->update([
            'cover_image' => $newPath,
            'cover_image_status' => 'completed',
        ]);

        if ($this->oldCoverPath && $this->oldCoverPath !== $newPath) {
            Storage::disk('public')->delete($this->oldCoverPath);
        }

        Storage::disk('local')->delete($this->temporaryPath);
        Cache::forget('portfolio_data');
        $cache->flush();
    }

    public function failed(Throwable $exception): void
    {
        BlogPost::whereKey($this->blogPostId)->update([
            'cover_image_status' => 'failed',
        ]);

        Storage::disk('local')->delete($this->temporaryPath);
        Cache::forget('portfolio_data');
        Cache::store('redis')->tags(['blog'])->flush();
    }
}
