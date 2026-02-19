"use client";

import { useState, useCallback } from 'react';
import { ArrowLeft, Download, Share2, ArrowRight, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PhotoUploader } from './PhotoUploader';
import { SurfaceDrawer } from './SurfaceDrawer';
import { TextureRenderer } from './TextureRenderer';
import { VisualizerControls } from './VisualizerControls';
import { StonePicker } from './StonePicker';
import { ShareModal } from '../shared/ShareModal';
import { TrustBadges } from '../shared/TrustBadges';
import { useFavorites } from '../hooks/useFavorites';
import { useAnalytics } from '../hooks/useAnalytics';
import { getStoneById } from '@/data/showroom/stones';
import type { Point } from '@/data/showroom/types';

type VisualizerStep = 'upload' | 'draw' | 'visualize';

interface RoomVisualizerProps {
  initialStoneId?: string;
  onGetEstimate: (stoneId: string) => void;
}

export function RoomVisualizer({ initialStoneId, onGetEstimate }: RoomVisualizerProps) {
  const { favorites } = useFavorites();
  const { track } = useAnalytics();

  const [step, setStep] = useState<VisualizerStep>('upload');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [polygons, setPolygons] = useState<Point[][]>([]);
  const [selectedStoneId, setSelectedStoneId] = useState<string | null>(initialStoneId || null);

  // Texture controls
  const [opacity, setOpacity] = useState(0.75);
  const [textureScale, setTextureScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showOriginal, setShowOriginal] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const selectedStone = selectedStoneId ? getStoneById(selectedStoneId) : null;

  const handleImageLoad = useCallback((src: string, w: number, h: number) => {
    setImageSrc(src);
    setImageWidth(w);
    setImageHeight(h);
    setStep('draw');
    track('visualizer_photo_uploaded');
  }, [track]);

  const handleDrawComplete = useCallback(() => {
    setStep('visualize');
    track('visualizer_surface_drawn', { polygon_count: polygons.length });
  }, [polygons, track]);

  const handleStoneSelect = useCallback((stoneId: string) => {
    const isSwap = selectedStoneId !== null;
    setSelectedStoneId(stoneId);
    track(isSwap ? 'visualizer_stone_swapped' : 'visualizer_stone_applied', { stone_id: stoneId });
  }, [selectedStoneId, track]);

  const handleReset = () => {
    setStep('upload');
    setImageSrc(null);
    setPolygons([]);
  };

  const handleSaveImage = () => {
    const canvas = document.querySelector('canvas[aria-label="Visualized countertop with stone texture applied"]') as HTMLCanvasElement;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `counter-revolution-${selectedStone?.name?.toLowerCase().replace(/\s+/g, '-') || 'visualization'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    track('visualizer_saved', { stone_id: selectedStoneId });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
          Room Visualizer
        </h2>
        <p className="mt-2 text-dark/70 max-w-xl mx-auto">
          See how premium stone looks on your actual countertops.
          Upload a photo, outline the surface, and watch the transformation.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {[
          { key: 'upload', label: '1. Upload', icon: Camera },
          { key: 'draw', label: '2. Outline' },
          { key: 'visualize', label: '3. Visualize' },
        ].map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            {i > 0 && <div className="h-px w-6 bg-warm-medium sm:w-12" />}
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                step === s.key
                  ? 'bg-navy text-white'
                  : step === 'visualize' || (step === 'draw' && s.key === 'upload')
                    ? 'bg-gold/20 text-gold-dark'
                    : 'bg-warm-light text-dark/50'
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Upload step */}
      {step === 'upload' && (
        <PhotoUploader onImageLoad={handleImageLoad} />
      )}

      {/* Draw step */}
      {step === 'draw' && imageSrc && (
        <div>
          <SurfaceDrawer
            imageSrc={imageSrc}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            polygons={polygons}
            onPolygonsChange={setPolygons}
            onComplete={handleDrawComplete}
          />
          <div className="mt-3">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <ArrowLeft className="mr-1 h-3.5 w-3.5" />
              Upload Different Photo
            </Button>
          </div>
        </div>
      )}

      {/* Visualize step */}
      {step === 'visualize' && imageSrc && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
          {/* Main visualization */}
          <div className="space-y-4">
            <TextureRenderer
              imageSrc={imageSrc}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              polygons={polygons}
              textureSrc={selectedStone?.images.texture || null}
              opacity={opacity}
              textureScale={textureScale}
              rotation={rotation}
              showOriginal={showOriginal}
            />

            {selectedStone && (
              <div className="flex items-center justify-between rounded-lg bg-warm-light p-3">
                <div>
                  <p className="font-heading font-semibold text-navy">{selectedStone.name}</p>
                  <p className="text-sm text-gold-dark">
                    ${selectedStone.pricePerSqFtRange[0]}–${selectedStone.pricePerSqFtRange[1]}/sq ft installed
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSaveImage}>
                    <Download className="mr-1 h-3.5 w-3.5" /> Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowShare(true)}>
                    <Share2 className="mr-1 h-3.5 w-3.5" /> Share
                  </Button>
                </div>
              </div>
            )}

            <VisualizerControls
              opacity={opacity}
              onOpacityChange={setOpacity}
              textureScale={textureScale}
              onTextureScaleChange={setTextureScale}
              rotation={rotation}
              onRotationChange={setRotation}
              showOriginal={showOriginal}
              onToggleOriginal={() => {
                setShowOriginal(!showOriginal);
                track('visualizer_before_after_used');
              }}
              className="lg:hidden"
            />

            {/* CTA */}
            {selectedStone && (
              <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 text-center">
                <p className="font-heading font-semibold text-navy">Love how this looks?</p>
                <p className="mt-1 text-sm text-dark/60">Get a free in-home estimate — we&apos;ll measure everything.</p>
                <Button
                  variant="gold"
                  size="lg"
                  className="mt-3"
                  onClick={() => onGetEstimate(selectedStoneId!)}
                >
                  Get a Free Estimate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setStep('draw')}>
                <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                Edit Outline
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Upload New Photo
              </Button>
            </div>

            <TrustBadges />
          </div>

          {/* Sidebar — stone picker + controls */}
          <div className="space-y-4">
            <div className="hidden lg:block">
              <VisualizerControls
                opacity={opacity}
                onOpacityChange={setOpacity}
                textureScale={textureScale}
                onTextureScaleChange={setTextureScale}
                rotation={rotation}
                onRotationChange={setRotation}
                showOriginal={showOriginal}
                onToggleOriginal={() => {
                  setShowOriginal(!showOriginal);
                  track('visualizer_before_after_used');
                }}
              />
            </div>
            <StonePicker
              selectedStoneId={selectedStoneId}
              onSelectStone={handleStoneSelect}
              favorites={favorites}
            />
          </div>
        </div>
      )}

      <ShareModal
        open={showShare}
        onOpenChange={setShowShare}
        title={selectedStone?.name || 'My Counter Visualization'}
        description="Check out how this stone looks in my kitchen!"
      />
    </div>
  );
}
