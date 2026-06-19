<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

class ImageOptimizer
{
    public static function storeAsWebP(
        UploadedFile $file,
        string $directory,
        int $maxWidth = 1200,
        int $maxHeight = 1200,
        int $quality = 85
    ): string {
        return self::storePathAsWebP(
            $file->getRealPath(),
            $file->getClientOriginalExtension(),
            $directory,
            $maxWidth,
            $maxHeight,
            $quality
        );
    }

    public static function storePathAsWebP(
        string $sourcePath,
        string $extension,
        string $directory,
        int $maxWidth = 1200,
        int $maxHeight = 1200,
        int $quality = 85
    ): string {
        if (! is_file($sourcePath)) {
            throw new RuntimeException("Image source does not exist: {$sourcePath}");
        }

        $ext = strtolower($extension);
        $image = match ($ext) {
            'png' => imagecreatefrompng($sourcePath),
            'gif' => imagecreatefromgif($sourcePath),
            'webp' => imagecreatefromwebp($sourcePath),
            default => imagecreatefromjpeg($sourcePath),
        };

        if ($image === false) {
            throw new RuntimeException('Unable to decode uploaded image.');
        }

        if (in_array($ext, ['png', 'gif', 'webp'], true)) {
            imagepalettetotruecolor($image);
            imagealphablending($image, true);
            imagesavealpha($image, true);
        }

        [$origW, $origH] = [imagesx($image), imagesy($image)];

        if ($origW > $maxWidth || $origH > $maxHeight) {
            $ratio = min($maxWidth / $origW, $maxHeight / $origH);
            $newW = (int) round($origW * $ratio);
            $newH = (int) round($origH * $ratio);
            $resized = imagecreatetruecolor($newW, $newH);
            $white = imagecolorallocate($resized, 255, 255, 255);
            imagefilledrectangle($resized, 0, 0, $newW, $newH, $white);
            imagecopyresampled($resized, $image, 0, 0, 0, 0, $newW, $newH, $origW, $origH);
            imagedestroy($image);
            $image = $resized;
        }

        $storagePath = $directory.'/'.Str::random(40).'.webp';
        $tempPath = sys_get_temp_dir().'/'.Str::random(16).'.webp';

        if (! imagewebp($image, $tempPath, $quality)) {
            imagedestroy($image);
            throw new RuntimeException('Unable to encode image as WebP.');
        }

        imagedestroy($image);
        Storage::disk('public')->put($storagePath, file_get_contents($tempPath));
        unlink($tempPath);

        return $storagePath;
    }
}
