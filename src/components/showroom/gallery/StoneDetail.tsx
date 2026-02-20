"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  Share2,
  Flame,
  Droplets,
  Shield,
  MapPin,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { EdgeProfilePicker } from './EdgeProfilePicker';
import { ShareModal } from '../shared/ShareModal';
import { StoneImage } from '../shared/StoneImage';
import type { Stone } from '@/data/showroom/types';

interface StoneDetailProps {
  stone: Stone | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onEstimate: (stoneId: string) => void;
}

const resistanceIcons = {
  heat: Flame,
  stain: Droplets,
  scratch: Shield,
};

function ResistanceBar({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Flame }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 shrink-0 text-navy/60" />
      <span className="text-sm text-dark/70 w-20 shrink-0">{label}</span>
      <div className="flex-1 flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className={cn(
              'h-2 flex-1 rounded-full',
              i <= value ? 'bg-navy' : 'bg-warm-medium'
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function StoneDetail({
  stone,
  open,
  onOpenChange,
  isFavorite,
  onToggleFavorite,
  onEstimate,
}: StoneDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedEdge, setSelectedEdge] = useState('standard-eased');
  const [showShare, setShowShare] = useState(false);

  if (!stone) return null;

  const images = [
    { src: stone.images.slab, label: 'Full Slab' },
    { src: stone.images.closeup, label: 'Close-up' },
    { src: stone.images.texture, label: 'Texture' },
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="grid md:grid-cols-2">
            {/* Image gallery */}
            <div className="relative bg-warm-light">
              <div className="relative aspect-square overflow-hidden">
                <StoneImage
                  stoneId={stone.id}
                  src={images[activeImage].src}
                  alt={`${stone.name} — ${images[activeImage].label}`}
                  className="h-full w-full object-cover"
                  size={512}
                  loading="eager"
                />
                {/* Navigation arrows */}
                <button
                  onClick={() => setActiveImage(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-dark backdrop-blur-sm hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveImage(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-dark backdrop-blur-sm hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 p-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors',
                      i === activeImage ? 'border-navy' : 'border-transparent'
                    )}
                    aria-label={`View ${img.label}`}
                  >
                    <StoneImage stoneId={stone.id} src={img.src} alt="" className="h-full w-full object-cover" size={128} />
                  </button>
                ))}
              </div>
            </div>

            {/* Details panel */}
            <div className="p-6 space-y-5">
              <DialogHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={stone.materialType === 'quartz' ? 'gold' : 'default'} className="text-xs">
                    {stone.materialType.charAt(0).toUpperCase() + stone.materialType.slice(1)}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {stone.priceTier}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl text-navy">{stone.name}</DialogTitle>
                <p className="text-sm text-dark/70">{stone.description}</p>
              </DialogHeader>

              {/* Price */}
              <div className="rounded-lg bg-warm-light p-3">
                <p className="text-lg font-bold text-gold-dark">
                  ${stone.pricePerSqFtRange[0]}–${stone.pricePerSqFtRange[1]}
                  <span className="text-sm font-normal text-dark/50"> /sq ft installed</span>
                </p>
              </div>

              {/* Specs */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-dark/50">Specifications</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-dark/60">Origin</div>
                  <div className="font-medium text-dark flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {stone.specs.origin}
                  </div>
                  <div className="text-dark/60">Thickness</div>
                  <div className="font-medium text-dark">{stone.specs.thicknessOptions.join(', ')}</div>
                  <div className="text-dark/60">Finishes</div>
                  <div className="font-medium text-dark">{stone.specs.finishOptions.join(', ')}</div>
                  <div className="text-dark/60">Maintenance</div>
                  <div className="font-medium text-dark">{stone.specs.maintenance}</div>
                  <div className="text-dark/60">Best For</div>
                  <div className="font-medium text-dark capitalize">{stone.bestFor.join(', ')}</div>
                </div>
              </div>

              {/* Resistance ratings */}
              <div className="space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-dark/50">Durability</p>
                <ResistanceBar label="Heat" value={stone.specs.heatResistance} icon={resistanceIcons.heat} />
                <ResistanceBar label="Stain" value={stone.specs.stainResistance} icon={resistanceIcons.stain} />
                <ResistanceBar label="Scratch" value={stone.specs.scratchResistance} icon={resistanceIcons.scratch} />
              </div>

              {/* Team note */}
              <div className="rounded-lg border border-gold/30 bg-gold/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-gold" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">Why We Recommend This</p>
                </div>
                <p className="text-sm text-dark/80 leading-relaxed">{stone.teamNote}</p>
              </div>

              {/* Edge profile picker */}
              <EdgeProfilePicker
                selectedId={selectedEdge}
                onChange={setSelectedEdge}
              />

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="gold" size="lg" onClick={() => onEstimate(stone.id)} className="w-full">
                  Get an Estimate
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onToggleFavorite}
                  >
                    <Heart className={cn('mr-2 h-4 w-4', isFavorite && 'fill-red-500 text-red-500')} />
                    {isFavorite ? 'Saved' : 'Save'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowShare(true)}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-dark backdrop-blur-sm hover:bg-white md:hidden"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogContent>
      </Dialog>

      <ShareModal
        open={showShare}
        onOpenChange={setShowShare}
        title={stone.name}
        description="Check out this stone I'm considering for our countertops!"
        shareText={`Check out ${stone.name} from Counter Revolution — ${stone.description}`}
      />
    </>
  );
}
