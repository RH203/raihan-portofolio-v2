import { FigureImage } from '@/components/admin/figure-image-extension';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Heading2, ImagePlus, Italic, Link, List, ListOrdered, Pencil, Quote, Redo2, Undo2 } from 'lucide-react';
import { useRef, useState } from 'react';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

interface ImageForm {
    src: string;
    alt: string;
    caption: string;
    source: string;
    size: 'compact' | 'full';
    width: number | null;
    height: number | null;
}

const emptyImage: ImageForm = { src: '', alt: '', caption: '', source: '', size: 'full', width: null, height: null };

const getDimensions = (src: string) => new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error('Unable to read the uploaded image.'));
    image.src = src;
});

export default function RichTextEditor({ value, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingImage, setEditingImage] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [imageForm, setImageForm] = useState<ImageForm>(emptyImage);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ link: false }),
            LinkExtension.configure({ openOnClick: false, autolink: true, defaultProtocol: 'https' }),
            Placeholder.configure({ placeholder: 'Write your story...' }),
            FigureImage,
        ],
        content: value,
        editorProps: { attributes: { class: 'prose prose-surface min-h-[440px] max-w-none px-5 py-4 focus:outline-none' } },
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    const addLink = () => {
        if (!editor) return;
        const url = window.prompt('Link URL', editor.getAttributes('link').href || 'https://');
        if (url === null) return;
        if (!url.trim()) editor.chain().focus().unsetLink().run();
        else editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const uploadImage = async (file?: File) => {
        if (!file) return;
        const token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        setError('');

        try {
            const response = await fetch('/admin/blog/upload-image', {
                method: 'POST',
                headers: { Accept: 'application/json', ...(token ? { 'X-CSRF-TOKEN': token } : {}) },
                body: formData,
            });
            if (!response.ok) throw new Error('Image upload failed.');
            const result = await response.json();
            const dimensions = await getDimensions(result.url);
            setImageForm({
                src: result.url,
                alt: file.name.replace(/\.[^/.]+$/, ''),
                caption: '',
                source: '',
                size: dimensions.width <= 720 ? 'compact' : 'full',
                width: dimensions.width,
                height: dimensions.height,
            });
            setEditingImage(false);
            setDialogOpen(true);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Image upload failed.');
            setDialogOpen(true);
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const openSelectedImage = () => {
        if (!editor?.isActive('figureImage')) return;
        const attrs = editor.getAttributes('figureImage');
        setImageForm({
            src: attrs.src || '', alt: attrs.alt || '', caption: attrs.caption || '', source: attrs.source || '',
            size: attrs.size === 'compact' ? 'compact' : 'full', width: attrs.width || null, height: attrs.height || null,
        });
        setEditingImage(true);
        setError('');
        setDialogOpen(true);
    };

    const saveImage = () => {
        if (!editor || !imageForm.src) return;
        const attrs = { ...imageForm, alt: imageForm.alt || imageForm.caption || 'Article image' };
        if (editingImage) editor.chain().focus().updateAttributes('figureImage', attrs).run();
        else editor.chain().focus().insertContent([{ type: 'figureImage', attrs }, { type: 'paragraph' }]).run();
        setDialogOpen(false);
        setImageForm(emptyImage);
    };

    if (!editor) return null;
    const button = (active = false) => `rounded-md p-2 ${active ? 'bg-primary-100 text-primary-700' : 'text-surface-600 hover:bg-white hover:text-surface-900'}`;

    return (
        <>
            <div className="overflow-hidden rounded-lg border border-surface-300 bg-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20">
                <div className="flex flex-wrap gap-1 border-b border-surface-200 bg-surface-50 p-2">
                    <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={button(editor.isActive('bold'))}><Bold className="h-4 w-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={button(editor.isActive('italic'))}><Italic className="h-4 w-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={button(editor.isActive('heading', { level: 2 }))}><Heading2 className="h-4 w-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={button(editor.isActive('blockquote'))}><Quote className="h-4 w-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={button(editor.isActive('bulletList'))}><List className="h-4 w-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={button(editor.isActive('orderedList'))}><ListOrdered className="h-4 w-4" /></button>
                    <button type="button" onClick={addLink} className={button(editor.isActive('link'))}><Link className="h-4 w-4" /></button>
                    <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className={button()}><ImagePlus className="h-4 w-4" /></button>
                    <button type="button" onClick={openSelectedImage} disabled={!editor.isActive('figureImage')} className={button(editor.isActive('figureImage'))}><Pencil className="h-4 w-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={button()}><Undo2 className="h-4 w-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={button()}><Redo2 className="h-4 w-4" /></button>
                    <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => uploadImage(e.target.files?.[0])} />
                    {uploading && <span className="self-center px-2 text-xs text-surface-500">Uploading and converting to WebP...</span>}
                </div>
                <div className="rich-text-editor"><EditorContent editor={editor} /></div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingImage ? 'Edit image' : 'Insert image'}</DialogTitle>
                        <DialogDescription>Add a Word-style caption and image source, then choose how it appears in the article.</DialogDescription>
                    </DialogHeader>
                    {imageForm.src && <img src={imageForm.src} alt="Preview" className="max-h-64 w-full rounded-lg object-contain" />}
                    {error && <p className="rounded-lg bg-danger-50 px-3 py-2 text-sm text-danger-600">{error}</p>}
                    <div className="space-y-4">
                        <div><label className="mb-1 block text-sm font-medium">Alt text</label><input value={imageForm.alt} onChange={(e) => setImageForm({ ...imageForm, alt: e.target.value })} className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-sm font-medium">Caption</label><input value={imageForm.caption} onChange={(e) => setImageForm({ ...imageForm, caption: e.target.value })} className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm" placeholder="Figure description" /></div>
                        <div><label className="mb-1 block text-sm font-medium">Source / reference</label><input value={imageForm.source} onChange={(e) => setImageForm({ ...imageForm, source: e.target.value })} className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm" placeholder="Example: Laravel documentation" /></div>
                        <div><label className="mb-1 block text-sm font-medium">Display size</label><select value={imageForm.size} onChange={(e) => setImageForm({ ...imageForm, size: e.target.value as 'compact' | 'full' })} className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm"><option value="compact">Compact and centered</option><option value="full">Full article width</option></select></div>
                    </div>
                    <DialogFooter>
                        <button type="button" onClick={() => setDialogOpen(false)} className="rounded-lg border border-surface-300 px-4 py-2 text-sm font-medium">Cancel</button>
                        <button type="button" onClick={saveImage} disabled={!imageForm.src || !!error} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">{editingImage ? 'Update image' : 'Insert image'}</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
