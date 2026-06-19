<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Services\BlogCacheService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request, BlogCacheService $cache)
    {
        $data = $cache->index(max(1, $request->integer('page', 1)));

        return Inertia::render('blog/index', $data);
    }

    public function show(BlogPost $blogPost, BlogCacheService $cache)
    {
        abort_unless($blogPost->is_published && $blogPost->published_at?->isPast(), 404);

        $data = $cache->article($blogPost);
        $data['post'] = array_merge($data['post'], [
            'x_share_count' => $blogPost->x_share_count,
            'linkedin_share_count' => $blogPost->linkedin_share_count,
            'copy_share_count' => $blogPost->copy_share_count,
            'share_count' => $blogPost->share_count,
        ]);

        return Inertia::render('blog/show', $data);
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
}
