"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Shield, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StoneImage } from './shared/StoneImage';
import { stones } from '@/data/showroom/stones';

const featuredStones = stones.filter(s => s.tags.includes('popular')).slice(0, 4);

export function ShowroomWidget() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % featuredStones.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const activeStone = featuredStones[activeIndex];

  return (
    <section className="py-16 sm:py-20 bg-navy relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 text-sm font-medium text-gold mb-6">
              <Eye className="h-4 w-4" />
              No Showroom? No Problem.
            </div>

            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
              See Your New Countertops
              <span className="block text-gold">Before You Commit</span>
            </h2>

            <p className="mt-4 text-lg text-white/70 max-w-md mx-auto lg:mx-0">
              Browse our curated collection of premium stones, compare options,
              and get a free estimate — all online, no showroom visit needed.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button variant="gold" size="xl" asChild>
                <Link href="/showroom">
                  Try Our Virtual Showroom
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <strong className="text-white">4.8</strong> · 120+ Reviews
              </span>
              <span className="text-white/30">|</span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-gold" />
                Free Estimates, Always
              </span>
            </div>
          </div>

          {/* Right — stone carousel preview */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStone.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <StoneImage
                    stoneId={activeStone.id}
                    src={activeStone.images.slab}
                    alt={activeStone.name}
                    className="h-full w-full object-cover"
                    size={512}
                    loading="eager"
                  />
                  {/* Overlay with stone info */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6">
                    <p className="font-heading font-bold text-white text-lg">{activeStone.name}</p>
                    <p className="text-sm text-white/70">
                      {activeStone.materialType.charAt(0).toUpperCase() + activeStone.materialType.slice(1)} ·{' '}
                      ${activeStone.pricePerSqFtRange[0]}–${activeStone.pricePerSqFtRange[1]}/sq ft
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stone thumbnail indicators */}
            <div className="mt-4 flex justify-center gap-2">
              {featuredStones.map((stone, i) => (
                <button
                  key={stone.id}
                  onClick={() => setActiveIndex(i)}
                  className={`h-12 w-12 rounded-lg overflow-hidden border-2 transition-all ${
                    i === activeIndex
                      ? 'border-gold scale-110 shadow-lg'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View ${stone.name}`}
                >
                  <StoneImage
                    stoneId={stone.id}
                    src={stone.images.thumbnail}
                    alt=""
                    className="h-full w-full object-cover"
                    size={96}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
