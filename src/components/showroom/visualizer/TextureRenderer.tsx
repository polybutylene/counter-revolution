"use client";

import { useRef, useEffect, useCallback, useState } from 'react';
import type { Point } from '@/data/showroom/types';

interface TextureRendererProps {
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  polygons: Point[][];
  textureSrc: string | null;
  opacity: number;
  textureScale: number;
  rotation: number;
  showOriginal: boolean;
}

export function TextureRenderer({
  imageSrc,
  imageWidth,
  imageHeight,
  polygons,
  textureSrc,
  opacity,
  textureScale,
  rotation,
  showOriginal,
}: TextureRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const textureImgRef = useRef<HTMLImageElement | null>(null);
  const baseImgRef = useRef<HTMLImageElement | null>(null);

  // Preload texture
  useEffect(() => {
    if (!textureSrc) {
      textureImgRef.current = null;
      return;
    }
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { textureImgRef.current = img; render(); };
    img.src = textureSrc;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textureSrc]);

  // Preload base image
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => { baseImgRef.current = img; render(); };
    img.src = imageSrc;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc]);

  // Resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const aspect = imageHeight / imageWidth;
        setCanvasSize({ width: w, height: w * aspect });
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [imageWidth, imageHeight]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const baseImg = baseImgRef.current;
    if (!canvas || !baseImg) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvasSize;
    if (width === 0) return;

    const scale = width / imageWidth;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(baseImg, 0, 0, width, height);

    if (showOriginal || !textureImgRef.current || polygons.length === 0) return;

    const textureImg = textureImgRef.current;

    polygons.forEach(poly => {
      if (poly.length < 3) return;

      ctx.save();

      // Create clipping path from polygon
      ctx.beginPath();
      ctx.moveTo(poly[0].x * scale, poly[0].y * scale);
      poly.slice(1).forEach(p => ctx.lineTo(p.x * scale, p.y * scale));
      ctx.closePath();
      ctx.clip();

      // Calculate bounding box
      const xs = poly.map(p => p.x * scale);
      const ys = poly.map(p => p.y * scale);
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const maxX = Math.max(...xs);
      const maxY = Math.max(...ys);
      const bboxW = maxX - minX;
      const bboxH = maxY - minY;
      const centerX = minX + bboxW / 2;
      const centerY = minY + bboxH / 2;

      // Tile the texture within the bounding box
      const tileSize = textureImg.width * textureScale * scale * 0.5;

      if (tileSize > 0) {
        ctx.globalAlpha = opacity;
        ctx.globalCompositeOperation = 'multiply';

        ctx.translate(centerX, centerY);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);

        const startX = minX - tileSize;
        const startY = minY - tileSize;
        const endX = maxX + tileSize;
        const endY = maxY + tileSize;

        for (let x = startX; x < endX; x += tileSize) {
          for (let y = startY; y < endY; y += tileSize) {
            ctx.drawImage(textureImg, x, y, tileSize, tileSize);
          }
        }

        // Soft-light pass for lighting integration
        ctx.globalAlpha = opacity * 0.3;
        ctx.globalCompositeOperation = 'soft-light';

        for (let x = startX; x < endX; x += tileSize) {
          for (let y = startY; y < endY; y += tileSize) {
            ctx.drawImage(textureImg, x, y, tileSize, tileSize);
          }
        }
      }

      ctx.restore();
    });

    // Redraw polygon outlines
    polygons.forEach(poly => {
      if (poly.length < 3) return;
      ctx.beginPath();
      ctx.moveTo(poly[0].x * scale, poly[0].y * scale);
      poly.slice(1).forEach(p => ctx.lineTo(p.x * scale, p.y * scale));
      ctx.closePath();
      ctx.strokeStyle = 'rgba(201, 148, 46, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }, [canvasSize, imageWidth, polygons, opacity, textureScale, rotation, showOriginal]);

  useEffect(() => {
    render();
  }, [render]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-xl border border-warm-medium">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full"
        aria-label="Visualized countertop with stone texture applied"
      />
    </div>
  );
}
