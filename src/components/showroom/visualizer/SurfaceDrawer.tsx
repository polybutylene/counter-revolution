"use client";

import { useRef, useState, useCallback, useEffect } from 'react';
import { Undo2, Trash2, Plus, Check, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Point } from '@/data/showroom/types';

interface SurfaceDrawerProps {
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  polygons: Point[][];
  onPolygonsChange: (polygons: Point[][]) => void;
  onComplete: () => void;
}

export function SurfaceDrawer({
  imageSrc,
  imageWidth,
  imageHeight,
  polygons,
  onPolygonsChange,
  onComplete,
}: SurfaceDrawerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [activePolygonIdx, setActivePolygonIdx] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [hoverPoint, setHoverPoint] = useState<Point | null>(null);

  const getScale = useCallback(() => {
    if (!canvasSize.width || !imageWidth) return 1;
    return canvasSize.width / imageWidth;
  }, [canvasSize.width, imageWidth]);

  // Resize handler
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

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = getScale();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image
    const img = new window.Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvasSize.width, canvasSize.height);

      // Draw completed polygons
      polygons.forEach((poly, i) => {
        if (poly.length < 3) return;
        ctx.beginPath();
        ctx.moveTo(poly[0].x * scale, poly[0].y * scale);
        poly.slice(1).forEach(p => ctx.lineTo(p.x * scale, p.y * scale));
        ctx.closePath();
        ctx.fillStyle = 'rgba(201, 148, 46, 0.15)';
        ctx.fill();
        ctx.strokeStyle = '#C9942E';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw vertices
        poly.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x * scale, p.y * scale, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#C9942E';
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      });

      // Draw current polygon in progress
      if (currentPoints.length > 0) {
        ctx.beginPath();
        ctx.moveTo(currentPoints[0].x * scale, currentPoints[0].y * scale);
        currentPoints.slice(1).forEach(p => ctx.lineTo(p.x * scale, p.y * scale));

        if (hoverPoint) {
          ctx.lineTo(hoverPoint.x * scale, hoverPoint.y * scale);
        }

        if (currentPoints.length >= 3) {
          ctx.fillStyle = 'rgba(27, 58, 92, 0.1)';
          ctx.fill();
        }

        ctx.strokeStyle = '#1B3A5C';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw vertices
        currentPoints.forEach((p, i) => {
          ctx.beginPath();
          ctx.arc(p.x * scale, p.y * scale, i === 0 ? 7 : 5, 0, Math.PI * 2);
          ctx.fillStyle = i === 0 ? '#1B3A5C' : '#C9942E';
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        });

        // Draw close hint on first point
        if (currentPoints.length >= 3 && hoverPoint) {
          const dist = Math.hypot(
            (hoverPoint.x - currentPoints[0].x) * scale,
            (hoverPoint.y - currentPoints[0].y) * scale
          );
          if (dist < 15) {
            ctx.beginPath();
            ctx.arc(currentPoints[0].x * scale, currentPoints[0].y * scale, 12, 0, Math.PI * 2);
            ctx.strokeStyle = '#1B3A5C';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }
    };
    img.src = imageSrc;
  }, [imageSrc, canvasSize, polygons, currentPoints, hoverPoint, getScale]);

  const getCanvasPoint = useCallback((e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scale = getScale();

    let clientX: number, clientY: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) / scale,
      y: (clientY - rect.top) / scale,
    };
  }, [getScale]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    const point = getCanvasPoint(e);
    const scale = getScale();

    // Check if clicking near first point to close polygon
    if (currentPoints.length >= 3) {
      const dist = Math.hypot(
        (point.x - currentPoints[0].x) * scale,
        (point.y - currentPoints[0].y) * scale
      );
      if (dist < 15) {
        const newPolygons = [...polygons];
        newPolygons[activePolygonIdx] = [...currentPoints];
        onPolygonsChange(newPolygons);
        setCurrentPoints([]);
        return;
      }
    }

    setCurrentPoints(prev => [...prev, point]);
  }, [getCanvasPoint, currentPoints, polygons, activePolygonIdx, onPolygonsChange, getScale]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (currentPoints.length > 0) {
      setHoverPoint(getCanvasPoint(e));
    }
  }, [currentPoints, getCanvasPoint]);

  const handleUndo = () => {
    if (currentPoints.length > 0) {
      setCurrentPoints(prev => prev.slice(0, -1));
    }
  };

  const handleClearCurrent = () => {
    setCurrentPoints([]);
  };

  const handleNewSurface = () => {
    setActivePolygonIdx(polygons.length);
    setCurrentPoints([]);
  };

  const hasCompletedPolygons = polygons.some(p => p.length >= 3);

  return (
    <div className="space-y-3">
      {/* Instructions */}
      <div className="flex items-start gap-3 rounded-lg bg-navy/5 border border-navy/10 p-3">
        <MousePointer2 className="h-5 w-5 shrink-0 text-navy mt-0.5" />
        <div>
          <p className="text-sm font-medium text-navy">
            {currentPoints.length === 0 && !hasCompletedPolygons && 'Click the corners of your countertop to outline the surface'}
            {currentPoints.length > 0 && currentPoints.length < 3 && 'Keep clicking to outline the countertop shape'}
            {currentPoints.length >= 3 && 'Click the first point to close the shape, or keep adding points'}
            {currentPoints.length === 0 && hasCompletedPolygons && 'Surface outlined! Apply a stone or add another surface.'}
          </p>
          <p className="text-xs text-dark/50 mt-0.5">
            Tap/click each corner. Works with L-shaped and irregular counters too.
          </p>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl border border-warm-medium bg-warm-light"
      >
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onTouchStart={(e) => {
            e.preventDefault();
            handleCanvasClick(e as unknown as React.MouseEvent);
          }}
          className="w-full cursor-crosshair touch-none"
          aria-label="Draw countertop outline on your photo"
        />
      </div>

      {/* Drawing controls */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleUndo}
          disabled={currentPoints.length === 0}
        >
          <Undo2 className="mr-1 h-3.5 w-3.5" />
          Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearCurrent}
          disabled={currentPoints.length === 0}
        >
          <Trash2 className="mr-1 h-3.5 w-3.5" />
          Clear
        </Button>
        {hasCompletedPolygons && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewSurface}
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add Surface
          </Button>
        )}
        {hasCompletedPolygons && (
          <Button
            variant="gold"
            size="sm"
            onClick={onComplete}
            className="ml-auto"
          >
            <Check className="mr-1 h-3.5 w-3.5" />
            Apply Stone
          </Button>
        )}
      </div>
    </div>
  );
}
