<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\ProcessBlogCoverImage;
use App\Models\BlogPost;
use App\Services\BlogCacheService;
use App\Services\ImageOptimizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/blog/index', [
            'posts' => BlogPost::latest('updated_at')->paginate(15),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/blog/form');
    }

    public function store(Request $request, BlogCacheService $cache)
    {
        $data = $this->validated($request);
        $cover = $request->file('cover_image');
        unset($data['cover_image']);

        $data['slug'] = $this->uniqueSlug($data['title']);
        $data['published_at'] = $data['is_published'] ? ($data['published_at'] ?: now()) : null;
        $data['cover_image_status'] = $cover ? 'processing' : 'completed';

        $blogPost = BlogPost::create($data);

        if ($cover) {
            $temporaryPath = $cover->store('temporary/blog-covers', 'local');
            ProcessBlogCoverImage::dispatch(
                $blogPost->id,
                $temporaryPath,
                $cover->getClientOriginalExtension()
            );
        }

        Cache::forget('portfolio_data');
        $cache->flush();

        $message = $cover
            ? 'Story created. The cover image is being processed.'
            : 'Story created.';

        return to_route('admin.blog.index')->with('success', $message);
    }

    public function edit(BlogPost $blogPost)
    {
        return Inertia::render('admin/blog/form', ['post' => $blogPost]);
    }

    public function update(Request $request, BlogPost $blogPost, BlogCacheService $cache)
    {
        $data = $this->validated($request, $blogPost);
        $cover = $request->file('cover_image');
        unset($data['cover_image']);

        $data['slug'] = $data['title'] === $blogPost->title
            ? $blogPost->slug
            : $this->uniqueSlug($data['title'], $blogPost->id);
        $data['published_at'] = $data['is_published']
            ? ($data['published_at'] ?: $blogPost->published_at ?: now())
            : null;

        if ($cover) {
            $data['cover_image_status'] = 'processing';
        }

        $oldCoverPath = $blogPost->cover_image;
        $blogPost->update($data);

        if ($cover) {
            $temporaryPath = $cover->store('temporary/blog-covers', 'local');
            ProcessBlogCoverImage::dispatch(
                $blogPost->id,
                $temporaryPath,
                $cover->getClientOriginalExtension(),
                $oldCoverPath
            );
        }

        Cache::forget('portfolio_data');
        $cache->flush();

        $message = $cover
            ? 'Story updated. The new cover image is being processed.'
            : 'Story updated.';

        return to_route('admin.blog.index')->with('success', $message);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'image' => ['required', 'image', 'max:5120'],
        ]);

        $path = ImageOptimizer::storeAsWebP(
            $validated['image'],
            'blog/content',
            1600,
            1600,
            82
        );

        return response()->json([
            'url' => Storage::disk('public')->url($path),
            'path' => $path,
        ]);
    }

    public function destroy(BlogPost $blogPost, BlogCacheService $cache)
    {
        if ($blogPost->cover_image) {
            Storage::disk('public')->delete($blogPost->cover_image);
        }

        $blogPost->delete();
        Cache::forget('portfolio_data');
        $cache->flush();

        return back()->with('success', 'Story deleted.');
    }

    private function validated(Request $request, ?BlogPost $post = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['required', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'cover_image' => ['nullable', 'image', 'max:4096'],
            'tags' => ['nullable', 'array', 'max:5'],
            'tags.*' => ['string', 'max:40'],
            'meta_title' => ['nullable', 'string', 'max:60'],
            'meta_description' => ['nullable', 'string', 'max:160'],
            'is_featured' => ['boolean'],
            'is_published' => ['boolean'],
            'published_at' => ['nullable', 'date'],
        ]);
    }

    private function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: Str::random(8);
        $slug = $base;
        $counter = 2;

        while (BlogPost::where('slug', $slug)
            ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
            ->exists()) {
            $slug = "{$base}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
