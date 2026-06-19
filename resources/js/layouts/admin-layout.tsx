import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Briefcase,
    FileText,
    FolderKanban,
    GraduationCap,
    Home,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Share2,
    Sparkles,
    X,
} from 'lucide-react';
import { type ReactNode, useState } from 'react';

const sidebarItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Hero Section', href: '/admin/hero', icon: Sparkles },
    { label: 'Skills', href: '/admin/skills', icon: BookOpen },
    { label: 'Experience', href: '/admin/experiences', icon: Briefcase },
    { label: 'Education', href: '/admin/education', icon: GraduationCap },
    { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { label: 'Blog', href: '/admin/blog', icon: FileText },
    { label: 'Social Links', href: '/admin/social-links', icon: Share2 },
    { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
];

interface AdminLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
    actions?: ReactNode;
}

export default function AdminLayout({ children, title, description, actions }: AdminLayoutProps) {
    const { url, props } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = (props as any).auth?.user;

    const isActive = (href: string) => {
        if (href === '/admin') return url === '/admin';
        return url.startsWith(href);
    };

    const handleLogout = () => router.post('/admin/logout');

    return (
        <div className="min-h-screen bg-surface-50">
            {sidebarOpen && <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}><div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" /></div>}
            <aside className={cn('fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-surface-100 transition-transform duration-300 lg:translate-x-0', sidebarOpen ? 'translate-x-0' : '-translate-x-full')} aria-label="Admin navigation">
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between px-6 py-5 border-b border-surface-100">
                        <Link href="/admin" className="text-lg font-bold text-surface-900">RH<span className="text-primary-600">.</span> <span className="text-sm font-normal text-surface-400">Admin</span></Link>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded text-surface-400 hover:text-surface-600" aria-label="Close sidebar"><X className="h-5 w-5" /></button>
                    </div>
                    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                        {sidebarItems.map((item) => <Link key={item.href} href={item.href} className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200', isActive(item.href) ? 'bg-primary-50 text-primary-700' : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900')} onClick={() => setSidebarOpen(false)}><item.icon className="h-4 w-4 flex-shrink-0" />{item.label}</Link>)}
                    </nav>
                    <div className="border-t border-surface-100 px-3 py-4 space-y-1">
                        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50 transition-colors" target="_blank"><Home className="h-4 w-4" />View Site</Link>
                        <button onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-600 hover:bg-danger-50 hover:text-danger-600 transition-colors"><LogOut className="h-4 w-4" />Logout</button>
                    </div>
                </div>
            </aside>
            <div className="lg:ml-64">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-surface-100">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100 transition-colors" aria-label="Open sidebar"><Menu className="h-5 w-5" /></button>
                            <div><h1 className="text-lg font-semibold text-surface-900">{title}</h1>{description && <p className="text-sm text-surface-500">{description}</p>}</div>
                        </div>
                        <div className="flex items-center gap-4">{actions}{user && <div className="hidden sm:flex items-center gap-2 text-sm text-surface-500"><div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium text-xs">{user.name?.charAt(0)?.toUpperCase()}</div></div>}</div>
                    </div>
                </header>
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
