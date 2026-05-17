import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog';
import { EmptyState } from '@/components/ui/empty-state';
import AdminLayout from '@/layouts/admin-layout';
import type { Education } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, GraduationCap, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props { education: Education[]; filters: { search?: string }; }

export default function EducationIndex({ education, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleting, setDeleting] = useState<number | null>(null);
    const dialog = useConfirmDialog();

    const handleSearch = (v: string) => { setSearch(v); router.get('/admin/education', { search: v }, { preserveState: true, replace: true }); };
    const handleDelete = async (id: number) => { if (await dialog.confirm()) { setDeleting(id); router.delete(`/admin/education/${id}`, { onFinish: () => setDeleting(null) }); } };

    return (
        <AdminLayout title="Education" description="Manage education entries" actions={
            <Link href="/admin/education/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"><Plus className="h-4 w-4" /> Add Education</Link>
        }>
            <Head title="Manage Education" />
            <div className="mb-6 max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-surface-300 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
            </div>
            {education.length === 0 ? (
                <EmptyState icon={GraduationCap} title="No education entries" description="Add your first education entry."
                    action={<Link href="/admin/education/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700"><Plus className="h-4 w-4" /> Add Education</Link>} />
            ) : (
                <div className="space-y-3">
                    {education.map((edu) => (
                        <div key={edu.id} className="bg-white rounded-xl border border-surface-100 p-5 shadow-sm hover:shadow-md transition-all flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 min-w-0">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 flex-shrink-0"><GraduationCap className="h-5 w-5" /></div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-surface-900">{edu.institution}</h3>
                                    <p className="text-sm text-primary-600 mt-0.5">{edu.program}</p>
                                    <p className="text-xs text-surface-400 mt-1">{edu.start_year} — {edu.end_year || 'Present'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <Link href={`/admin/education/${edu.id}/edit`} className="p-1.5 rounded-md text-surface-400 hover:text-primary-600 hover:bg-primary-50 transition-colors" aria-label="Edit"><Edit className="h-4 w-4" /></Link>
                                <button onClick={() => handleDelete(edu.id)} disabled={deleting === edu.id} className="p-1.5 rounded-md text-surface-400 hover:text-danger-600 hover:bg-danger-50 transition-colors disabled:opacity-50" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ConfirmDialog open={dialog.isOpen} title="Delete Education" message="Are you sure? This cannot be undone." onConfirm={dialog.handleConfirm} onCancel={dialog.handleCancel} />
        </AdminLayout>
    );
}
