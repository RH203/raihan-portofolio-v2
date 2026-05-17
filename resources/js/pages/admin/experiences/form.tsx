import AdminLayout from '@/layouts/admin-layout';
import type { Experience } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import { type FormEvent } from 'react';

interface Props { experience?: Experience; }

export default function ExperienceForm({ experience }: Props) {
    const isEditing = !!experience;
    const { data, setData, post, put, processing, errors } = useForm({
        title: experience?.title || '',
        organization: experience?.organization || '',
        location: experience?.location || '',
        start_date: experience?.start_date ? experience.start_date.split('T')[0] : '',
        end_date: experience?.end_date ? experience.end_date.split('T')[0] : '',
        is_current: experience?.is_current || false,
        description: experience?.description || '',
        achievements: experience?.achievements || ([] as string[]),
        sort_order: experience?.sort_order || 0,
    });

    const handleSubmit = (e: FormEvent) => { e.preventDefault(); isEditing ? put(`/admin/experiences/${experience.id}`) : post('/admin/experiences'); };
    const addAchievement = () => setData('achievements', [...data.achievements, '']);
    const updateAchievement = (i: number, v: string) => { const a = [...data.achievements]; a[i] = v; setData('achievements', a); };
    const removeAchievement = (i: number) => setData('achievements', data.achievements.filter((_, idx) => idx !== i));

    return (
        <AdminLayout title={isEditing ? 'Edit Experience' : 'Add Experience'}>
            <Head title={isEditing ? 'Edit Experience' : 'Add Experience'} />
            <div className="mb-6"><Link href="/admin/experiences" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700"><ArrowLeft className="h-4 w-4" /> Back</Link></div>

            <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-xl border border-surface-100 p-6 shadow-sm space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label htmlFor="title" className="block text-sm font-medium text-surface-700">Position / Role *</label>
                        <input id="title" type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" required />
                        {errors.title && <p className="text-xs text-danger-500">{errors.title}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="organization" className="block text-sm font-medium text-surface-700">Organization *</label>
                        <input id="organization" type="text" value={data.organization} onChange={(e) => setData('organization', e.target.value)} className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" required />
                        {errors.organization && <p className="text-xs text-danger-500">{errors.organization}</p>}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="location" className="block text-sm font-medium text-surface-700">Location</label>
                    <input id="location" type="text" value={data.location} onChange={(e) => setData('location', e.target.value)} className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" placeholder="e.g. Jakarta, Indonesia" />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label htmlFor="start_date" className="block text-sm font-medium text-surface-700">Start Date *</label>
                        <input id="start_date" type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none" required />
                        {errors.start_date && <p className="text-xs text-danger-500">{errors.start_date}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="end_date" className="block text-sm font-medium text-surface-700">End Date</label>
                        <input id="end_date" type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} disabled={data.is_current}
                            className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none disabled:bg-surface-50 disabled:text-surface-400" />
                        <label className="flex items-center gap-2 mt-1.5">
                            <input type="checkbox" checked={data.is_current} onChange={(e) => { setData('is_current', e.target.checked); if (e.target.checked) setData('end_date', ''); }}
                                className="h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
                            <span className="text-sm text-surface-600">Currently working here</span>
                        </label>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="description" className="block text-sm font-medium text-surface-700">Description</label>
                    <textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3}
                        className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none resize-y" />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-surface-700">Achievements</label>
                        <button type="button" onClick={addAchievement} className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium">
                            <Plus className="h-3.5 w-3.5" /> Add
                        </button>
                    </div>
                    {data.achievements.map((item, i) => (
                        <div key={i} className="flex gap-2">
                            <input type="text" value={item} onChange={(e) => updateAchievement(i, e.target.value)} placeholder="Achievement..."
                                className="flex-1 rounded-lg border border-surface-300 px-3.5 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
                            <button type="button" onClick={() => removeAchievement(i)} className="p-2 rounded-lg text-surface-400 hover:text-danger-600 hover:bg-danger-50 transition-colors" aria-label="Remove">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
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
                    <Link href="/admin/experiences" className="px-4 py-2.5 rounded-lg border border-surface-300 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors">Cancel</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
