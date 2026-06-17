import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit3, Plus, Trash2 } from 'lucide-react';

type Post = { id: number; title: string; slug: string; excerpt: string; is_published: boolean; is_featured: boolean; reading_time: number; updated_at: string };
type Pagination<T> = { data: T[]; links: { url: string | null; label: string; active: boolean }[] };

export default function BlogIndex({ posts }: { posts: Pagination<Post> }) {
    return (
        <AdminLayout title="Blog" description="Write and publish stories." actions={<Link href="/admin/blog/create" className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"><Plus className="h-4 w-4" /> New story</Link>}>
            <Head title="Blog" />
            <div className="overflow-hidden rounded-xl border border-surface-100 bg-white shadow-sm">
                <div className="divide-y divide-surface-100">
                    {posts.data.map((post) => (
                        <div key={post.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="truncate font-semibold text-surface-900">{post.title}</h2>
                                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${post.is_published ? 'bg-success-50 text-success-700' : 'bg-surface-100 text-surface-600'}`}>{post.is_published ? 'Published' : 'Draft'}</span>
                                    {post.is_featured && <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">Featured</span>}
                                </div>
                                <p className="mt-1 line-clamp-1 text-sm text-surface-500">{post.excerpt}</p>
                                <p className="mt-2 text-xs text-surface-400">{post.reading_time} min read · Updated {new Date(post.updated_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex shrink-0 gap-2">
                                {post.is_published && <Link href={`/blog/${post.slug}`} target="_blank" className="rounded-lg border border-surface-200 px-3 py-2 text-xs font-medium text-surface-600 hover:bg-surface-50">View</Link>}
                                <Link href={`/admin/blog/${post.id}/edit`} className="rounded-lg p-2 text-surface-500 hover:bg-primary-50 hover:text-primary-700" aria-label="Edit"><Edit3 className="h-4 w-4" /></Link>
                                <button onClick={() => confirm('Delete this story?') && router.delete(`/admin/blog/${post.id}`)} className="rounded-lg p-2 text-surface-500 hover:bg-danger-50 hover:text-danger-600" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                            </div>
                        </div>
                    ))}
                    {posts.data.length === 0 && <div className="p-12 text-center text-sm text-surface-500">No stories yet.</div>}
                </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">{posts.links.map((link, index) => link.url ? <Link key={index} href={link.url} className={`rounded-lg px-3 py-2 text-sm ${link.active ? 'bg-surface-900 text-white' : 'border border-surface-200 bg-white text-surface-600'}`} dangerouslySetInnerHTML={{ __html: link.label }} /> : null)}</div>
        </AdminLayout>
    );
}
