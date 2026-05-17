import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog';
import { EmptyState } from '@/components/ui/empty-state';
import AdminLayout from '@/layouts/admin-layout';
import type { SocialLink } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const platformLabels: Record<string, string> = {
    github: 'GitHub', linkedin: 'LinkedIn', facebook: 'Facebook',
    instagram: 'Instagram', twitter: 'Twitter / X', youtube: 'YouTube',
    tiktok: 'TikTok', whatsapp: 'WhatsApp', telegram: 'Telegram',
    discord: 'Discord', email: 'Email', website: 'Website',
    dribbble: 'Dribbble', behance: 'Behance', medium: 'Medium',
    devto: 'Dev.to', stackoverflow: 'Stack Overflow',
};

interface Props {
    socialLinks: SocialLink[];
}

export default function SocialLinksIndex({ socialLinks }: Props) {
    const [deleting, setDeleting] = useState<number | null>(null);
    const dialog = useConfirmDialog();

    const handleDelete = async (id: number) => {
        const confirmed = await dialog.confirm();
        if (confirmed) {
            setDeleting(id);
            router.delete(`/admin/social-links/${id}`, { onFinish: () => setDeleting(null) });
        }
    };

    return (
        <AdminLayout
            title="Social Links"
            description="Manage your social media links"
            actions={
                <Link href="/admin/social-links/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
                    <Plus className="h-4 w-4" /> Add Link
                </Link>
            }
        >
            <Head title="Manage Social Links" />

            {socialLinks.length === 0 ? (
                <EmptyState
                    title="No social links yet"
                    description="Add your social media profiles to display on your portfolio."
                    action={
                        <Link href="/admin/social-links/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
                            <Plus className="h-4 w-4" /> Add Social Link
                        </Link>
                    }
                />
            ) : (
                <div className="bg-white rounded-xl border border-surface-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-surface-50 border-b border-surface-100">
                            <tr>
                                <th className="text-left px-6 py-3 font-medium text-surface-600">Platform</th>
                                <th className="text-left px-6 py-3 font-medium text-surface-600">URL</th>
                                <th className="text-left px-6 py-3 font-medium text-surface-600">Status</th>
                                <th className="text-left px-6 py-3 font-medium text-surface-600">Order</th>
                                <th className="text-right px-6 py-3 font-medium text-surface-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-100">
                            {socialLinks.map((link) => (
                                <tr key={link.id} className="hover:bg-surface-50 transition-colors">
                                    <td className="px-6 py-3 font-medium text-surface-900">
                                        {platformLabels[link.platform] || link.platform}
                                    </td>
                                    <td className="px-6 py-3">
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-xs truncate max-w-xs">
                                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                            <span className="truncate">{link.url}</span>
                                        </a>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${link.is_active ? 'bg-accent-50 text-accent-600' : 'bg-surface-100 text-surface-400'}`}>
                                            {link.is_active ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-surface-500">{link.sort_order}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/social-links/${link.id}/edit`} className="p-1.5 rounded-md text-surface-400 hover:text-primary-600 hover:bg-primary-50 transition-colors" aria-label="Edit">
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(link.id)} disabled={deleting === link.id} className="p-1.5 rounded-md text-surface-400 hover:text-danger-600 hover:bg-danger-50 transition-colors disabled:opacity-50" aria-label="Delete">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmDialog
                open={dialog.isOpen}
                title="Delete Social Link"
                message="Are you sure you want to delete this social link?"
                onConfirm={dialog.handleConfirm}
                onCancel={dialog.handleCancel}
            />
        </AdminLayout>
    );
}
