<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hero;
use App\Services\ImageOptimizer;
use App\Traits\ClearsPortfolioCache;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroController extends Controller
{
    use ClearsPortfolioCache;
    public function edit()
    {
        return Inertia::render('admin/hero/edit', [
            'hero' => Hero::first(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'headline' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'primary_cta_text' => 'required|string|max:50',
            'secondary_cta_text' => 'required|string|max:50',
            'develop_mode' => 'nullable|boolean',
            'is_open_to_work' => 'nullable|boolean',
            'photo' => 'nullable|image|max:2048',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        $hero = Hero::firstOrNew();

        if ($request->hasFile('photo')) {
            if ($hero->photo_url) {
                Storage::disk('public')->delete($hero->photo_url);
            }
            $validated['photo_url'] = ImageOptimizer::storeAsWebP($request->file('photo'), 'hero', 480, 600, 90);
        }

        if ($request->hasFile('cv')) {
            if ($hero->cv_url) {
                Storage::disk('public')->delete($hero->cv_url);
            }
            $validated['cv_url'] = $request->file('cv')->store('hero/cv', 'public');
        }

        // Handle CV removal
        if ($request->boolean('remove_cv') && $hero->cv_url) {
            Storage::disk('public')->delete($hero->cv_url);
            $validated['cv_url'] = null;
        }

        unset($validated['photo'], $validated['cv']);
        $validated['develop_mode'] = $request->boolean('develop_mode');
        $validated['is_open_to_work'] = $request->boolean('is_open_to_work');
        $hero->fill($validated);
        $hero->save();
        $this->clearPortfolioCache();

        return back()->with('success', 'Hero section updated successfully.');
    }
}
