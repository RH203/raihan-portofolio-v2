import AdminLayout from '@/layouts/admin-layout';
import type { ContactMessage, DashboardStats } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Briefcase, FolderKanban, GraduationCap, Mail, MessageSquare } from 'lucide-react';

interface Props {
    stats: DashboardStats;
    recentMessages: ContactMessage[];
}

const statCards = [
    { key: 'skills' as const, label: 'Skills', icon: BookOpen, color: 'bg-blue-50 text-blue-600', href: '/admin/skills' },
    { key: 'experiences' as const, label: 'Experiences', icon: Briefcase, color: 'bg-purple-50 text-purple-600', href: '/admin/experiences' },
    { key: 'education' as const, label: 'Education', icon: GraduationCap, color: 'bg-emerald-50 text-emerald-600', href: '/admin/education' },
    { key: 'projects' as const, label: 'Projects', icon: FolderKanban, color: 'bg-amber-50 text-amber-600', href: '/admin/projects' },
    { key: 'messages' as const, label: 'Messages', icon: MessageSquare, color: 'bg-rose-50 text-rose-600', href: '/admin/messages' },
];

export default function Dashboard({ stats, recentMessages }: Props) {
    return (
        <AdminLayout title="Dashboard" description="Overview of your portfolio content">
            <Head title="Dashboard" />

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
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

            {/* Recent messages */}
            <div className="bg-white rounded-xl border border-surface-100 shadow-sm">
                <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100">
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
                                className="flex items-center gap-4 px-6 py-4 hover:bg-surface-50 transition-colors"
                            >
                                <div className={`h-2 w-2 rounded-full flex-shrink-0 ${msg.is_read ? 'bg-surface-200' : 'bg-primary-500'}`} />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className={`text-sm truncate ${msg.is_read ? 'text-surface-600' : 'font-medium text-surface-900'}`}>
                                            {msg.subject}
                                        </p>
                                    </div>
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
        </AdminLayout>
    );
}
