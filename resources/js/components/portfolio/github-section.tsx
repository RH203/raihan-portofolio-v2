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
        <section id="github" className="py-20 bg-surface-50/50" aria-labelledby="github-heading">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-14">
                    <p className="text-primary-600 font-medium text-sm tracking-wide uppercase mb-2">Open Source</p>
                    <h2 id="github-heading" className="text-3xl sm:text-4xl font-bold text-surface-900">
                        GitHub Activity
                    </h2>
                    <p className="mt-3 text-surface-500 max-w-xl mx-auto">
                        My open-source contributions and public repositories
                    </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                    {[
                        { icon: BookOpen, label: 'Repositories', value: github.public_repos },
                        { icon: Star, label: 'Total Stars', value: github.total_stars },
                        { icon: Users, label: 'Followers', value: github.followers },
                        { icon: Code2, label: 'Languages', value: Object.keys(github.languages).length },
                    ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="bg-white rounded-xl border border-surface-100 p-5 shadow-sm text-center">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 mb-3">
                                <Icon className="h-5 w-5" />
                            </div>
                            <p className="text-2xl font-bold text-surface-900">{value}</p>
                            <p className="text-xs text-surface-500 mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Top repos */}
                    <div className="lg:col-span-2 space-y-3">
                        <h3 className="text-sm font-semibold text-surface-700 uppercase tracking-wide mb-4">Top Repositories</h3>
                        {github.top_repos.map((repo) => (
                            <a
                                key={repo.name}
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start justify-between gap-4 bg-white rounded-xl border border-surface-100 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-surface-900 text-sm group-hover:text-primary-600 transition-colors truncate">
                                            {repo.name}
                                        </p>
                                        <ExternalLink className="h-3.5 w-3.5 text-surface-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    {repo.description && (
                                        <p className="text-xs text-surface-500 mt-1 line-clamp-2">{repo.description}</p>
                                    )}
                                    <div className="flex items-center gap-3 mt-2">
                                        {repo.language && (
                                            <span className="flex items-center gap-1 text-xs text-surface-400">
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

                    {/* Language breakdown */}
                    <div className="bg-white rounded-xl border border-surface-100 p-5 shadow-sm h-fit">
                        <h3 className="text-sm font-semibold text-surface-700 uppercase tracking-wide mb-4">Languages</h3>
                        <div className="space-y-3">
                            {Object.entries(github.languages).map(([lang, count]) => {
                                const pct = totalLangCount > 0 ? Math.round((count / totalLangCount) * 100) : 0;
                                return (
                                    <div key={lang}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="flex items-center gap-1.5 text-sm text-surface-700">
                                                <span className={`h-2.5 w-2.5 rounded-full ${LANG_COLORS[lang] ?? 'bg-surface-400'}`} />
                                                {lang}
                                            </span>
                                            <span className="text-xs text-surface-400">{pct}%</span>
                                        </div>
                                        <div className="h-1.5 w-full rounded-full bg-surface-100">
                                            <div
                                                className={`h-1.5 rounded-full ${LANG_COLORS[lang] ?? 'bg-surface-400'}`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <a
                            href={github.profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-surface-200 text-sm font-medium text-surface-600 hover:bg-surface-50 hover:border-primary-300 hover:text-primary-600 transition-colors"
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
