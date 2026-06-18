import AdminLayout from '@/layouts/admin-layout';
import type { BlogPostSummary, ChartPoint, ContactMessage, DashboardStats, GitHubData } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    Briefcase,
    Eye,
    FileText,
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
    recentPosts: BlogPostSummary[];
    pageViewsChart: ChartPoint[];
    contactsChart: ChartPoint[];
    github: GitHubData;
}

const statCards = [
    { key: 'skills' as const, label: 'Skills', icon: BookOpen, color: 'bg-blue-50 text-blue-600', href: '/admin/skills' },
    { key: 'experiences' as const, label: 'Experiences', icon: Briefcase, color: 'bg-purple-50 text-purple-600', href: '/admin/experiences' },
    { key: 'education' as const, label: 'Education', icon: GraduationCap, color: 'bg-emerald-50 text-emerald-600', href: '/admin/education' },
    { key: 'projects' as const, label: 'Projects', icon: FolderKanban, color: 'bg-amber-50 text-amber-600', href: '/admin/projects' },
    { key: 'blogs' as const, label: 'Blog Posts', icon: FileText, color: 'bg-indigo-50 text-indigo-600', href: '/admin/blog' },
    { key: 'messages' as const, label: 'Messages', icon: MessageSquare, color: 'bg-rose-50 text-rose-600', href: '/admin/messages' },
];

export default function Dashboard({ stats, recentMessages, recentPosts, pageViewsChart, contactsChart, github }: Props) {
    const totalViewsThisMonth = pageViewsChart.reduce((sum, point) => sum + (point.views ?? 0), 0);

    return (
        <AdminLayout title="Dashboard" description="Overview of your portfolio content">
            <Head title="Dashboard" />

            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-7">
                {statCards.map((card) => (
                    <Link key={card.key} href={card.href} className="group rounded-xl border border-surface-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className={`mb-3 inline-flex rounded-lg p-2.5 ${card.color}`}><card.icon className="h-5 w-5" /></div>
                        <p className="text-2xl font-bold text-surface-900">{stats[card.key]}</p>
                        <p className="mt-0.5 text-sm text-surface-500">{card.label}</p>
                    </Link>
                ))}
                <div className="rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
                    <div className="mb-3 inline-flex rounded-lg bg-teal-50 p-2.5 text-teal-600"><Eye className="h-5 w-5" /></div>
                    <p className="text-2xl font-bold text-surface-900">{stats.totalViews.toLocaleString()}</p>
                    <p className="mt-0.5 text-sm text-surface-500">Total Views</p>
                </div>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <Link href="/admin/blog" className="rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
                    <p className="text-sm text-surface-500">All stories</p>
                    <p className="mt-1 text-2xl font-bold text-surface-900">{stats.blogs}</p>
                </Link>
                <Link href="/admin/blog" className="rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
                    <p className="text-sm text-surface-500">Published</p>
                    <p className="mt-1 text-2xl font-bold text-emerald-600">{stats.publishedBlogs}</p>
                </Link>
                <Link href="/admin/blog" className="rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
                    <p className="text-sm text-surface-500">Drafts</p>
                    <p className="mt-1 text-2xl font-bold text-amber-600">{stats.draftBlogs}</p>
                </Link>
            </div>

            {stats.unreadMessages > 0 && (
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-primary-100 bg-primary-50 px-4 py-3">
                    <Mail className="h-5 w-5 text-primary-600" />
                    <p className="text-sm text-primary-700">You have <strong>{stats.unreadMessages}</strong> unread message{stats.unreadMessages > 1 ? 's' : ''}.</p>
                    <Link href="/admin/messages" className="ml-auto text-sm font-medium text-primary-600">View →</Link>
                </div>
            )}

            <div className="mb-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
                    <div className="mb-4"><h2 className="font-semibold text-surface-900">Page Views</h2><p className="mt-0.5 text-xs text-surface-400">Last 30 days · {totalViewsThisMonth.toLocaleString()} total</p></div>
                    <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={pageViewsChart} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                            <defs><linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={6} /><YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} allowDecimals={false} /><Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} /><Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fill="url(#viewsGrad)" name="Views" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
                    <div className="mb-4"><h2 className="font-semibold text-surface-900">Contact Submissions</h2><p className="mt-0.5 text-xs text-surface-400">Last 30 days</p></div>
                    <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={contactsChart} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                            <defs><linearGradient id="contactGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.25} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={6} /><YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} allowDecimals={false} /><Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} /><Area type="monotone" dataKey="contact" stroke="#10b981" strokeWidth={2} fill="url(#contactGrad)" name="Submissions" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="mb-6 rounded-xl border border-surface-100 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-surface-100 px-5 py-4">
                    <div><h2 className="font-semibold text-surface-900">Recent Blog Posts</h2><p className="text-xs text-surface-400">Latest drafts and published stories</p></div>
                    <div className="flex gap-3"><Link href="/blog" target="_blank" className="text-sm font-medium text-surface-500">View public blog</Link><Link href="/admin/blog" className="text-sm font-medium text-primary-600">Manage</Link></div>
                </div>
                {recentPosts.length === 0 ? (
                    <div className="px-6 py-10 text-center"><p className="text-sm text-surface-400">No blog posts yet.</p><Link href="/admin/blog/create" className="mt-3 inline-block text-sm font-medium text-primary-600">Write the first story</Link></div>
                ) : (
                    <div className="divide-y divide-surface-100">
                        {recentPosts.map((post) => (
                            <Link key={post.id} href={`/admin/blog/${post.id}/edit`} className="flex items-center gap-4 px-5 py-4 hover:bg-surface-50">
                                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-100">{post.cover_image && <img src={`/storage/${post.cover_image}`} alt="" className="h-full w-full object-cover" />}</div>
                                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-surface-900">{post.title}</p><p className="mt-1 truncate text-xs text-surface-400">{post.excerpt}</p></div>
                                <span className={`rounded-full px-2 py-1 text-xs font-medium ${post.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{post.is_published ? 'Published' : 'Draft'}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-surface-900">GitHub</h2><a href={github.profile_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary-600">@{github.username} →</a></div>
                    <div className="grid grid-cols-2 gap-3">
                        {[{ icon: BookOpen, label: 'Repos', value: github.public_repos }, { icon: Star, label: 'Stars', value: github.total_stars }, { icon: Users, label: 'Followers', value: github.followers }, { icon: GitFork, label: 'Languages', value: Object.keys(github.languages).length }].map(({ icon: Icon, label, value }) => <div key={label} className="flex items-center gap-3 rounded-lg bg-surface-50 p-3"><Icon className="h-4 w-4 text-primary-600" /><div><p className="font-bold text-surface-900">{value}</p><p className="text-xs text-surface-500">{label}</p></div></div>)}
                    </div>
                </div>

                <div className="rounded-xl border border-surface-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-surface-100 px-5 py-4"><h2 className="font-semibold text-surface-900">Recent Messages</h2><Link href="/admin/messages" className="text-sm font-medium text-primary-600">View all</Link></div>
                    {recentMessages.length === 0 ? <div className="px-6 py-10 text-center text-sm text-surface-400">No messages yet</div> : <div className="divide-y divide-surface-100">{recentMessages.map((message) => <Link key={message.id} href={`/admin/messages/${message.id}`} className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-50"><div className={`h-2 w-2 shrink-0 rounded-full ${message.is_read ? 'bg-surface-200' : 'bg-primary-500'}`} /><div className="min-w-0 flex-1"><p className={`truncate text-sm ${message.is_read ? 'text-surface-600' : 'font-medium text-surface-900'}`}>{message.subject}</p><p className="mt-0.5 truncate text-xs text-surface-400">{message.name} · {message.email}</p></div></Link>)}</div>}
                </div>
            </div>
        </AdminLayout>
    );
}
