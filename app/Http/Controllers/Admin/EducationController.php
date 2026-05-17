<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationController extends Controller
{
    public function index(Request $request)
    {
        $query = Education::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('institution', 'like', "%{$search}%")
                  ->orWhere('program', 'like', "%{$search}%");
            });
        }

        return Inertia::render('admin/education/index', [
            'education' => $query->orderBy('sort_order')->get(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/education/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'program' => 'required|string|max:255',
            'start_year' => 'required|integer|min:1900|max:2100',
            'end_year' => 'nullable|integer|min:1900|max:2100|gte:start_year',
            'description' => 'nullable|string|max:2000',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        Education::create($validated);

        return redirect()->route('admin.education.index')->with('success', 'Education entry created successfully.');
    }

    public function edit(Education $education)
    {
        return Inertia::render('admin/education/form', [
            'education' => $education,
        ]);
    }

    public function update(Request $request, Education $education)
    {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'program' => 'required|string|max:255',
            'start_year' => 'required|integer|min:1900|max:2100',
            'end_year' => 'nullable|integer|min:1900|max:2100|gte:start_year',
            'description' => 'nullable|string|max:2000',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $education->update($validated);

        return redirect()->route('admin.education.index')->with('success', 'Education entry updated successfully.');
    }

    public function destroy(Education $education)
    {
        $education->delete();

        return back()->with('success', 'Education entry deleted successfully.');
    }
}
