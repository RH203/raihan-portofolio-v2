import RichTextEditor from '@/components/admin/rich-text-editor';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { type FormEvent } from 'react';

type Post = {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    cover_image?: string | null;
    tags?: string[];
    meta_title?: string | null;
    meta_description?: string | null;
    is_featured: boolean;
    is_published: boolean;
    published_at?: string | null;
};

export default function BlogForm({ post }: { post?: Post }) {
    const isEditing = !!post;
    const form = useForm({
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        cover_image: null as File | null,
        tags_text: post?.tags?.join(', ') || '',
        tags: post?.tags || ([] as string[]),
        meta_title: post?.meta_title || '',
        meta_description: post?.meta_description || '',
        is_featured: post?.is_featured || false,
        is_published: post?.is_published || false,
        published_at: post?.published_at ? post.published_at.slice(0, 16) : '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        const tags = form.data.tags_text.split(',').map((tag) => tag.trim()).filter(Boolean).slice(0, 5);
        form.transform((data) => ({ ...data, tags }));

        if (isEditing) {
            form.post(`/admin/blog/${post.id}`, { forceFormData: true, _method: 'put' } as any);
        } else {
            form.post('/admin/blog', { forceFormData: true });
        }
    };

    const input = 'block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none';

    return (
        <AdminLayout title={isEditing ? 'Edit story' : 'New story'} description="Use the editor toolbar to format text, add links, lists, quotes, and images.">
            <Head title={isEditing ? 'Edit story' : 'New story'} />
            <Link href="/admin/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-surface-500 hover:text-surface-900"><ArrowLeft className="h-4 w-4" /> Back</Link>
            <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-5 rounded-xl border border-surface-100 bg-white p-6 shadow-sm">
                    <div><label className="mb-1.5 block text-sm font-medium text-surface-700">Title</label><input value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} className={`${input} text-lg font-semibold`} required />{form.errors.title && <p className="mt-1 text-xs text-danger-600">{form.errors.title}</p>}</div>
                    <div><label className="mb-1.5 block text-sm font-medium text-surface-700">Subtitle / excerpt</label><textarea value={form.data.excerpt} onChange={(e) => form.setData('excerpt', e.target.value)} rows={3} className={input} maxLength={500} required /><p className="mt-1 text-right text-xs text-surface-400">{form.data.excerpt.length}/500</p></div>
                    <div><label className="mb-1.5 block text-sm font-medium text-surface-700">Story</label><RichTextEditor value={form.data.content} onChange={(content) => form.setData('content', content)} />{form.errors.content && <p className="mt-1 text-xs text-danger-600">{form.errors.content}</p>}</div>
                </div>

                <aside className="space-y-5">
                    <div className="space-y-4 rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
                        <h2 className="font-semibold text-surface-900">Publishing</h2>
                        <label className="flex items-center gap-2"><input type="checkbox" checked={form.data.is_published} onChange={(e) => form.setData('is_published', e.target.checked)} className="h-4 w-4 rounded border-surface-300 text-primary-600" /><span className="text-sm text-surface-700">Publish story</span></label>
                        <label className="flex items-center gap-2"><input type="checkbox" checked={form.data.is_featured} onChange={(e) => form.setData('is_featured', e.target.checked)} className="h-4 w-4 rounded border-surface-300 text-primary-600" /><span className="text-sm text-surface-700">Feature on blog</span></label>
                        <div><label className="mb-1.5 block text-xs font-medium text-surface-600">Publish date</label><input type="datetime-local" value={form.data.published_at} onChange={(e) => form.setData('published_at', e.target.value)} className={input} /></div>
                        <button type="submit" disabled={form.processing} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"><Save className="h-4 w-4" /> {form.processing ? 'Saving...' : form.data.is_published ? 'Publish' : 'Save draft'}</button>
                    </div>

                    <div className="space-y-4 rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
                        <h2 className="font-semibold text-surface-900">Story details</h2>
                        {post?.cover_image && <img src={`/storage/${post.cover_image}`} alt="Current cover" className="aspect-video w-full rounded-lg object-cover" />}
                        <div><label className="mb-1.5 block text-xs font-medium text-surface-600">Cover image</label><input type="file" accept="image/*" onChange={(e) => form.setData('cover_image', e.target.files?.[0] || null)} className="block w-full text-xs text-surface-500" /></div>
                        <div><label className="mb-1.5 block text-xs font-medium text-surface-600">Tags, comma separated</label><input value={form.data.tags_text} onChange={(e) => form.setData('tags_text', e.target.value)} className={input} placeholder="Laravel, Architecture, API" /></div>
                    </div>

                    <div className="space-y-4 rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
                        <h2 className="font-semibold text-surface-900">Search preview</h2>
                        <div><label className="mb-1.5 block text-xs font-medium text-surface-600">SEO title</label><input value={form.data.meta_title} onChange={(e) => form.setData('meta_title', e.target.value)} className={input} maxLength={60} /><p className="mt-1 text-right text-xs text-surface-400">{form.data.meta_title.length}/60</p></div>
                        <div><label className="mb-1.5 block text-xs font-medium text-surface-600">SEO description</label><textarea value={form.data.meta_description} onChange={(e) => form.setData('meta_description', e.target.value)} rows={4} className={input} maxLength={160} /><p className="mt-1 text-right text-xs text-surface-400">{form.data.meta_description.length}/160</p></div>
                    </div>
                </aside>
            </form>
        </AdminLayout>
    );
}
