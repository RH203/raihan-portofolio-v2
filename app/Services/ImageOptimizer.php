<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageOptimizer
{
    public static function storeAsWebP(
        UploadedFile $file,
        string $directory,
        int $maxWidth = 1200,
        int $maxHeight = 1200,
        int $quality = 85
    ): string {
        $ext = strtolower($file->getClientOriginalExtension());

        $image = match ($ext) {
            'png'        => imagecreatefrompng($file->getRealPath()),
            'gif'        => imagecreatefromgif($file->getRealPath()),
            'webp'       => imagecreatefromwebp($file->getRealPath()),
            default      => imagecreatefromjpeg($file->getRealPath()),
        };

        if ($ext === 'png') {
            imagepalettetotruecolor($image);
            imagealphablending($image, true);
            imagesavealpha($image, true);
        }

        [$origW, $origH] = [imagesx($image), imagesy($image)];

        if ($origW > $maxWidth || $origH > $maxHeight) {
            $ratio   = min($maxWidth / $origW, $maxHeight / $origH);
            $newW    = (int) round($origW * $ratio);
            $newH    = (int) round($origH * $ratio);
            $resized = imagecreatetruecolor($newW, $newH);
            $white   = imagecolorallocate($resized, 255, 255, 255);
            imagefilledrectangle($resized, 0, 0, $newW, $newH, $white);
            imagecopyresampled($resized, $image, 0, 0, 0, 0, $newW, $newH, $origW, $origH);
            imagedestroy($image);
            $image = $resized;
        }

        $storagePath = $directory . '/' . Str::random(40) . '.webp';
        $tempPath    = sys_get_temp_dir() . '/' . Str::random(16) . '.webp';

        imagewebp($image, $tempPath, $quality);
        imagedestroy($image);

        Storage::disk('public')->put($storagePath, file_get_contents($tempPath));
        unlink($tempPath);

        return $storagePath;
    }
}
