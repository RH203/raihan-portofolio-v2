<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    public function index(Request $request)
    {
        $query = Skill::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        return Inertia::render('admin/skills/index', [
            'skills' => $query->orderBy('category')->orderBy('sort_order')->get(),
            'categories' => Skill::CATEGORIES,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/skills/form', [
            'categories' => Skill::CATEGORIES,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:' . implode(',', Skill::CATEGORIES),
            'icon' => 'required|string|max:100',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        Skill::create($validated);

        return redirect()->route('admin.skills.index')->with('success', 'Skill created successfully.');
    }

    public function edit(Skill $skill)
    {
        return Inertia::render('admin/skills/form', [
            'skill' => $skill,
            'categories' => Skill::CATEGORIES,
        ]);
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:' . implode(',', Skill::CATEGORIES),
            'icon' => 'required|string|max:100',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $skill->update($validated);

        return redirect()->route('admin.skills.index')->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return back()->with('success', 'Skill deleted successfully.');
    }
}
