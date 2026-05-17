import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog';
import { EmptyState } from '@/components/ui/empty-state';
import AdminLayout from '@/layouts/admin-layout';
import type { Experience } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Briefcase, Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    experiences: Experience[];
    filters: { search?: string };
}

function fmt(d: string) { return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); }

export default function ExperiencesIndex({ experiences, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleting, setDeleting] = useState<number | null>(null);
    const dialog = useConfirmDialog();

    const handleSearch = (v: string) => { setSearch(v); router.get('/admin/experiences', { search: v }, { preserveState: true, replace: true }); };
    const handleDelete = async (id: number) => { if (await dialog.confirm()) { setDeleting(id); router.delete(`/admin/experiences/${id}`, { onFinish: () => setDeleting(null) }); } };

    return (
        <AdminLayout title="Experience" description="Manage work experiences" actions={
            <Link href="/admin/experiences/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"><Plus className="h-4 w-4" /> Add Experience</Link>
        }>
            <Head title="Manage Experience" />
            <div className="mb-6 max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search experiences..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-surface-300 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
            </div>
            {experiences.length === 0 ? (
                <EmptyState icon={Briefcase} title="No experiences yet" description="Add your first work experience."
                    action={<Link href="/admin/experiences/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700"><Plus className="h-4 w-4" /> Add Experience</Link>} />
            ) : (
                <div className="space-y-3">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="bg-white rounded-xl border border-surface-100 p-5 shadow-sm hover:shadow-md transition-all flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <h3 className="font-semibold text-surface-900">{exp.title}</h3>
                                <p className="text-sm text-primary-600 mt-0.5">{exp.organization}{exp.location ? ` · ${exp.location}` : ''}</p>
                                <p className="text-xs text-surface-400 mt-1">{fmt(exp.start_date)} — {exp.is_current ? 'Present' : exp.end_date ? fmt(exp.end_date) : ''}</p>
                                {exp.description && <p className="text-sm text-surface-500 mt-2 line-clamp-2">{exp.description}</p>}
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <Link href={`/admin/experiences/${exp.id}/edit`} className="p-1.5 rounded-md text-surface-400 hover:text-primary-600 hover:bg-primary-50 transition-colors" aria-label="Edit"><Edit className="h-4 w-4" /></Link>
                                <button onClick={() => handleDelete(exp.id)} disabled={deleting === exp.id} className="p-1.5 rounded-md text-surface-400 hover:text-danger-600 hover:bg-danger-50 transition-colors disabled:opacity-50" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ConfirmDialog open={dialog.isOpen} title="Delete Experience" message="Are you sure? This cannot be undone." onConfirm={dialog.handleConfirm} onCancel={dialog.handleCancel} />
        </AdminLayout>
    );
}
