import AdminLayout from '@/layouts/admin-layout';
import type { Education } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { type FormEvent } from 'react';

interface Props { education?: Education; }

export default function EducationForm({ education }: Props) {
    const isEditing = !!education;
    const { data, setData, post, put, processing, errors } = useForm({
        institution: education?.institution || '',
        program: education?.program || '',
        start_year: education?.start_year || new Date().getFullYear(),
        end_year: education?.end_year || (null as number | null),
        description: education?.description || '',
        sort_order: education?.sort_order || 0,
    });

    const handleSubmit = (e: FormEvent) => { e.preventDefault(); isEditing ? put(`/admin/education/${education.id}`) : post('/admin/education'); };

    return (
        <AdminLayout title={isEditing ? 'Edit Education' : 'Add Education'}>
            <Head title={isEditing ? 'Edit Education' : 'Add Education'} />
            <div className="mb-6"><Link href="/admin/education" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700"><ArrowLeft className="h-4 w-4" /> Back</Link></div>

            <form onSubmit={handleSubmit} className="max-w-lg bg-white rounded-xl border border-surface-100 p-6 shadow-sm space-y-5">
                <div className="space-y-1.5">
                    <label htmlFor="institution" className="block text-sm font-medium text-surface-700">Institution *</label>
                    <input id="institution" type="text" value={data.institution} onChange={(e) => setData('institution', e.target.value)}
                        className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" required />
                    {errors.institution && <p className="text-xs text-danger-500">{errors.institution}</p>}
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="program" className="block text-sm font-medium text-surface-700">Program / Major *</label>
                    <input id="program" type="text" value={data.program} onChange={(e) => setData('program', e.target.value)}
                        className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" required />
                    {errors.program && <p className="text-xs text-danger-500">{errors.program}</p>}
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label htmlFor="start_year" className="block text-sm font-medium text-surface-700">Start Year *</label>
                        <input id="start_year" type="number" value={data.start_year} onChange={(e) => setData('start_year', parseInt(e.target.value))}
                            className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none" required min={1900} max={2100} />
                        {errors.start_year && <p className="text-xs text-danger-500">{errors.start_year}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="end_year" className="block text-sm font-medium text-surface-700">End Year</label>
                        <input id="end_year" type="number" value={data.end_year ?? ''} onChange={(e) => setData('end_year', e.target.value ? parseInt(e.target.value) : null)}
                            className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none" min={1900} max={2100} />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="description" className="block text-sm font-medium text-surface-700">Description</label>
                    <textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3}
                        className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none resize-y" />
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="sort_order" className="block text-sm font-medium text-surface-700">Sort Order</label>
                    <input id="sort_order" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                        className="block w-full max-w-[120px] rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none" min={0} />
                </div>
                <div className="flex items-center gap-3 pt-2">
                    <button type="submit" disabled={processing} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors disabled:opacity-50">
                        <Save className="h-4 w-4" /> {processing ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                    </button>
                    <Link href="/admin/education" className="px-4 py-2.5 rounded-lg border border-surface-300 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors">Cancel</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
