<?php

namespace App\Services;

use App\Models\BlogPost;
use Illuminate\Support\Facades\Cache;

class BlogCacheService
{
    private const STORE = 'redis';
    private const TAG = 'blog';
    private const TTL_SECONDS = 3600;

    public function index(int $page): array
    {
        return Cache::store(self::STORE)
            ->tags([self::TAG])
            ->remember("blog:index:page:{$page}", self::TTL_SECONDS, function () {
                $posts = BlogPost::published()
                    ->latest('published_at')
                    ->paginate(9)
                    ->through(fn (BlogPost $post) => $this->summary($post))
                    ->toArray();

                $featured = BlogPost::published()
                    ->where('is_featured', true)
                    ->latest('published_at')
                    ->first() ?? BlogPost::published()->latest('published_at')->first();

                return [
                    'featured' => $featured ? $this->summary($featured) : null,
                    'posts' => $posts,
                ];
            });
    }

    public function article(BlogPost $blogPost): array
    {
        return Cache::store(self::STORE)
            ->tags([self::TAG])
            ->remember("blog:article:{$blogPost->slug}", self::TTL_SECONDS, function () use ($blogPost) {
                $related = BlogPost::published()
                    ->whereKeyNot($blogPost->getKey())
                    ->when($blogPost->tags, fn ($query) => $query->where(function ($query) use ($blogPost) {
                        foreach ($blogPost->tags as $tag) {
                            $query->orWhereJsonContains('tags', $tag);
                        }
                    }))
                    ->latest('published_at')
                    ->limit(3)
                    ->get()
                    ->map(fn (BlogPost $post) => $this->summary($post))
                    ->values()
                    ->toArray();

                $post = $blogPost->toArray();
                unset(
                    $post['x_share_count'],
                    $post['linkedin_share_count'],
                    $post['copy_share_count'],
                    $post['share_count']
                );
                $post['html'] = $blogPost->content;

                return [
                    'post' => $post,
                    'related' => $related,
                ];
            });
    }

    public function flush(): void
    {
        Cache::store(self::STORE)->tags([self::TAG])->flush();
    }

    private function summary(BlogPost $post): array
    {
        return $post->only([
            'id',
            'title',
            'slug',
            'excerpt',
            'cover_image',
            'cover_image_status',
            'tags',
            'reading_time',
            'published_at',
            'is_featured',
        ]);
    }
}
