"use client";

import { useRef, useCallback, useState } from 'react';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PhotoUploaderProps {
  onImageLoad: (imageSrc: string, width: number, height: number) => void;
}

export function PhotoUploader({ onImageLoad }: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        onImageLoad(e.target!.result as string, img.naturalWidth, img.naturalHeight);
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  }, [onImageLoad]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-12 transition-all',
        dragOver
          ? 'border-navy bg-navy/5'
          : 'border-warm-medium bg-warm-light/50 hover:border-navy/30'
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Upload photo"
      />

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy/10 mb-4">
        <Upload className="h-7 w-7 text-navy" />
      </div>

      <h3 className="font-heading text-lg font-semibold text-navy text-center">
        Upload a photo of your space
      </h3>
      <p className="mt-2 text-sm text-dark/60 text-center max-w-sm">
        Take a photo of your kitchen or bathroom countertop area. We&apos;ll help you see how different stones look in your space.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button
          variant="gold"
          size="lg"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="mr-2 h-4 w-4" />
          Take Photo
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.removeAttribute('capture');
              fileInputRef.current.click();
              fileInputRef.current.setAttribute('capture', 'environment');
            }
          }}
        >
          <ImageIcon className="mr-2 h-4 w-4" />
          Choose from Library
        </Button>
      </div>

      <div className="mt-6 rounded-lg bg-white/80 p-3 text-center">
        <p className="text-xs text-dark/50">
          <strong className="text-dark/70">Tips for best results:</strong> Good lighting, straight-on angle,
          clear view of the countertop area. Landscape orientation works best.
        </p>
      </div>
    </div>
  );
}
