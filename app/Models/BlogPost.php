<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'excerpt', 'content', 'cover_image', 'tags',
        'meta_title', 'meta_description', 'is_featured', 'is_published', 'published_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'x_share_count' => 'integer',
        'linkedin_share_count' => 'integer',
        'copy_share_count' => 'integer',
    ];

    protected $appends = ['reading_time', 'share_count'];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function getReadingTimeAttribute(): int
    {
        $words = str_word_count(trim(strip_tags($this->content ?? '')));

        return max(1, (int) ceil($words / 200));
    }

    public function getShareCountAttribute(): int
    {
        return (int) $this->x_share_count
            + (int) $this->linkedin_share_count
            + (int) $this->copy_share_count;
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
