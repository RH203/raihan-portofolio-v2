import Cropper from 'react-easy-crop';
import { useCallback, useState } from 'react';
import { X, Check, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface CropArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Props {
    imageSrc: string;
    aspect?: number;
    onCropDone: (file: File) => void;
    onCancel: () => void;
}

async function getCroppedBlob(imageSrc: string, pixelCrop: CropArea, rotation: number): Promise<Blob> {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', reject);
        img.src = imageSrc;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    const rad = (rotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad));
    const cos = Math.abs(Math.cos(rad));
    const rotW = image.width * cos + image.height * sin;
    const rotH = image.width * sin + image.height * cos;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    const offscreen = document.createElement('canvas');
    offscreen.width = rotW;
    offscreen.height = rotH;
    const offCtx = offscreen.getContext('2d')!;
    offCtx.translate(rotW / 2, rotH / 2);
    offCtx.rotate(rad);
    offCtx.drawImage(image, -image.width / 2, -image.height / 2);

    ctx.drawImage(offscreen, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Canvas is empty'));
        }, 'image/jpeg', 0.92);
    });
}

export function ImageCropper({ imageSrc, aspect = 1, onCropDone, onCancel }: Props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);

    const onCropComplete = useCallback((_: unknown, pixels: CropArea) => {
        setCroppedAreaPixels(pixels);
    }, []);

    const handleConfirm = async () => {
        if (!croppedAreaPixels) return;
        const blob = await getCroppedBlob(imageSrc, croppedAreaPixels, rotation);
        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
        onCropDone(file);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100">
                    <h3 className="font-semibold text-surface-900">Crop Photo</h3>
                    <button onClick={onCancel} className="p-1.5 rounded-md text-surface-400 hover:text-surface-700 hover:bg-surface-100 transition-colors">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="relative bg-surface-900" style={{ height: 380 }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        cropShape="round"
                        showGrid={false}
                    />
                </div>

                <div className="px-5 py-4 space-y-3 border-t border-surface-100">
                    <div className="flex items-center gap-3">
                        <ZoomOut className="h-4 w-4 text-surface-400 flex-shrink-0" />
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.05}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="flex-1 accent-primary-600"
                        />
                        <ZoomIn className="h-4 w-4 text-surface-400 flex-shrink-0" />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setRotation((r) => (r + 90) % 360)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-200 text-sm text-surface-600 hover:bg-surface-50 transition-colors"
                        >
                            <RotateCw className="h-3.5 w-3.5" /> Rotate
                        </button>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 rounded-lg border border-surface-200 text-sm font-medium text-surface-600 hover:bg-surface-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
                            >
                                <Check className="h-4 w-4" /> Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
