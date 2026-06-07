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
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
    stats: DashboardStats;
    recentMessages: ContactMessage[];
    pageViewsChart: ChartPoint[];
    contactsChart: ChartPoint[];
    github: GitHubData;
}

const statCards = [
    { key: 'skills' as const, label: 'Skills', icon: BookOpen, color: 'bg-blue-50 text-blue-600', href: '/admin/skills' },
    { key: 'experiences' as const, label: 'Experiences', icon: Briefcase, color: 'bg-purple-50 text-purple-600', href: '/admin/experiences' },
    { key: 'education' as const, label: 'Education', icon: GraduationCap, color: 'bg-emerald-50 text-emerald-600', href: '/admin/education' },
    { key: 'projects' as const, label: 'Projects', icon: FolderKanban, color: 'bg-amber-50 text-amber-600', href: '/admin/projects' },
    { key: 'messages' as const, label: 'Messages', icon: MessageSquare, color: 'bg-rose-50 text-rose-600', href: '/admin/messages' },
];

export default function Dashboard({ stats, recentMessages, pageViewsChart, contactsChart, github }: Props) {
    const totalViewsThisMonth = pageViewsChart.reduce((sum, d) => sum + (d.views ?? 0), 0);
    const [activeChart, setActiveChart] = useState<'views' | 'contacts'>('views');

    const githubFigures = [
        { label: 'Repositories', value: github.public_repos },
        { label: 'Stars', value: github.total_stars },
        { label: 'Followers', value: github.followers },
        { label: 'Languages', value: Object.keys(github.languages).length },
    ];

    return (
        <AdminLayout title="Dashboard" description="Overview of your portfolio content">
            <Head title="Dashboard" />

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {statCards.map((card) => (
                    <Link
                        key={card.key}
                        href={card.href}
                        className="bg-white rounded-xl border border-surface-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
                    >
                        <div className={`inline-flex p-2.5 rounded-lg ${card.color} mb-3`}>
                            <card.icon className="h-5 w-5" />
                        </div>
                        <p className="text-2xl font-bold text-surface-900">{stats[card.key]}</p>
                        <p className="text-sm text-surface-500 mt-0.5">{card.label}</p>
                    </Link>
                ))}
                <div className="bg-white rounded-xl border border-surface-100 p-5 shadow-sm">
                    <div className="inline-flex p-2.5 rounded-lg bg-teal-50 text-teal-600 mb-3">
                        <Eye className="h-5 w-5" />
                    </div>
                    <p className="text-2xl font-bold text-surface-900">{stats.totalViews.toLocaleString()}</p>
                    <p className="text-sm text-surface-500 mt-0.5">Total Views</p>
                </div>
            </div>

            {/* Unread messages alert */}
            {stats.unreadMessages > 0 && (
                <div className="mb-6 rounded-lg bg-primary-50 border border-primary-100 px-4 py-3 flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary-600" />
                    <p className="text-sm text-primary-700">
                        You have <strong>{stats.unreadMessages}</strong> unread message{stats.unreadMessages > 1 ? 's' : ''}.
                    </p>
                    <Link href="/admin/messages" className="ml-auto text-sm font-medium text-primary-600 hover:text-primary-700">
                        View →
                    </Link>
                </div>
            )}

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl border border-surface-100 shadow-sm p-5">
                    <div className="mb-4">
                        <h2 className="font-semibold text-surface-900">Page Views</h2>
                        <p className="text-xs text-surface-400 mt-0.5">Last 30 days · {totalViewsThisMonth.toLocaleString()} total</p>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={pageViewsChart} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={6} />
                            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                            <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fill="url(#viewsGrad)" name="Views" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl border border-surface-100 shadow-sm p-5">
                    <div className="mb-4">
                        <h2 className="font-semibold text-surface-900">Contact Submissions</h2>
                        <p className="text-xs text-surface-400 mt-0.5">Last 30 days</p>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={contactsChart} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="contactGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={6} />
                            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                            <Area type="monotone" dataKey="contact" stroke="#10b981" strokeWidth={2} fill="url(#contactGrad)" name="Submissions" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* GitHub + Recent messages */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-surface-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-surface-900">GitHub</h2>
                        <a href={github.profile_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            @{github.username} →
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {[
                            { icon: BookOpen, label: 'Repos', value: github.public_repos, color: 'text-blue-600 bg-blue-50' },
                            { icon: Star, label: 'Stars', value: github.total_stars, color: 'text-amber-600 bg-amber-50' },
                            { icon: Users, label: 'Followers', value: github.followers, color: 'text-purple-600 bg-purple-50' },
                            { icon: GitFork, label: 'Languages', value: Object.keys(github.languages).length, color: 'text-teal-600 bg-teal-50' },
                        ].map(({ icon: Icon, label, value, color }) => (
                            <div key={label} className="flex items-center gap-3 p-3 rounded-lg bg-surface-50">
                                <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-base font-bold text-surface-900">{value}</p>
                                    <p className="text-xs text-surface-500">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {github.top_repos.length > 0 && (
                        <div className="space-y-1.5">
                            <p className="text-xs font-medium text-surface-500 uppercase tracking-wide mb-2">Top Repos</p>
                            {github.top_repos.slice(0, 3).map((repo) => (
                                <a
                                    key={repo.name}
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between py-1 hover:text-primary-600 transition-colors group"
                                >
                                    <span className="text-sm text-surface-700 group-hover:text-primary-600 truncate">{repo.name}</span>
                                    <span className="flex items-center gap-1 text-xs text-surface-400 shrink-0 ml-2">
                                        <Star className="h-3 w-3" /> {repo.stars}
                                    </span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl border border-surface-100 shadow-sm">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100">
                        <h2 className="font-semibold text-surface-900">Recent Messages</h2>
                        <Link href="/admin/messages" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            View all
                        </Link>
                    </div>
                    {recentMessages.length === 0 ? (
                        <div className="px-6 py-10 text-center text-sm text-surface-400">No messages yet</div>
                    ) : (
                        <div className="divide-y divide-surface-100">
                            {recentMessages.map((msg) => (
                                <Link
                                    key={msg.id}
                                    href={`/admin/messages/${msg.id}`}
                                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-50 transition-colors"
                                >
                                    <div className={`h-2 w-2 rounded-full shrink-0 ${msg.is_read ? 'bg-surface-200' : 'bg-primary-500'}`} />
                                    <div className="min-w-0 flex-1">
                                        <p className={`text-sm truncate ${msg.is_read ? 'text-surface-600' : 'font-medium text-surface-900'}`}>
                                            {msg.subject}
                                        </p>
                                        <p className="text-xs text-surface-400 mt-0.5 truncate">
                                            {msg.name} · {msg.email}
                                        </p>
                                    </div>
                                    <span className="text-xs text-surface-400 whitespace-nowrap">
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
