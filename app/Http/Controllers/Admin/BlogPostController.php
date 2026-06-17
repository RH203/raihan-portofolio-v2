<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
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

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['slug'] = $this->uniqueSlug($data['title']);
        $data['cover_image'] = $request->file('cover_image')?->store('blog', 'public');
        $data['published_at'] = $data['is_published'] ? ($data['published_at'] ?: now()) : null;

        BlogPost::create($data);

        return to_route('admin.blog.index')->with('success', 'Story created.');
    }

    public function edit(BlogPost $blogPost)
    {
        return Inertia::render('admin/blog/form', ['post' => $blogPost]);
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $data = $this->validated($request, $blogPost);
        $data['slug'] = $data['title'] === $blogPost->title ? $blogPost->slug : $this->uniqueSlug($data['title'], $blogPost->id);
        $data['published_at'] = $data['is_published'] ? ($data['published_at'] ?: $blogPost->published_at ?: now()) : null;

        if ($request->hasFile('cover_image')) {
            if ($blogPost->cover_image) Storage::disk('public')->delete($blogPost->cover_image);
            $data['cover_image'] = $request->file('cover_image')->store('blog', 'public');
        } else {
            unset($data['cover_image']);
        }

        $blogPost->update($data);

        return to_route('admin.blog.index')->with('success', 'Story updated.');
    }

    public function destroy(BlogPost $blogPost)
    {
        if ($blogPost->cover_image) Storage::disk('public')->delete($blogPost->cover_image);
        $blogPost->delete();

        return back()->with('success', 'Story deleted.');
    }

    private function validated(Request $request, ?BlogPost $post = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['required', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'cover_image' => [$post ? 'nullable' : 'nullable', 'image', 'max:4096'],
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

        while (BlogPost::where('slug', $slug)->when($ignoreId, fn ($q) => $q->whereKeyNot($ignoreId))->exists()) {
            $slug = "{$base}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
