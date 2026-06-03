<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use App\Traits\ClearsPortfolioCache;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SocialLinkController extends Controller
{
    use ClearsPortfolioCache;
    public function index()
    {
        return Inertia::render('admin/social-links/index', [
            'socialLinks' => SocialLink::orderBy('sort_order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/social-links/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:50',
            'url' => 'required|url|max:500',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        SocialLink::create($validated);
        $this->clearPortfolioCache();

        return redirect()->route('admin.social-links.index')->with('success', 'Social link created successfully.');
    }

    public function edit(SocialLink $socialLink)
    {
        return Inertia::render('admin/social-links/form', [
            'socialLink' => $socialLink,
        ]);
    }

    public function update(Request $request, SocialLink $socialLink)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:50',
            'url' => 'required|url|max:500',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $socialLink->update($validated);
        $this->clearPortfolioCache();

        return redirect()->route('admin.social-links.index')->with('success', 'Social link updated successfully.');
    }

    public function destroy(SocialLink $socialLink)
    {
        $socialLink->delete();
        $this->clearPortfolioCache();

        return back()->with('success', 'Social link deleted successfully.');
    }
}
