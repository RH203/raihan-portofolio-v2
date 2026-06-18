<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\SocialLinkController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PortfolioController;
use App\Http\Middleware\TrackPageView;
use App\Models\BlogPost;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->middleware(TrackPageView::class)->name('home');
Route::post('/contact', [PortfolioController::class, 'submitContact'])->name('contact.submit');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{blogPost:slug}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/sitemap.xml', function () {
    $urls = collect([
        ['loc' => route('home'), 'lastmod' => now()->toDateString()],
        ['loc' => route('blog.index'), 'lastmod' => BlogPost::published()->max('updated_at')?->toDateString() ?? now()->toDateString()],
    ])->merge(BlogPost::published()->get()->map(fn (BlogPost $post) => [
        'loc' => route('blog.show', $post),
        'lastmod' => $post->updated_at->toDateString(),
    ]));

    return response()->view('sitemap', compact('urls'))->header('Content-Type', 'application/xml');
})->name('sitemap');

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/admin/login', [AuthController::class, 'login'])->name('login.submit');
});

Route::post('/admin/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/hero', [HeroController::class, 'edit'])->name('hero.edit');
    Route::post('/hero', [HeroController::class, 'update'])->name('hero.update');
    Route::resource('skills', SkillController::class)->except(['show']);
    Route::delete('/skills', [SkillController::class, 'destroyBulk'])->name('skills.destroy-bulk');
    Route::resource('experiences', ExperienceController::class)->except(['show']);
    Route::resource('education', EducationController::class)->except(['show']);
    Route::resource('projects', ProjectController::class)->except(['show']);
    Route::post('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update.post');

    Route::post('/blog/upload-image', [BlogPostController::class, 'uploadImage'])->name('blog.upload-image');
    Route::get('/blog', [BlogPostController::class, 'index'])->name('blog.index');
    Route::get('/blog/create', [BlogPostController::class, 'create'])->name('blog.create');
    Route::post('/blog', [BlogPostController::class, 'store'])->name('blog.store');
    Route::get('/blog/{blogPost:id}/edit', [BlogPostController::class, 'edit'])->name('blog.edit');
    Route::put('/blog/{blogPost:id}', [BlogPostController::class, 'update'])->name('blog.update');
    Route::patch('/blog/{blogPost:id}', [BlogPostController::class, 'update']);
    Route::post('/blog/{blogPost:id}', [BlogPostController::class, 'update'])->name('blog.update.post');
    Route::delete('/blog/{blogPost:id}', [BlogPostController::class, 'destroy'])->name('blog.destroy');

    Route::get('/messages', [ContactMessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{message}', [ContactMessageController::class, 'show'])->name('messages.show');
    Route::patch('/messages/{message}/toggle-read', [ContactMessageController::class, 'toggleRead'])->name('messages.toggle-read');
    Route::delete('/messages/{message}', [ContactMessageController::class, 'destroy'])->name('messages.destroy');
    Route::resource('social-links', SocialLinkController::class)->except(['show']);
});
