<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::published()
            ->latest('published_at')
            ->paginate(9)
            ->through(fn (BlogPost $post) => $this->summary($post));

        return Inertia::render('blog/index', [
            'featured' => BlogPost::published()
                ->where('is_featured', true)
                ->latest('published_at')
                ->first() ?? BlogPost::published()->latest('published_at')->first(),
            'posts' => $posts,
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

        $post = $blogPost->toArray();
        $post['html'] = $blogPost->content;

        return Inertia::render('blog/show', [
            'post' => $post,
            'related' => $related,
        ]);
    }

    public function recordShare(Request $request, BlogPost $blogPost): JsonResponse
    {
        abort_unless($blogPost->is_published && $blogPost->published_at?->isPast(), 404);

        $validated = $request->validate([
            'platform' => ['required', Rule::in(['x', 'linkedin', 'copy'])],
        ]);

        $column = match ($validated['platform']) {
            'x' => 'x_share_count',
            'linkedin' => 'linkedin_share_count',
            'copy' => 'copy_share_count',
        };

        BlogPost::whereKey($blogPost->getKey())->increment($column);
        $blogPost->refresh();

        return response()->json([
            'share_count' => $blogPost->share_count,
            'shares' => [
                'x' => $blogPost->x_share_count,
                'linkedin' => $blogPost->linkedin_share_count,
                'copy' => $blogPost->copy_share_count,
            ],
        ]);
    }

    private function summary(BlogPost $post): array
    {
        return $post->only([
            'id', 'title', 'slug', 'excerpt', 'cover_image', 'tags', 'reading_time', 'share_count', 'published_at', 'is_featured',
        ]);
    }
}
