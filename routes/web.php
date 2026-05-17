<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::post('/contact', [PortfolioController::class, 'submitContact'])->name('contact.submit');

// Auth routes
Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/admin/login', [AuthController::class, 'login'])->name('login.submit');
});

Route::post('/admin/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Admin routes
Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Hero
    Route::get('/hero', [HeroController::class, 'edit'])->name('hero.edit');
    Route::post('/hero', [HeroController::class, 'update'])->name('hero.update');

    // Skills
    Route::resource('skills', SkillController::class)->except(['show']);

    // Experiences
    Route::resource('experiences', ExperienceController::class)->except(['show']);

    // Education
    Route::resource('education', EducationController::class)->except(['show']);

    // Projects
    Route::resource('projects', ProjectController::class)->except(['show']);
    Route::post('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update.post');

    // Contact Messages
    Route::get('/messages', [ContactMessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{message}', [ContactMessageController::class, 'show'])->name('messages.show');
    Route::patch('/messages/{message}/toggle-read', [ContactMessageController::class, 'toggleRead'])->name('messages.toggle-read');
    Route::delete('/messages/{message}', [ContactMessageController::class, 'destroy'])->name('messages.destroy');
});
