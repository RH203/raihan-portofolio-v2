<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\Education;
use App\Models\Experience;
use App\Models\PageView;
use App\Models\Project;
use App\Models\Skill;
use App\Services\GitHubService;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(GitHubService $github)
    {
        $last30Days = collect(range(29, 0))->map(fn ($i) => today()->subDays($i)->toDateString());

        $pageViewsRaw = PageView::where('date', '>=', today()->subDays(29))
            ->pluck('count', 'date');

        $pageViewsChart = $last30Days->map(fn ($date) => [
            'date' => Carbon::parse($date)->format('M d'),
            'views' => $pageViewsRaw[$date] ?? 0,
        ])->values()->toArray();

        $contactsRaw = ContactMessage::where('created_at', '>=', today()->subDays(29))
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->pluck('count', 'date');

        $contactsChart = $last30Days->map(fn ($date) => [
            'date' => Carbon::parse($date)->format('M d'),
            'contact' => (int) ($contactsRaw[$date] ?? 0),
        ])->values()->toArray();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'skills' => Skill::count(),
                'experiences' => Experience::count(),
                'education' => Education::count(),
                'projects' => Project::count(),
                'blogs' => BlogPost::count(),
                'publishedBlogs' => BlogPost::published()->count(),
                'draftBlogs' => BlogPost::where('is_published', false)->count(),
                'messages' => ContactMessage::count(),
                'unreadMessages' => ContactMessage::where('is_read', false)->count(),
                'totalViews' => PageView::sum('count'),
            ],
            'recentMessages' => ContactMessage::latest()->take(5)->get(),
            'recentPosts' => BlogPost::latest('updated_at')->take(5)->get([
                'id', 'title', 'slug', 'excerpt', 'cover_image', 'is_published', 'is_featured', 'published_at', 'updated_at',
            ]),
            'pageViewsChart' => $pageViewsChart,
            'contactsChart' => $contactsChart,
            'github' => $github->getData(),
        ]);
    }
}
