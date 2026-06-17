import { FigureImage } from '@/components/admin/figure-image-extension';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold,
    Heading2,
    ImagePlus,
    Italic,
    Link,
    List,
    ListOrdered,
    Pencil,
    Quote,
    Redo2,
    Undo2,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

interface ImageDimensions {
    width: number;
    height: number;
}

const getImageDimensions = (url: string): Promise<ImageDimensions> => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error('Unable to read image dimensions.'));
    image.src = url;
});

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ link: false }),
            LinkExtension.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
            }),
            Placeholder.configure({ placeholder: 'Write your story...' }),
            FigureImage,
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-surface min-h-[440px] max-w-none px-5 py-4 focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    const addLink = () => {
        if (!editor) return;

        const previousUrl = editor.getAttributes('link').href as string | undefined;
        const url = window.prompt('Link URL', previousUrl || 'https://');

        if (url === null) return;
        if (url.trim() === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const editSelectedImage = () => {
        if (!editor || !editor.isActive('figureImage')) return;

        const attributes = editor.getAttributes('figureImage');
        const caption = window.prompt('Image caption', attributes.caption || '');
        if (caption === null) return;

        const source = window.prompt('Image source or reference', attributes.source || '');
        if (source === null) return;

        const size = window.confirm('Use full width? Select Cancel to keep it compact and centered.')
            ? 'full'
            : 'compact';

        editor.chain().focus().updateAttributes('figureImage', {
            caption: caption.trim(),
            source: source.trim(),
            size,
            alt: caption.trim() || attributes.alt || 'Article image',
        }).run();
    };

    const uploadImage = async (file?: File) => {
        if (!file || !editor) return;

        const token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const response = await fetch('/admin/blog/upload-image', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    ...(token ? { 'X-CSRF-TOKEN': token } : {}),
                },
                body: formData,
            });

            if (!response.ok) throw new Error('Image upload failed.');

            const result = await response.json();
            const dimensions = await getImageDimensions(result.url);
            const caption = window.prompt('Image caption, like a Word figure caption', '') || '';
            const source = window.prompt('Image source or reference', '') || '';
            const size = dimensions.width <= 720 ? 'compact' : 'full';

            editor.chain().focus().insertContent([
                {
                    type: 'figureImage',
                    attrs: {
                        src: result.url,
                        alt: caption || file.name,
                        caption,
                        source,
                        size,
                        width: dimensions.width,
                        height: dimensions.height,
                    },
                },
                { type: 'paragraph' },
            ]).run();
        } catch (error) {
            window.alert(error instanceof Error ? error.message : 'Image upload failed.');
        } finally {
            setUploading(false);
            if (imageInputRef.current) imageInputRef.current.value = '';
        }
    };

    if (!editor) return null;

    const buttonClass = (active = false) => `rounded-md p-2 transition ${active ? 'bg-primary-100 text-primary-700' : 'text-surface-600 hover:bg-white hover:text-surface-900'}`;

    return (
        <div className="overflow-hidden rounded-lg border border-surface-300 bg-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20">
            <div className="flex flex-wrap gap-1 border-b border-surface-200 bg-surface-50 p-2">
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClass(editor.isActive('bold'))} title="Bold" aria-label="Bold"><Bold className="h-4 w-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonClass(editor.isActive('italic'))} title="Italic" aria-label="Italic"><Italic className="h-4 w-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonClass(editor.isActive('heading', { level: 2 }))} title="Heading" aria-label="Heading"><Heading2 className="h-4 w-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonClass(editor.isActive('blockquote'))} title="Quote" aria-label="Quote"><Quote className="h-4 w-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(editor.isActive('bulletList'))} title="Bulleted list" aria-label="Bulleted list"><List className="h-4 w-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(editor.isActive('orderedList'))} title="Numbered list" aria-label="Numbered list"><ListOrdered className="h-4 w-4" /></button>
                <button type="button" onClick={addLink} className={buttonClass(editor.isActive('link'))} title="Link" aria-label="Link"><Link className="h-4 w-4" /></button>
                <button type="button" onClick={() => imageInputRef.current?.click()} disabled={uploading} className={buttonClass()} title="Insert image" aria-label="Insert image"><ImagePlus className="h-4 w-4" /></button>
                <button type="button" onClick={editSelectedImage} disabled={!editor.isActive('figureImage')} className={buttonClass(editor.isActive('figureImage'))} title="Edit image caption and source" aria-label="Edit image caption and source"><Pencil className="h-4 w-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={buttonClass()} title="Undo" aria-label="Undo"><Undo2 className="h-4 w-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={buttonClass()} title="Redo" aria-label="Redo"><Redo2 className="h-4 w-4" /></button>
                <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => uploadImage(event.target.files?.[0])} />
                {uploading && <span className="self-center px-2 text-xs text-surface-500">Uploading and converting to WebP...</span>}
            </div>

            <div className="[counter-reset:figure] [&_figure]:my-8 [&_figure]:text-center [&_figure[data-size=compact]]:mx-auto [&_figure[data-size=compact]]:max-w-xl [&_figure[data-size=full]]:w-full [&_figure_img]:mx-auto [&_figure_img]:h-auto [&_figure_img]:max-h-[680px] [&_figure_img]:w-auto [&_figure_img]:max-w-full [&_figure_img]:rounded-xl [&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:text-surface-500 [&_figcaption_[data-figure-label]]:before:[content:'Figure_'_counter(figure)_'—_'] [&_figcaption_[data-figure-label]]:[counter-increment:figure] [&_figcaption_[data-source]]:mt-1 [&_figcaption_[data-source]]:block [&_figcaption_[data-source]]:text-xs [&_figcaption_[data-source]:not(:empty)]:before:[content:'Source:_']">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
