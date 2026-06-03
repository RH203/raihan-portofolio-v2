import { DynamicIcon } from '@/components/ui/dynamic-icon';
import { EmptyState } from '@/components/ui/empty-state';
import AdminLayout from '@/layouts/admin-layout';
import type { Skill } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog';

interface Props {
    skills: Skill[];
    categories: string[];
    filters: { search?: string; category?: string };
}

export default function SkillsIndex({ skills, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleting, setDeleting] = useState<number | null>(null);
    const [selected, setSelected] = useState<number[]>([]);
    const [bulkDeleting, setBulkDeleting] = useState(false);
    const dialog = useConfirmDialog();
    const bulkDialog = useConfirmDialog();

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/admin/skills', { search: value, category: filters.category }, { preserveState: true, replace: true });
    };

    const handleFilter = (category: string) => {
        router.get('/admin/skills', { search: filters.search, category: category || undefined }, { preserveState: true, replace: true });
    };

    const handleDelete = async (id: number) => {
        const confirmed = await dialog.confirm();
        if (confirmed) {
            setDeleting(id);
            router.delete(`/admin/skills/${id}`, { onFinish: () => setDeleting(null) });
        }
    };

    const toggleSelect = (id: number) => {
        setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        setSelected((prev) => prev.length === skills.length ? [] : skills.map((s) => s.id));
    };

    const handleBulkDelete = async () => {
        if (selected.length === 0) return;
        const confirmed = await bulkDialog.confirm();
        if (confirmed) {
            setBulkDeleting(true);
            router.delete('/admin/skills', {
                data: { ids: selected },
                onSuccess: () => setSelected([]),
                onFinish: () => setBulkDeleting(false),
            });
        }
    };

    const allSelected = skills.length > 0 && selected.length === skills.length;
    const someSelected = selected.length > 0 && selected.length < skills.length;

    return (
        <AdminLayout
            title="Skills"
            description="Manage your skills and technologies"
            actions={
                <Link href="/admin/skills/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
                    <Plus className="h-4 w-4" /> Add Skill
                </Link>
            }
        >
            <Head title="Manage Skills" />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search skills..."
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-surface-300 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                    />
                </div>
                <select
                    value={filters.category || ''}
                    onChange={(e) => handleFilter(e.target.value)}
                    className="rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {selected.length > 0 && (
                    <button
                        onClick={handleBulkDelete}
                        disabled={bulkDeleting}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-danger-600 text-white text-sm font-medium hover:bg-danger-700 transition-colors disabled:opacity-50"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete Selected ({selected.length})
                    </button>
                )}
            </div>

            {skills.length === 0 ? (
                <EmptyState
                    title="No skills yet"
                    description="Add your first skill to showcase your expertise."
                    action={
                        <Link href="/admin/skills/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
                            <Plus className="h-4 w-4" /> Add Skill
                        </Link>
                    }
                />
            ) : (
                <div className="bg-white rounded-xl border border-surface-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-surface-50 border-b border-surface-100">
                            <tr>
                                <th className="px-6 py-3 w-10">
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        ref={(el) => { if (el) el.indeterminate = someSelected; }}
                                        onChange={toggleSelectAll}
                                        className="rounded border-surface-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                                        aria-label="Select all skills"
                                    />
                                </th>
                                <th className="text-left px-6 py-3 font-medium text-surface-600">Skill</th>
                                <th className="text-left px-6 py-3 font-medium text-surface-600">Category</th>
                                <th className="text-left px-6 py-3 font-medium text-surface-600">Icon</th>
                                <th className="text-left px-6 py-3 font-medium text-surface-600">Order</th>
                                <th className="text-right px-6 py-3 font-medium text-surface-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-100">
                            {skills.map((skill) => (
                                <tr key={skill.id} className={`hover:bg-surface-50 transition-colors ${selected.includes(skill.id) ? 'bg-primary-50' : ''}`}>
                                    <td className="px-6 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(skill.id)}
                                            onChange={() => toggleSelect(skill.id)}
                                            className="rounded border-surface-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                                            aria-label={`Select ${skill.name}`}
                                        />
                                    </td>
                                    <td className="px-6 py-3 font-medium text-surface-900">{skill.name}</td>
                                    <td className="px-6 py-3">
                                        <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium">{skill.category}</span>
                                    </td>
                                    <td className="px-6 py-3 text-surface-500">
                                        <span className="inline-flex items-center gap-2">
                                            <DynamicIcon name={skill.icon} className="h-4 w-4 text-primary-600" />
                                            <span className="text-xs text-surface-400">{skill.icon}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-surface-500">{skill.sort_order}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/skills/${skill.id}/edit`} className="p-1.5 rounded-md text-surface-400 hover:text-primary-600 hover:bg-primary-50 transition-colors" aria-label={`Edit ${skill.name}`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(skill.id)} disabled={deleting === skill.id} className="p-1.5 rounded-md text-surface-400 hover:text-danger-600 hover:bg-danger-50 transition-colors disabled:opacity-50" aria-label={`Delete ${skill.name}`}>
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmDialog
                open={dialog.isOpen}
                title="Delete Skill"
                message="Are you sure you want to delete this skill? This action cannot be undone."
                onConfirm={dialog.handleConfirm}
                onCancel={dialog.handleCancel}
            />

            <ConfirmDialog
                open={bulkDialog.isOpen}
                title="Delete Selected Skills"
                message={`Are you sure you want to delete ${selected.length} skill(s)? This action cannot be undone.`}
                onConfirm={bulkDialog.handleConfirm}
                onCancel={bulkDialog.handleCancel}
            />
        </AdminLayout>
    );
}
