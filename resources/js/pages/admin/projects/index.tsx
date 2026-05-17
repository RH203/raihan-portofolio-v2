import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog';
import { EmptyState } from '@/components/ui/empty-state';
import AdminLayout from '@/layouts/admin-layout';
import type { Project } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, FolderKanban, Plus, Search, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props { projects: Project[]; filters: { search?: string; category?: string }; }

export default function ProjectsIndex({ projects, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleting, setDeleting] = useState<number | null>(null);
    const dialog = useConfirmDialog();

    const handleSearch = (v: string) => { setSearch(v); router.get('/admin/projects', { search: v, category: filters.category }, { preserveState: true, replace: true }); };
    const handleDelete = async (id: number) => { if (await dialog.confirm()) { setDeleting(id); router.delete(`/admin/projects/${id}`, { onFinish: () => setDeleting(null) }); } };

    return (
        <AdminLayout title="Projects" description="Manage portfolio projects" actions={
            <Link href="/admin/projects/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"><Plus className="h-4 w-4" /> Add Project</Link>
        }>
            <Head title="Manage Projects" />
            <div className="mb-6 max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search projects..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-surface-300 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
            </div>
            {projects.length === 0 ? (
                <EmptyState icon={FolderKanban} title="No projects yet" description="Add your first project."
                    action={<Link href="/admin/projects/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700"><Plus className="h-4 w-4" /> Add Project</Link>} />
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-xl border border-surface-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                            <div className="h-36 bg-gradient-to-br from-primary-50 to-primary-100 relative">
                                {project.thumbnail_url ? (
                                    <img src={`/storage/${project.thumbnail_url}`} alt={project.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full"><span className="text-3xl font-bold text-primary-300/60">{project.title.charAt(0)}</span></div>
                                )}
                                {project.is_featured && (
                                    <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning-500 text-white text-xs font-medium">
                                        <Star className="h-3 w-3 fill-current" /> Featured
                                    </span>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-surface-900 text-sm">{project.title}</h3>
                                <p className="text-xs text-surface-400 mt-0.5">{project.category}</p>
                                {project.technologies && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {project.technologies.slice(0, 3).map((t) => (
                                            <span key={t} className="px-1.5 py-0.5 rounded bg-surface-50 text-[10px] text-surface-500 font-medium">{t}</span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-surface-100">
                                    <Link href={`/admin/projects/${project.id}/edit`} className="p-1.5 rounded-md text-surface-400 hover:text-primary-600 hover:bg-primary-50 transition-colors" aria-label="Edit"><Edit className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(project.id)} disabled={deleting === project.id} className="p-1.5 rounded-md text-surface-400 hover:text-danger-600 hover:bg-danger-50 transition-colors disabled:opacity-50" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ConfirmDialog open={dialog.isOpen} title="Delete Project" message="Are you sure? This cannot be undone." onConfirm={dialog.handleConfirm} onCancel={dialog.handleCancel} />
        </AdminLayout>
    );
}
