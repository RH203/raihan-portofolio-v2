<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        return Inertia::render('blog/index', [
            'featured' => BlogPost::published()->where('is_featured', true)->latest('published_at')->first(),
            'posts' => BlogPost::published()->latest('published_at')->paginate(9)->through(fn (BlogPost $post) => $this->summary($post)),
        ]);
    }

    public function show(BlogPost $blogPost)
    {
        abort_unless($blogPost->is_published && $blogPost->published_at?->isPast(), 404);

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
            ->map(fn (BlogPost $post) => $this->summary($post));

        return Inertia::render('blog/show', [
            'post' => array_merge($blogPost->toArray(), [
                'html' => Str::markdown($blogPost->content, [
                    'html_input' => 'strip',
                    'allow_unsafe_links' => false,
                ]),
            ]),
            'related' => $related,
        ]);
    }

    private function summary(BlogPost $post): array
    {
        return $post->only([
            'id', 'title', 'slug', 'excerpt', 'cover_image', 'tags', 'reading_time', 'published_at', 'is_featured',
        ]);
    }
}
