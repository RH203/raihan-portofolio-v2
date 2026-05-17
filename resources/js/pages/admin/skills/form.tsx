import { DynamicIcon, availableIconNames, iconPickerGroups } from '@/components/ui/dynamic-icon';
import AdminLayout from '@/layouts/admin-layout';
import type { Skill } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Check, Save, Search, X } from 'lucide-react';
import { type FormEvent, useMemo, useState } from 'react';

interface Props {
    skill?: Skill;
    categories: string[];
}

export default function SkillForm({ skill, categories }: Props) {
    const isEditing = !!skill;
    const { data, setData, post, put, processing, errors } = useForm({
        name: skill?.name || '',
        category: skill?.category || categories[0] || '',
        icon: skill?.icon || 'code',
        sort_order: skill?.sort_order || 0,
    });

    const [pickerOpen, setPickerOpen] = useState(false);
    const [iconSearch, setIconSearch] = useState('');

    // Filter icons based on search
    const filteredGroups = useMemo(() => {
        if (!iconSearch.trim()) return iconPickerGroups;

        const q = iconSearch.toLowerCase();
        return iconPickerGroups
            .map((group) => ({
                ...group,
                icons: group.icons.filter((name) => name.includes(q)),
            }))
            .filter((group) => group.icons.length > 0);
    }, [iconSearch]);

    const flatFiltered = useMemo(() => {
        if (!iconSearch.trim()) return [];
        const q = iconSearch.toLowerCase();
        return availableIconNames.filter((name) => name.includes(q));
    }, [iconSearch]);

    const handleSelectIcon = (name: string) => {
        setData('icon', name);
        setPickerOpen(false);
        setIconSearch('');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/skills/${skill.id}`);
        } else {
            post('/admin/skills');
        }
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Skill' : 'Add Skill'} description={isEditing ? `Editing "${skill.name}"` : 'Create a new skill entry'}>
            <Head title={isEditing ? 'Edit Skill' : 'Add Skill'} />

            <div className="mb-6">
                <Link href="/admin/skills" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Skills
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
                <div className="bg-white rounded-xl border border-surface-100 p-6 shadow-sm space-y-5">
                    <div className="space-y-1.5">
                        <label htmlFor="name" className="block text-sm font-medium text-surface-700">Skill Name *</label>
                        <input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                            className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" required placeholder="e.g. React" />
                        {errors.name && <p className="text-xs text-danger-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="category" className="block text-sm font-medium text-surface-700">Category *</label>
                        <select id="category" value={data.category} onChange={(e) => setData('category', e.target.value)}
                            className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none" required>
                            {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                        </select>
                        {errors.category && <p className="text-xs text-danger-500">{errors.category}</p>}
                    </div>

                    {/* Icon Picker */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-surface-700">Icon *</label>

                        {/* Selected icon display */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setPickerOpen(!pickerOpen)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-surface-300 bg-white hover:border-primary-400 hover:bg-surface-50 transition-colors w-full text-left"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                                    <DynamicIcon name={data.icon} className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-surface-900">{data.icon}</p>
                                    <p className="text-xs text-surface-400">Click to change icon</p>
                                </div>
                                <DynamicIcon name={pickerOpen ? 'code' : 'search'} className="h-4 w-4 text-surface-400" />
                            </button>
                        </div>
                        {errors.icon && <p className="text-xs text-danger-500">{errors.icon}</p>}

                        {/* Icon picker dropdown */}
                        {pickerOpen && (
                            <div className="mt-2 rounded-xl border border-surface-200 bg-white shadow-lg overflow-hidden">
                                {/* Search bar */}
                                <div className="sticky top-0 bg-white border-b border-surface-100 p-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                                        <input
                                            type="text"
                                            value={iconSearch}
                                            onChange={(e) => setIconSearch(e.target.value)}
                                            placeholder="Search icons..."
                                            className="w-full pl-9 pr-8 py-2 rounded-lg border border-surface-300 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                                            autoFocus
                                        />
                                        {iconSearch && (
                                            <button
                                                type="button"
                                                onClick={() => setIconSearch('')}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-surface-400 hover:text-surface-600"
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="max-h-72 overflow-y-auto p-3 space-y-4">
                                    {iconSearch.trim() ? (
                                        // Flat search results
                                        flatFiltered.length === 0 ? (
                                            <p className="text-sm text-surface-400 text-center py-4">No icons found for &quot;{iconSearch}&quot;</p>
                                        ) : (
                                            <div className="grid grid-cols-6 sm:grid-cols-8 gap-1">
                                                {flatFiltered.map((name) => (
                                                    <button
                                                        key={name}
                                                        type="button"
                                                        onClick={() => handleSelectIcon(name)}
                                                        title={name}
                                                        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                                                            data.icon === name
                                                                ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500/30'
                                                                : 'hover:bg-surface-100 text-surface-600'
                                                        }`}
                                                    >
                                                        <DynamicIcon name={name} className="h-5 w-5" />
                                                        {data.icon === name && <Check className="h-3 w-3 text-primary-600" />}
                                                    </button>
                                                ))}
                                            </div>
                                        )
                                    ) : (
                                        // Grouped view
                                        filteredGroups.map((group) => (
                                            <div key={group.label}>
                                                <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">{group.label}</p>
                                                <div className="grid grid-cols-6 sm:grid-cols-8 gap-1">
                                                    {group.icons.map((name) => (
                                                        <button
                                                            key={name}
                                                            type="button"
                                                            onClick={() => handleSelectIcon(name)}
                                                            title={name}
                                                            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                                                                data.icon === name
                                                                    ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500/30'
                                                                    : 'hover:bg-surface-100 text-surface-600'
                                                            }`}
                                                        >
                                                            <DynamicIcon name={name} className="h-5 w-5" />
                                                            {data.icon === name && <Check className="h-3 w-3 text-primary-600" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Close */}
                                <div className="border-t border-surface-100 px-3 py-2 bg-surface-50 flex items-center justify-between">
                                    <p className="text-xs text-surface-400">{availableIconNames.length} icons available</p>
                                    <button
                                        type="button"
                                        onClick={() => { setPickerOpen(false); setIconSearch(''); }}
                                        className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="sort_order" className="block text-sm font-medium text-surface-700">Sort Order</label>
                        <input id="sort_order" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                            className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" min={0} />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button type="submit" disabled={processing}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors disabled:opacity-50">
                        <Save className="h-4 w-4" /> {processing ? 'Saving...' : isEditing ? 'Update Skill' : 'Create Skill'}
                    </button>
                    <Link href="/admin/skills" className="px-4 py-2.5 rounded-lg border border-surface-300 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors">
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
