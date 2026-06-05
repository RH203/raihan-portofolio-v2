import AdminLayout from '@/layouts/admin-layout';
import type { ChartPoint, ContactMessage, DashboardStats, GitHubData } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    Briefcase,
    Eye,
    FolderKanban,
    GitFork,
    GraduationCap,
    Mail,
    MessageSquare,
    Star,
    Users,
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
    stats: DashboardStats;
    recentMessages: ContactMessage[];
    pageViewsChart: ChartPoint[];
    contactsChart: ChartPoint[];
    github: GitHubData;
}

const statCards = [
    { key: 'skills' as const, label: 'Skills', icon: BookOpen, iconCls: 'text-blue-500', href: '/admin/skills' },
    { key: 'experiences' as const, label: 'Experiences', icon: Briefcase, iconCls: 'text-violet-500', href: '/admin/experiences' },
    { key: 'education' as const, label: 'Education', icon: GraduationCap, iconCls: 'text-emerald-500', href: '/admin/education' },
    { key: 'projects' as const, label: 'Projects', icon: FolderKanban, iconCls: 'text-amber-500', href: '/admin/projects' },
    { key: 'messages' as const, label: 'Messages', icon: MessageSquare, iconCls: 'text-rose-500', href: '/admin/messages' },
];

const LANG_COLORS: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    PHP: '#4f5d95',
    Python: '#3572A5',
    Go: '#00ADD8',
    Rust: '#dea584',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Vue: '#41b883',
    Svelte: '#ff3e00',
    Shell: '#89e051',
    Blade: '#f7523f',
};

function LanguageBar({ languages }: { languages: Record<string, number> }) {
    const total = Object.values(languages).reduce((a, b) => a + b, 0);
    if (total === 0) return null;
    const sorted = Object.entries(languages).sort(([, a], [, b]) => b - a).slice(0, 6);
    return (
        <div>
            <div className="flex h-1.5 rounded-full overflow-hidden gap-px">
                {sorted.map(([lang, bytes]) => {
                    const pct = (bytes / total) * 100;
                    return (
                        <div
                            key={lang}
                            style={{ width: `${pct}%`, backgroundColor: LANG_COLORS[lang] ?? '#94a3b8' }}
                            title={`${lang}: ${pct.toFixed(1)}%`}
                        />
                    );
                })}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5">
                {sorted.map(([lang, bytes]) => {
                    const pct = ((bytes / total) * 100).toFixed(0);
                    return (
                        <span key={lang} className="flex items-center gap-1 text-xs text-surface-500">
                            <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: LANG_COLORS[lang] ?? '#94a3b8' }} />
                            {lang}
                            <span className="text-surface-400">{pct}%</span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export default function Dashboard({ stats, recentMessages, pageViewsChart, contactsChart, github }: Props) {
    const totalViewsThisMonth = pageViewsChart.reduce((sum, d) => sum + (d.views ?? 0), 0);

    return (
        <AdminLayout title="Dashboard" description="Overview of your portfolio content">
            <Head title="Dashboard" />

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
                {statCards.map((card) => (
                    <Link
                        key={card.key}
                        href={card.href}
                        className="bg-white rounded-lg border border-surface-100 p-4 shadow-sm hover:shadow hover:border-surface-200 transition-all duration-200 group"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[11px] font-medium text-surface-400 uppercase tracking-wider">{card.label}</p>
                            <card.icon className={`h-3.5 w-3.5 ${card.iconCls}`} />
                        </div>
                        <p className="text-3xl font-bold text-surface-900 tabular-nums leading-none">{stats[card.key]}</p>
                    </Link>
                ))}
                <div className="bg-white rounded-lg border border-surface-100 p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-[11px] font-medium text-surface-400 uppercase tracking-wider">Total Views</p>
                        <Eye className="h-3.5 w-3.5 text-teal-500" />
                    </div>
                    <p className="text-3xl font-bold text-surface-900 tabular-nums leading-none">{stats.totalViews.toLocaleString()}</p>
                </div>
            </div>

            {/* Unread messages alert */}
            {stats.unreadMessages > 0 && (
                <div className="mb-5 flex items-center gap-3 rounded-md border-l-[3px] border-primary-500 bg-primary-50 px-4 py-3">
                    <Mail className="h-4 w-4 text-primary-600 shrink-0" />
                    <p className="text-sm text-primary-700">
                        You have <strong>{stats.unreadMessages}</strong> unread message{stats.unreadMessages > 1 ? 's' : ''}.
                    </p>
                    <Link href="/admin/messages" className="ml-auto text-sm font-medium text-primary-600 hover:text-primary-700 shrink-0">
                        View →
                    </Link>
                </div>
            )}

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg border border-surface-100 shadow-sm">
                    <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-surface-100">
                        <div>
                            <h2 className="text-sm font-semibold text-surface-900">Page Views</h2>
                            <p className="text-xs text-surface-400 mt-0.5">Last 30 days</p>
                        </div>
                        <p className="text-sm font-semibold text-surface-700 tabular-nums">{totalViewsThisMonth.toLocaleString()}</p>
                    </div>
                    <div className="px-2 py-4">
                        <ResponsiveContainer width="100%" height={180}>
                            <AreaChart data={pageViewsChart} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.18} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={6} />
                                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} allowDecimals={false} />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #e2e8f0' }} />
                                <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={1.5} fill="url(#viewsGrad)" name="Views" dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-surface-100 shadow-sm">
                    <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-surface-100">
                        <div>
                            <h2 className="text-sm font-semibold text-surface-900">Contact Submissions</h2>
                            <p className="text-xs text-surface-400 mt-0.5">Last 30 days</p>
                        </div>
                    </div>
                    <div className="px-2 py-4">
                        <ResponsiveContainer width="100%" height={180}>
                            <AreaChart data={contactsChart} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="contactGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.18} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={6} />
                                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} allowDecimals={false} />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #e2e8f0' }} />
                                <Area type="monotone" dataKey="contact" stroke="#10b981" strokeWidth={1.5} fill="url(#contactGrad)" name="Submissions" dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* GitHub + Recent messages */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* GitHub card */}
                <div className="bg-white rounded-lg border border-surface-100 shadow-sm">
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-100">
                        {github.avatar_url && (
                            <img src={github.avatar_url} alt={github.username} className="h-7 w-7 rounded-full border border-surface-200" />
                        )}
                        <h2 className="text-sm font-semibold text-surface-900">GitHub</h2>
                        <a
                            href={github.profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                        >
                            @{github.username} →
                        </a>
                    </div>
                    <div className="p-5 space-y-5">
                        <div className="flex items-center gap-5 flex-wrap">
                            {[
                                { icon: BookOpen, value: github.public_repos, label: 'repos' },
                                { icon: Star, value: github.total_stars, label: 'stars' },
                                { icon: Users, value: github.followers, label: 'followers' },
                                { icon: GitFork, value: Object.keys(github.languages).length, label: 'languages' },
                            ].map(({ icon: Icon, value, label }) => (
                                <div key={label} className="flex items-center gap-1.5">
                                    <Icon className="h-3.5 w-3.5 text-surface-400" />
                                    <span className="text-sm font-semibold text-surface-800 tabular-nums">{value}</span>
                                    <span className="text-xs text-surface-400">{label}</span>
                                </div>
                            ))}
                        </div>

                        {Object.keys(github.languages).length > 0 && (
                            <LanguageBar languages={github.languages} />
                        )}

                        {github.top_repos.length > 0 && (
                            <div>
                                <p className="text-[11px] font-medium text-surface-400 uppercase tracking-wider mb-2.5">Top Repos</p>
                                <div className="space-y-2.5">
                                    {github.top_repos.slice(0, 3).map((repo) => (
                                        <a
                                            key={repo.name}
                                            href={repo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between group"
                                        >
                                            <div className="min-w-0">
                                                <p className="text-sm text-surface-700 group-hover:text-primary-600 transition-colors truncate">
                                                    {repo.name}
                                                </p>
                                                {repo.language && (
                                                    <p className="text-xs text-surface-400 mt-0.5">{repo.language}</p>
                                                )}
                                            </div>
                                            <span className="flex items-center gap-1 text-xs text-surface-400 shrink-0 ml-3">
                                                <Star className="h-3 w-3" />
                                                {repo.stars}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent messages */}
                <div className="bg-white rounded-lg border border-surface-100 shadow-sm">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100">
                        <h2 className="text-sm font-semibold text-surface-900">Recent Messages</h2>
                        <Link href="/admin/messages" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                            View all
                        </Link>
                    </div>
                    {recentMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-14 gap-2">
                            <MessageSquare className="h-7 w-7 text-surface-200" />
                            <p className="text-sm text-surface-400">No messages yet</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-surface-50">
                            {recentMessages.map((msg) => (
                                <Link
                                    key={msg.id}
                                    href={`/admin/messages/${msg.id}`}
                                    className="flex items-start gap-3 px-5 py-3.5 hover:bg-surface-50 transition-colors"
                                >
                                    <div className="h-8 w-8 rounded-full bg-surface-100 flex items-center justify-center text-xs font-semibold text-surface-600 shrink-0 select-none">
                                        {msg.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1 pt-0.5">
                                        <div className="flex items-baseline gap-1.5">
                                            <p className={`text-sm truncate ${msg.is_read ? 'text-surface-600' : 'font-semibold text-surface-900'}`}>
                                                {msg.subject}
                                            </p>
                                            {!msg.is_read && <span className="h-1.5 w-1.5 rounded-full bg-primary-500 shrink-0" />}
                                        </div>
                                        <p className="text-xs text-surface-400 mt-0.5 truncate">{msg.name} · {msg.email}</p>
                                    </div>
                                    <span className="text-xs text-surface-400 whitespace-nowrap mt-0.5">
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
