<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroController extends Controller
{
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
            'photo' => 'nullable|image|max:2048',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        $hero = Hero::firstOrNew();

        if ($request->hasFile('photo')) {
            if ($hero->photo_url) {
                Storage::disk('public')->delete($hero->photo_url);
            }
            $validated['photo_url'] = $request->file('photo')->store('hero', 'public');
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
        $hero->fill($validated);
        $hero->save();

        return back()->with('success', 'Hero section updated successfully.');
    }
}
