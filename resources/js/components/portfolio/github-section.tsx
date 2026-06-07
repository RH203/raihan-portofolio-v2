import type { GitHubData } from '@/types';
import { ExternalLink, GitFork, Star, Users, BookOpen, Code2 } from 'lucide-react';

interface Props {
    github: GitHubData;
}

const LANG_COLORS: Record<string, string> = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-400',
    PHP: 'bg-purple-500',
    Dart: 'bg-cyan-500',
    Python: 'bg-green-500',
    CSS: 'bg-pink-500',
    HTML: 'bg-orange-500',
    Go: 'bg-teal-500',
    Rust: 'bg-orange-700',
    Java: 'bg-red-600',
    'C#': 'bg-green-700',
    Swift: 'bg-orange-500',
    Kotlin: 'bg-purple-600',
    Shell: 'bg-gray-500',
};

export function GitHubSection({ github }: Props) {
    if (github.top_repos.length === 0 && github.public_repos === 0) return null;

    const totalLangCount = Object.values(github.languages).reduce((a, b) => a + b, 0);

    return (
        <section id="github" className="py-24" aria-labelledby="github-heading">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-10 flex flex-col gap-6 border-b border-surface-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-end gap-4">
                        <span className="font-mono text-sm text-primary-600">05</span>
                        <div>
                            <h2 id="github-heading" className="text-3xl font-bold tracking-tight text-surface-900 sm:text-4xl">
                                GitHub Activity
                            </h2>
                            <p className="mt-1.5 text-sm text-surface-500">My open-source contributions and public repositories</p>
                        </div>
                    </div>

                    {/* Figures — inline ledger, not boxed stat cards */}
                    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 sm:justify-end">
                        {[
                            { icon: BookOpen, label: 'Repos', value: github.public_repos },
                            { icon: Star, label: 'Stars', value: github.total_stars },
                            { icon: Users, label: 'Followers', value: github.followers },
                            { icon: Code2, label: 'Languages', value: Object.keys(github.languages).length },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex items-baseline gap-1.5">
                                <Icon className="h-3.5 w-3.5 self-center text-surface-300" aria-hidden="true" />
                                <span className="text-xl font-bold text-surface-900">{value}</span>
                                <span className="text-xs text-surface-400">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid gap-x-12 gap-y-10 lg:grid-cols-5">
                    {/* Top repos — ranked rows */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-1 text-xs font-semibold tracking-[0.2em] text-surface-400 uppercase">Top Repositories</h3>
                        <div className="divide-y divide-surface-100">
                            {github.top_repos.map((repo, index) => (
                                <a
                                    key={repo.name}
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-4 py-4"
                                >
                                    <span className="pt-0.5 font-mono text-xs text-surface-300">0{index + 1}</span>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="truncate text-sm font-semibold text-surface-900 transition-colors group-hover:text-primary-600">
                                                {repo.name}
                                            </p>
                                            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-surface-300 opacity-0 transition-opacity group-hover:opacity-100" />
                                        </div>
                                        {repo.description && <p className="mt-1 line-clamp-2 text-xs text-surface-500">{repo.description}</p>}
                                        <div className="mt-2 flex items-center gap-4">
                                            {repo.language && (
                                                <span className="flex items-center gap-1.5 text-xs text-surface-400">
                                                    <span className={`h-2 w-2 rounded-full ${LANG_COLORS[repo.language] ?? 'bg-surface-400'}`} />
                                                    {repo.language}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1 text-xs text-surface-400">
                                                <Star className="h-3 w-3" /> {repo.stars}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-surface-400">
                                                <GitFork className="h-3 w-3" /> {repo.forks}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Language breakdown */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] text-surface-400 uppercase">Languages</h3>
                        <div className="space-y-3.5">
                            {Object.entries(github.languages).map(([lang, count]) => {
                                const pct = totalLangCount > 0 ? Math.round((count / totalLangCount) * 100) : 0;
                                return (
                                    <div key={lang}>
                                        <div className="mb-1 flex items-center justify-between">
                                            <span className="flex items-center gap-1.5 text-sm text-surface-700">
                                                <span className={`h-2.5 w-2.5 rounded-full ${LANG_COLORS[lang] ?? 'bg-surface-400'}`} />
                                                {lang}
                                            </span>
                                            <span className="font-mono text-xs text-surface-400">{pct}%</span>
                                        </div>
                                        <div className="h-1 w-full bg-surface-100">
                                            <div className={`h-1 ${LANG_COLORS[lang] ?? 'bg-surface-400'}`} style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <a
                            href={github.profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 border-b border-surface-300 pb-0.5 text-sm font-medium text-surface-600 transition-colors hover:border-primary-600 hover:text-primary-600"
                        >
                            View GitHub Profile
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
