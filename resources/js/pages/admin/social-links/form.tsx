import AdminLayout from '@/layouts/admin-layout';
import type { SocialLink } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { type FormEvent } from 'react';

const platforms = [
    { value: 'github', label: 'GitHub' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter / X' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'discord', label: 'Discord' },
    { value: 'email', label: 'Email' },
    { value: 'website', label: 'Website' },
    { value: 'dribbble', label: 'Dribbble' },
    { value: 'behance', label: 'Behance' },
    { value: 'medium', label: 'Medium' },
    { value: 'devto', label: 'Dev.to' },
    { value: 'stackoverflow', label: 'Stack Overflow' },
];

const placeholders: Record<string, string> = {
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    facebook: 'https://facebook.com/username',
    instagram: 'https://instagram.com/username',
    twitter: 'https://x.com/username',
    youtube: 'https://youtube.com/@channel',
    tiktok: 'https://tiktok.com/@username',
    whatsapp: 'https://wa.me/628123456789',
    telegram: 'https://t.me/username',
    discord: 'https://discord.gg/invite',
    email: 'mailto:your@email.com',
    website: 'https://yourwebsite.com',
    dribbble: 'https://dribbble.com/username',
    behance: 'https://behance.net/username',
    medium: 'https://medium.com/@username',
    devto: 'https://dev.to/username',
    stackoverflow: 'https://stackoverflow.com/users/id',
};

interface Props {
    socialLink?: SocialLink;
}

export default function SocialLinkForm({ socialLink }: Props) {
    const isEditing = !!socialLink;
    const { data, setData, post, put, processing, errors } = useForm({
        platform: socialLink?.platform || 'github',
        url: socialLink?.url || '',
        is_active: socialLink?.is_active ?? true,
        sort_order: socialLink?.sort_order || 0,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/social-links/${socialLink.id}`);
        } else {
            post('/admin/social-links');
        }
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Social Link' : 'Add Social Link'} description={isEditing ? `Editing ${data.platform}` : 'Add a new social media link'}>
            <Head title={isEditing ? 'Edit Social Link' : 'Add Social Link'} />

            <div className="mb-6">
                <Link href="/admin/social-links" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Social Links
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="max-w-lg bg-white rounded-xl border border-surface-100 p-6 shadow-sm space-y-5">
                <div className="space-y-1.5">
                    <label htmlFor="platform" className="block text-sm font-medium text-surface-700">Platform *</label>
                    <select
                        id="platform"
                        value={data.platform}
                        onChange={(e) => setData('platform', e.target.value)}
                        className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                        required
                    >
                        {platforms.map((p) => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                    {errors.platform && <p className="text-xs text-danger-500">{errors.platform}</p>}
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="url" className="block text-sm font-medium text-surface-700">URL *</label>
                    <input
                        id="url"
                        type="url"
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                        className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                        required
                        placeholder={placeholders[data.platform] || 'https://...'}
                    />
                    {errors.url && <p className="text-xs text-danger-500">{errors.url}</p>}
                </div>

                <div className="flex items-center gap-3">
                    <input
                        id="is_active"
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(e) => setData('is_active', e.target.checked)}
                        className="h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="is_active" className="text-sm text-surface-700">Show on portfolio</label>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="sort_order" className="block text-sm font-medium text-surface-700">Sort Order</label>
                    <input
                        id="sort_order"
                        type="number"
                        value={data.sort_order}
                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                        className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                        min={0}
                    />
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <button type="submit" disabled={processing} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors disabled:opacity-50">
                        <Save className="h-4 w-4" /> {processing ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                    </button>
                    <Link href="/admin/social-links" className="px-4 py-2.5 rounded-lg border border-surface-300 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors">
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
