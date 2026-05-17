<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        return Inertia::render('admin/projects/index', [
            'projects' => $query->orderBy('sort_order')->get(),
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/projects/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'thumbnail' => 'nullable|image|max:2048',
            'description' => 'nullable|string|max:2000',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:100',
            'demo_url' => 'nullable|url|max:255',
            'repository_url' => 'nullable|url|max:255',
            'category' => 'required|string|max:100',
            'is_featured' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail_url'] = $request->file('thumbnail')->store('projects', 'public');
        }

        unset($validated['thumbnail']);
        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('admin/projects/form', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'thumbnail' => 'nullable|image|max:2048',
            'description' => 'nullable|string|max:2000',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:100',
            'demo_url' => 'nullable|url|max:255',
            'repository_url' => 'nullable|url|max:255',
            'category' => 'required|string|max:100',
            'is_featured' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail_url) {
                Storage::disk('public')->delete($project->thumbnail_url);
            }
            $validated['thumbnail_url'] = $request->file('thumbnail')->store('projects', 'public');
        }

        unset($validated['thumbnail']);
        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        if ($project->thumbnail_url) {
            Storage::disk('public')->delete($project->thumbnail_url);
        }

        $project->delete();

        return back()->with('success', 'Project deleted successfully.');
    }
}
