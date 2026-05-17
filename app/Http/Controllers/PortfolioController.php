<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Hero;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        return Inertia::render('portfolio/index', [
            'hero' => Hero::first(),
            'skills' => Skill::orderBy('category')->orderBy('sort_order')->get(),
            'experiences' => Experience::orderBy('sort_order')->get(),
            'education' => Education::orderBy('sort_order')->get(),
            'projects' => Project::orderBy('sort_order')->get(),
            'socialLinks' => SocialLink::where('is_active', true)->orderBy('sort_order')->get(),
        ]);
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        ContactMessage::create($validated);

        return back()->with('success', 'Thank you for your message! I\'ll get back to you soon.');
    }
}
