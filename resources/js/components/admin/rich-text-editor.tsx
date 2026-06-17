import { Bold, Heading2, ImagePlus, Italic, Link, List, ListOrdered, Quote, Redo2, Undo2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, []);

    const command = (name: string, commandValue?: string) => {
        editorRef.current?.focus();
        document.execCommand(name, false, commandValue);
        onChange(editorRef.current?.innerHTML || '');
    };

    const addLink = () => {
        const url = window.prompt('Enter URL');
        if (url) command('createLink', url);
    };

    const uploadImage = async (file?: File) => {
        if (!file) return;

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
            command('insertImage', result.url);
        } catch (error) {
            window.alert(error instanceof Error ? error.message : 'Image upload failed.');
        } finally {
            setUploading(false);
            if (imageInputRef.current) imageInputRef.current.value = '';
        }
    };

    const toolbar = [
        { label: 'Bold', icon: Bold, action: () => command('bold') },
        { label: 'Italic', icon: Italic, action: () => command('italic') },
        { label: 'Heading', icon: Heading2, action: () => command('formatBlock', 'h2') },
        { label: 'Quote', icon: Quote, action: () => command('formatBlock', 'blockquote') },
        { label: 'Bulleted list', icon: List, action: () => command('insertUnorderedList') },
        { label: 'Numbered list', icon: ListOrdered, action: () => command('insertOrderedList') },
        { label: 'Link', icon: Link, action: addLink },
        { label: 'Undo', icon: Undo2, action: () => command('undo') },
        { label: 'Redo', icon: Redo2, action: () => command('redo') },
    ];

    return (
        <div className="overflow-hidden rounded-lg border border-surface-300 bg-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20">
            <div className="flex flex-wrap gap-1 border-b border-surface-200 bg-surface-50 p-2">
                {toolbar.map((item) => (
                    <button key={item.label} type="button" onClick={item.action} title={item.label} aria-label={item.label} className="rounded-md p-2 text-surface-600 hover:bg-white hover:text-surface-900">
                        <item.icon className="h-4 w-4" />
                    </button>
                ))}
                <button type="button" onClick={() => imageInputRef.current?.click()} disabled={uploading} title="Insert image" aria-label="Insert image" className="rounded-md p-2 text-surface-600 hover:bg-white hover:text-surface-900 disabled:opacity-50">
                    <ImagePlus className="h-4 w-4" />
                </button>
                <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => uploadImage(event.target.files?.[0])} />
                {uploading && <span className="self-center px-2 text-xs text-surface-500">Converting to WebP...</span>}
            </div>
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={(event) => onChange(event.currentTarget.innerHTML)}
                className="prose prose-surface min-h-[420px] max-w-none px-5 py-4 focus:outline-none prose-img:mx-auto prose-img:max-h-[560px] prose-img:rounded-xl"
                data-placeholder="Write your story..."
            />
        </div>
    );
}
