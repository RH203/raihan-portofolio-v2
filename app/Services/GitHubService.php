<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class GitHubService
{
    private string $username;
    private string $baseUrl = 'https://api.github.com';

    public function __construct()
    {
        $this->username = config('services.github.username', 'RH203');
    }

    public function getData(): array
    {
        return Cache::remember('github_data', 21600, function () {
            return $this->fetch();
        });
    }

    private function fetch(): array
    {
        $headers = ['Accept' => 'application/vnd.github.v3+json', 'User-Agent' => 'Portfolio-App'];

        $userResp  = Http::withHeaders($headers)->get("{$this->baseUrl}/users/{$this->username}");
        $reposResp = Http::withHeaders($headers)->get("{$this->baseUrl}/users/{$this->username}/repos", [
            'per_page' => 100,
            'sort'     => 'updated',
        ]);

        if ($userResp->failed() || $reposResp->failed()) {
            return $this->emptyData();
        }

        $user  = $userResp->json();
        $repos = collect($reposResp->json())
            ->filter(fn($r) => !$r['fork'] && !$r['private'])
            ->values();

        $totalStars = $repos->sum('stargazers_count');
        $languages  = $repos->groupBy('language')
            ->filter(fn($g, $lang) => $lang !== null)
            ->map(fn($g) => $g->count())
            ->sortDesc()
            ->take(6)
            ->toArray();

        $topRepos = $repos->sortByDesc('stargazers_count')
            ->take(6)
            ->map(fn($r) => [
                'name'        => $r['name'],
                'description' => $r['description'],
                'url'         => $r['html_url'],
                'stars'       => $r['stargazers_count'],
                'forks'       => $r['forks_count'],
                'language'    => $r['language'],
                'updated_at'  => $r['updated_at'],
            ])
            ->values()
            ->toArray();

        return [
            'username'     => $this->username,
            'profile_url'  => "https://github.com/{$this->username}",
            'avatar_url'   => $user['avatar_url'] ?? null,
            'public_repos' => $user['public_repos'] ?? 0,
            'followers'    => $user['followers'] ?? 0,
            'total_stars'  => $totalStars,
            'languages'    => $languages,
            'top_repos'    => $topRepos,
        ];
    }

    private function emptyData(): array
    {
        return [
            'username'     => $this->username,
            'profile_url'  => "https://github.com/{$this->username}",
            'avatar_url'   => null,
            'public_repos' => 0,
            'followers'    => 0,
            'total_stars'  => 0,
            'languages'    => [],
            'top_repos'    => [],
        ];
    }
}
