import { ImageCropper } from '@/components/ui/image-cropper';
import AdminLayout from '@/layouts/admin-layout';
import type { Hero } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FileText, Save, Trash2 } from 'lucide-react';
import { type FormEvent, useState } from 'react';

interface Props {
    hero: Hero | null;
}

export default function HeroEdit({ hero }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: hero?.name || '',
        role: hero?.role || '',
        headline: hero?.headline || '',
        description: hero?.description || '',
        primary_cta_text: hero?.primary_cta_text || 'View Portfolio',
        secondary_cta_text: hero?.secondary_cta_text || 'Contact Me',
        develop_mode: hero?.develop_mode ?? false,
        is_open_to_work: hero?.is_open_to_work ?? true,
        photo: null as File | null,
        cv: null as File | null,
        remove_cv: false,
    });

    const [cropSrc, setCropSrc] = useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/hero', { forceFormData: true });
    };

    const handleRemoveCv = () => {
        setData('remove_cv', true);
    };

    const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setCropSrc(reader.result as string);
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const handleCropDone = (file: File) => {
        setData('photo', file);
        setPhotoPreview(URL.createObjectURL(file));
        setCropSrc(null);
    };

    return (
        <AdminLayout title="Hero Section" description="Manage the hero section of your portfolio">
            <Head title="Manage Hero" />

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="bg-white rounded-xl border border-surface-100 p-6 shadow-sm space-y-5">
                    <h2 className="font-semibold text-surface-900">Personal Information</h2>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="block text-sm font-medium text-surface-700">Name *</label>
                            <input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                                className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" required />
                            {errors.name && <p className="text-xs text-danger-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="role" className="block text-sm font-medium text-surface-700">Role / Profession *</label>
                            <input id="role" type="text" value={data.role} onChange={(e) => setData('role', e.target.value)}
                                className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" required />
                            {errors.role && <p className="text-xs text-danger-500">{errors.role}</p>}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="headline" className="block text-sm font-medium text-surface-700">Headline *</label>
                        <input id="headline" type="text" value={data.headline} onChange={(e) => setData('headline', e.target.value)}
                            className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" required />
                        {errors.headline && <p className="text-xs text-danger-500">{errors.headline}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="description" className="block text-sm font-medium text-surface-700">Description *</label>
                        <textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} rows={4}
                            className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none resize-y" required />
                        {errors.description && <p className="text-xs text-danger-500">{errors.description}</p>}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label htmlFor="primary_cta" className="block text-sm font-medium text-surface-700">Primary CTA Text</label>
                            <input id="primary_cta" type="text" value={data.primary_cta_text} onChange={(e) => setData('primary_cta_text', e.target.value)}
                                className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="secondary_cta" className="block text-sm font-medium text-surface-700">Secondary CTA Text</label>
                            <input id="secondary_cta" type="text" value={data.secondary_cta_text} onChange={(e) => setData('secondary_cta_text', e.target.value)}
                                className="block w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
                        </div>
                    </div>

                    <div className="rounded-xl border border-primary-100 bg-primary-50/70 p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-surface-900">Develop Mode</p>
                                <p className="text-sm text-surface-500">
                                    When enabled, the landing page switches to a clean build-in-progress screen.
                                </p>
                            </div>
                            <label htmlFor="develop_mode" className="flex cursor-pointer items-center gap-3">
                                <span className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${data.develop_mode ? 'bg-primary-600' : 'bg-surface-300'}`}>
                                    <span
                                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${data.develop_mode ? 'translate-x-5' : 'translate-x-0.5'}`}
                                    />
                                </span>
                                <input
                                    id="develop_mode"
                                    type="checkbox"
                                    checked={data.develop_mode}
                                    onChange={(e) => setData('develop_mode', e.target.checked)}
                                    className="sr-only"
                                />
                                <span className="text-sm font-medium text-surface-700">
                                    {data.develop_mode ? 'Active' : 'Inactive'}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="rounded-xl border border-surface-200 bg-surface-50/70 p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-surface-900">Availability Badge</p>
                                <p className="text-sm text-surface-500">
                                    Controls the small badge shown next to your photo on the hero section.
                                </p>
                            </div>
                            <label htmlFor="is_open_to_work" className="flex cursor-pointer items-center gap-3">
                                <span className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${data.is_open_to_work ? 'bg-emerald-500' : 'bg-surface-300'}`}>
                                    <span
                                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${data.is_open_to_work ? 'translate-x-5' : 'translate-x-0.5'}`}
                                    />
                                </span>
                                <input
                                    id="is_open_to_work"
                                    type="checkbox"
                                    checked={data.is_open_to_work}
                                    onChange={(e) => setData('is_open_to_work', e.target.checked)}
                                    className="sr-only"
                                />
                                <span className="text-sm font-medium text-surface-700">
                                    {data.is_open_to_work ? 'Open to work' : 'Not accepting opportunities'}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="photo" className="block text-sm font-medium text-surface-700">Photo</label>
                        {(photoPreview || hero?.photo_url) && (
                            <div className="mb-2">
                                <img
                                    src={photoPreview ?? `/storage/${hero!.photo_url}`}
                                    alt="Current"
                                    className="h-32 w-26 rounded-md object-cover border border-surface-200 aspect-4/5"
                                />
                                {photoPreview && (
                                    <p className="mt-1 text-xs text-primary-600 font-medium">Preview (not saved yet)</p>
                                )}
                            </div>
                        )}
                        <input id="photo" type="file" accept="image/*" onChange={handlePhotoSelect}
                            className="block w-full text-sm text-surface-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                        <p className="text-xs text-surface-400">Photo will be cropped to a portrait frame (4:5 ratio). Max 2MB.</p>
                        {errors.photo && <p className="text-xs text-danger-500">{errors.photo}</p>}
                    </div>
                </div>

                {/* CV / Resume Section */}
                <div className="bg-white rounded-xl border border-surface-100 p-6 shadow-sm space-y-5">
                    <h2 className="font-semibold text-surface-900">CV / Resume</h2>
                    <p className="text-sm text-surface-500">Upload your latest CV. Visitors will see a &quot;View CV&quot; button on the hero section.</p>

                    {hero?.cv_url && !data.remove_cv && (
                        <div className="flex items-center gap-3 rounded-lg bg-primary-50 border border-primary-100 px-4 py-3">
                            <FileText className="h-5 w-5 text-primary-600 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-primary-700">Current CV</p>
                                <a
                                    href={`/storage/${hero.cv_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary-500 hover:text-primary-700 underline underline-offset-2 truncate block"
                                >
                                    {hero.cv_url.split('/').pop()}
                                </a>
                            </div>
                            <button
                                type="button"
                                onClick={handleRemoveCv}
                                className="p-1.5 rounded-md text-primary-400 hover:text-danger-600 hover:bg-danger-50 transition-colors"
                                aria-label="Remove current CV"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    )}

                    {data.remove_cv && (
                        <div className="rounded-lg bg-warning-50 border border-warning-500/20 px-4 py-3 flex items-center justify-between">
                            <p className="text-sm text-warning-600">CV will be removed on save.</p>
                            <button
                                type="button"
                                onClick={() => setData('remove_cv', false)}
                                className="text-xs font-medium text-warning-600 hover:text-warning-700 underline"
                            >
                                Undo
                            </button>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label htmlFor="cv" className="block text-sm font-medium text-surface-700">
                            {hero?.cv_url && !data.remove_cv ? 'Replace CV' : 'Upload CV'}
                        </label>
                        <input
                            id="cv"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                setData('cv', e.target.files?.[0] || null);
                                if (e.target.files?.[0]) setData('remove_cv', false);
                            }}
                            className="block w-full text-sm text-surface-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                        />
                        <p className="text-xs text-surface-400">Accepted formats: PDF, DOC, DOCX. Max size: 5MB.</p>
                        {errors.cv && <p className="text-xs text-danger-500">{errors.cv}</p>}
                    </div>
                </div>

                <button type="submit" disabled={processing}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors disabled:opacity-50">
                    <Save className="h-4 w-4" />
                    {processing ? 'Saving...' : 'Save Changes'}
                </button>
            </form>

            {cropSrc && (
                <ImageCropper
                    imageSrc={cropSrc}
                    aspect={4 / 5}
                    onCropDone={handleCropDone}
                    onCancel={() => setCropSrc(null)}
                />
            )}
        </AdminLayout>
    );
}
