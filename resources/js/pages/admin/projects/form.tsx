import AdminLayout from '@/layouts/admin-layout';
import type { Project } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import { type FormEvent } from 'react';

interface Props { project?: Project; }

export default function ProjectForm({ project }: Props) {
    const isEditing = !!project;
    const { data, setData, post, put, processing, errors } = useForm({
        title: project?.title || '',
        thumbnail: null as File | null,
        description: project?.description || '',
        technologies: project?.technologies || ([] as string[]),
        demo_url: project?.demo_url || '',
        repository_url: project?.repository_url || '',
        category: project?.category || 'Web App',
        is_featured: project?.is_featured || false,
        sort_order: project?.sort_order || 0,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            post(`/admin/projects/${project.id}`, {
                forceFormData: true,
                _method: 'put',
            } as any);
        } else {
            post('/admin/projects', { forceFormData: true });
        }
    };

    const addTech = () => setData('technologies', [...data.technologies, '']);
    const updateTech = (i: number, v: string) => { const t = [...data.technologies]; t[i] = v; setData('technologies', t); };
    const removeTech = (i: number) => setData('technologies', data.technologies.filter((_, idx) => idx !== i));

    return (
        <AdminLayout title={isEditing ? 'Edit Project' : 'Add Project'}>
            <Head title={isEditing ? 'Edit Project' : 'Add Project'} />
            <div className="mb-6"><Link href="/admin/projects" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700"><ArrowLeft className="h-4 w-4" /> Back</Link></div>

            <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-xl border border-surface-100 p-6 shadow-sm space-y-5">
                <div className="space-y-1.5">
                    <label htmlFor="title" className="block text-sm font-medium text-surface-700">Project Name *</label>
                    <input id="title" type="text" value={data.title} onChange={(e) => setData('title', e.target.value)}
                        className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" required />
                    {errors.title && <p className="text-xs text-danger-500">{errors.title}</p>}
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="thumbnail" className="block text-sm font-medium text-surface-700">Thumbnail</label>
                    {project?.thumbnail_url && <img src={`/storage/${project.thumbnail_url}`} alt="Current" className="h-24 rounded-lg object-cover border mb-2" />}
                    <input id="thumbnail" type="file" accept="image/*" onChange={(e) => setData('thumbnail', e.target.files?.[0] || null)}
                        className="block w-full text-sm text-surface-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="description" className="block text-sm font-medium text-surface-700">Description</label>
                    <textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3}
                        className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none resize-y" />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-surface-700">Technologies</label>
                        <button type="button" onClick={addTech} className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium"><Plus className="h-3.5 w-3.5" /> Add</button>
                    </div>
                    {data.technologies.map((t, i) => (
                        <div key={i} className="flex gap-2">
                            <input type="text" value={t} onChange={(e) => updateTech(i, e.target.value)} placeholder="e.g. React"
                                className="flex-1 rounded-lg border border-surface-300 px-3.5 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
                            <button type="button" onClick={() => removeTech(i)} className="p-2 rounded-lg text-surface-400 hover:text-danger-600 hover:bg-danger-50 transition-colors"><X className="h-4 w-4" /></button>
                        </div>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label htmlFor="demo_url" className="block text-sm font-medium text-surface-700">Demo URL</label>
                        <input id="demo_url" type="url" value={data.demo_url} onChange={(e) => setData('demo_url', e.target.value)}
                            className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none" placeholder="https://" />
                        {errors.demo_url && <p className="text-xs text-danger-500">{errors.demo_url}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="repo_url" className="block text-sm font-medium text-surface-700">Repository URL</label>
                        <input id="repo_url" type="url" value={data.repository_url} onChange={(e) => setData('repository_url', e.target.value)}
                            className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none" placeholder="https://" />
                        {errors.repository_url && <p className="text-xs text-danger-500">{errors.repository_url}</p>}
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label htmlFor="category" className="block text-sm font-medium text-surface-700">Category *</label>
                        <input id="category" type="text" value={data.category} onChange={(e) => setData('category', e.target.value)}
                            className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none" required placeholder="e.g. Web App" />
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="sort_order_p" className="block text-sm font-medium text-surface-700">Sort Order</label>
                        <input id="sort_order_p" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                            className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none" min={0} />
                    </div>
                </div>

                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)}
                        className="h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
                    <span className="text-sm text-surface-700 font-medium">Featured project</span>
                </label>

                <div className="flex items-center gap-3 pt-2">
                    <button type="submit" disabled={processing} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors disabled:opacity-50">
                        <Save className="h-4 w-4" /> {processing ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                    </button>
                    <Link href="/admin/projects" className="px-4 py-2.5 rounded-lg border border-surface-300 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors">Cancel</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
