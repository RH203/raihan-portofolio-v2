import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog';
import { EmptyState } from '@/components/ui/empty-state';
import AdminLayout from '@/layouts/admin-layout';
import type { ContactMessage } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Mail, MailOpen, MessageSquare, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props { messages: ContactMessage[]; filters: { search?: string; status?: string }; }

export default function MessagesIndex({ messages, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleting, setDeleting] = useState<number | null>(null);
    const dialog = useConfirmDialog();

    const handleSearch = (v: string) => { setSearch(v); router.get('/admin/messages', { search: v, status: filters.status }, { preserveState: true, replace: true }); };
    const handleFilter = (status: string) => { router.get('/admin/messages', { search: filters.search, status: status || undefined }, { preserveState: true, replace: true }); };
    const handleDelete = async (id: number) => { if (await dialog.confirm()) { setDeleting(id); router.delete(`/admin/messages/${id}`, { onFinish: () => setDeleting(null) }); } };
    const toggleRead = (id: number) => { router.patch(`/admin/messages/${id}/toggle-read`); };

    return (
        <AdminLayout title="Messages" description="Contact form submissions">
            <Head title="Messages" />
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                    <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search messages..."
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-surface-300 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
                </div>
                <select value={filters.status || ''} onChange={(e) => handleFilter(e.target.value)}
                    className="rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none">
                    <option value="">All</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                </select>
            </div>

            {messages.length === 0 ? (
                <EmptyState icon={MessageSquare} title="No messages" description="Messages from the contact form will appear here." />
            ) : (
                <div className="bg-white rounded-xl border border-surface-100 shadow-sm overflow-hidden divide-y divide-surface-100">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-start gap-4 p-4 hover:bg-surface-50 transition-colors ${!msg.is_read ? 'bg-primary-50/30' : ''}`}>
                            <div className={`mt-0.5 flex-shrink-0 ${msg.is_read ? 'text-surface-300' : 'text-primary-500'}`}>
                                {msg.is_read ? <MailOpen className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                            </div>
                            <Link href={`/admin/messages/${msg.id}`} className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className={`text-sm truncate ${msg.is_read ? 'text-surface-600' : 'font-semibold text-surface-900'}`}>{msg.subject}</p>
                                    {!msg.is_read && <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary-500" />}
                                </div>
                                <p className="text-xs text-surface-500 mt-0.5 truncate">{msg.name} &lt;{msg.email}&gt;</p>
                                <p className="text-xs text-surface-400 mt-0.5 line-clamp-1">{msg.message}</p>
                            </Link>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <span className="text-xs text-surface-400 mr-2 hidden sm:block">{new Date(msg.created_at).toLocaleDateString()}</span>
                                <button onClick={() => toggleRead(msg.id)} className="p-1.5 rounded-md text-surface-400 hover:text-primary-600 hover:bg-primary-50 transition-colors" aria-label={msg.is_read ? 'Mark unread' : 'Mark read'}>
                                    {msg.is_read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                                </button>
                                <button onClick={() => handleDelete(msg.id)} disabled={deleting === msg.id} className="p-1.5 rounded-md text-surface-400 hover:text-danger-600 hover:bg-danger-50 transition-colors disabled:opacity-50" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ConfirmDialog open={dialog.isOpen} title="Delete Message" message="Are you sure you want to delete this message?" onConfirm={dialog.handleConfirm} onCancel={dialog.handleCancel} />
        </AdminLayout>
    );
}
