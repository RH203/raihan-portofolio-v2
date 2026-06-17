<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Building Reliable Laravel APIs for Real Products',
                'slug' => 'building-reliable-laravel-apis-for-real-products',
                'excerpt' => 'Practical lessons for designing Laravel APIs that stay maintainable as features, users, and integrations grow.',
                'content' => '<p>Building an API that works is easy. Building one that remains understandable after months of feature requests is much harder.</p><h2>Start with clear boundaries</h2><p>Keep validation, business rules, persistence, and external integrations separated. Controllers should coordinate the request, not contain the whole application.</p><blockquote>Good architecture is not about adding layers. It is about making change predictable.</blockquote><h2>Design for failure</h2><p>External services will time out, queues will retry, and users will submit the same request twice. Use idempotency, database transactions, structured logs, and sensible retry policies.</p><h2>Measure before optimizing</h2><p>Use query logs, application metrics, and traces to find actual bottlenecks. A simple indexed query is often more valuable than an early caching layer.</p>',
                'tags' => ['Laravel', 'API', 'Architecture'],
                'meta_title' => 'Building Reliable Laravel APIs',
                'meta_description' => 'Practical Laravel API architecture lessons covering boundaries, failures, retries, observability, and maintainability.',
                'is_featured' => true,
                'is_published' => true,
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'What I Learned Building Flutter Apps for Production',
                'slug' => 'what-i-learned-building-flutter-apps-for-production',
                'excerpt' => 'A collection of practical Flutter lessons around state, permissions, environment configuration, and production debugging.',
                'content' => '<p>Production mobile development is less about arranging widgets and more about handling uncertainty.</p><h2>Treat permissions as a flow</h2><p>Location, camera, and notification permissions are states, not one-time dialogs. Your interface should explain what is missing and give the user a clear next action.</p><h2>Separate environments early</h2><p>Development, staging, and production should have explicit configuration. Avoid hidden defaults that can accidentally point a debug build to production services.</p><h2>Log useful context</h2><p>When a request fails, record the endpoint, status, environment, and relevant application state without leaking sensitive data.</p>',
                'tags' => ['Flutter', 'Mobile', 'Production'],
                'meta_title' => 'Flutter Production Lessons',
                'meta_description' => 'Practical lessons from building Flutter applications for production environments.',
                'is_featured' => false,
                'is_published' => true,
                'published_at' => now()->subDays(7),
            ],
            [
                'title' => 'Retry Is a Reliability Pattern, Not a Magic Fix',
                'slug' => 'retry-is-a-reliability-pattern-not-a-magic-fix',
                'excerpt' => 'Retries help with temporary failures, but careless retries can duplicate work and make incidents worse.',
                'content' => '<p>A retry should only be used when the failure is likely temporary and the operation is safe to repeat.</p><h2>Use backoff and jitter</h2><p>Immediate retries can overwhelm an already unhealthy dependency. Exponential backoff with jitter spreads requests over time.</p><h2>Make operations idempotent</h2><p>Use idempotency keys, unique constraints, or explicit state transitions so repeated attempts do not create duplicate records or payments.</p><h2>Know when to stop</h2><p>Permanent validation errors should fail immediately. After the retry limit is reached, move the job to a failed state and provide enough context for investigation.</p>',
                'tags' => ['Backend', 'Reliability', 'Queue'],
                'meta_title' => 'Retry and Backoff Reliability Patterns',
                'meta_description' => 'Understand retry, exponential backoff, jitter, idempotency, and when an operation should fail immediately.',
                'is_featured' => false,
                'is_published' => true,
                'published_at' => now()->subDays(14),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::updateOrCreate(['slug' => $post['slug']], $post);
        }
    }
}
