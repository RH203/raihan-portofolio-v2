import AdminLayout from '@/layouts/admin-layout';
import type { ContactMessage } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Mail, MailOpen, Trash2 } from 'lucide-react';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog';

interface Props { message: ContactMessage; }

export default function MessageShow({ message }: Props) {
    const dialog = useConfirmDialog();

    const toggleRead = () => router.patch(`/admin/messages/${message.id}/toggle-read`);
    const handleDelete = async () => {
        if (await dialog.confirm()) {
            router.delete(`/admin/messages/${message.id}`);
        }
    };

    return (
        <AdminLayout title="Message Details" actions={
            <div className="flex items-center gap-2">
                <button onClick={toggleRead} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-surface-300 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors">
                    {message.is_read ? <><Mail className="h-4 w-4" /> Mark Unread</> : <><MailOpen className="h-4 w-4" /> Mark Read</>}
                </button>
                <button onClick={handleDelete} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-danger-500 text-white text-sm font-medium hover:bg-danger-600 transition-colors">
                    <Trash2 className="h-4 w-4" /> Delete
                </button>
            </div>
        }>
            <Head title={`Message: ${message.subject}`} />
            <div className="mb-6"><Link href="/admin/messages" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700"><ArrowLeft className="h-4 w-4" /> Back to Messages</Link></div>

            <div className="max-w-3xl bg-white rounded-xl border border-surface-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-surface-100">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-surface-900">{message.subject}</h2>
                            <div className="mt-2 space-y-1">
                                <p className="text-sm text-surface-600"><span className="font-medium text-surface-500">From:</span> {message.name} &lt;{message.email}&gt;</p>
                                <p className="text-sm text-surface-600"><span className="font-medium text-surface-500">Date:</span> {new Date(message.created_at).toLocaleString()}</p>
                            </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${message.is_read ? 'bg-surface-100 text-surface-500' : 'bg-primary-50 text-primary-700'}`}>
                            {message.is_read ? 'Read' : 'Unread'}
                        </span>
                    </div>
                </div>
                <div className="px-6 py-6">
                    <p className="text-sm text-surface-700 leading-relaxed whitespace-pre-wrap">{message.message}</p>
                </div>
                <div className="px-6 py-4 bg-surface-50 border-t border-surface-100">
                    <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
                        <Mail className="h-4 w-4" /> Reply via Email
                    </a>
                </div>
            </div>
            <ConfirmDialog open={dialog.isOpen} title="Delete Message" message="Are you sure you want to delete this message?" onConfirm={dialog.handleConfirm} onCancel={dialog.handleCancel} />
        </AdminLayout>
    );
}
