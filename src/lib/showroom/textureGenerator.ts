/**
 * Procedural stone texture generator using Canvas API.
 * Generates realistic-looking tileable textures for each stone type
 * so the visualizer works without needing pre-made image files.
 *
 * In production, replace with actual slab photography.
 */

const textureCache = new Map<string, string>();

interface StoneColorProfile {
  base: string;
  secondary: string;
  accent: string;
  veinColor: string;
  speckleColors: string[];
  pattern: 'granite' | 'quartz' | 'marble' | 'quartzite';
}

const stoneProfiles: Record<string, StoneColorProfile> = {
  'white-ice-granite': {
    base: '#E8E5E0',
    secondary: '#D0CCC5',
    accent: '#B8B4AD',
    veinColor: '#9E9A93',
    speckleColors: ['#C0BCB5', '#A8A49D', '#8B8780', '#D5D1CA', '#6B6762'],
    pattern: 'granite',
  },
  'alaska-white-granite': {
    base: '#EBE7E1',
    secondary: '#D8D3CA',
    accent: '#C5BFB5',
    veinColor: '#A09A90',
    speckleColors: ['#D0CAC0', '#B5AFA5', '#9A948A', '#E0DAD0', '#807A70'],
    pattern: 'granite',
  },
  'steel-gray-granite': {
    base: '#4A4A4A',
    secondary: '#555555',
    accent: '#606060',
    veinColor: '#3A3A3A',
    speckleColors: ['#5A5A5A', '#656565', '#707070', '#454545', '#787878'],
    pattern: 'granite',
  },
  'calacatta-laza-quartz': {
    base: '#F5F2ED',
    secondary: '#EDE9E3',
    accent: '#E5E0D8',
    veinColor: '#B5A080',
    speckleColors: ['#C9B090', '#D4C4A8', '#A09070'],
    pattern: 'quartz',
  },
  'carrara-mist-quartz': {
    base: '#F0EDEA',
    secondary: '#E8E4E0',
    accent: '#DDD8D3',
    veinColor: '#A8A4A0',
    speckleColors: ['#C0BCB8', '#B0ACA8', '#989490'],
    pattern: 'quartz',
  },
  'midnight-black-quartz': {
    base: '#1A1A1A',
    secondary: '#222222',
    accent: '#2A2A2A',
    veinColor: '#333333',
    speckleColors: ['#2D2D2D', '#353535', '#404040', '#181818', '#454545'],
    pattern: 'quartz',
  },
  'calacatta-gold-marble': {
    base: '#F8F5F0',
    secondary: '#F0ECE5',
    accent: '#E8E3DA',
    veinColor: '#C9A050',
    speckleColors: ['#D4B060', '#B89040', '#A08030', '#8A7028'],
    pattern: 'marble',
  },
  'emperador-dark-marble': {
    base: '#4A3628',
    secondary: '#554030',
    accent: '#3D2C20',
    veinColor: '#C9A050',
    speckleColors: ['#B89040', '#A07830', '#6B5040', '#5A4030'],
    pattern: 'marble',
  },
  'taj-mahal-quartzite': {
    base: '#F2EDE5',
    secondary: '#E8E2D8',
    accent: '#DDD5C8',
    veinColor: '#C8A878',
    speckleColors: ['#D4B888', '#C09868', '#A88858'],
    pattern: 'quartzite',
  },
  'super-white-quartzite': {
    base: '#F0EDED',
    secondary: '#E5E2E2',
    accent: '#D8D5D5',
    veinColor: '#9A9898',
    speckleColors: ['#B0ADAD', '#C0BDBD', '#858282'],
    pattern: 'quartzite',
  },
  'blue-bahia-granite': {
    base: '#1A2840',
    secondary: '#253550',
    accent: '#1E3048',
    veinColor: '#3A5878',
    speckleColors: ['#2A4060', '#4A6888', '#1A2838', '#5A80A0', '#3A5070'],
    pattern: 'granite',
  },
  'colonial-gold-granite': {
    base: '#C8A868',
    secondary: '#B89858',
    accent: '#D0B878',
    veinColor: '#8A7040',
    speckleColors: ['#A08848', '#907838', '#706030', '#E0C888', '#504028'],
    pattern: 'granite',
  },
  'emerald-pearl-granite': {
    base: '#1A2818',
    secondary: '#253520',
    accent: '#1E3018',
    veinColor: '#3A5838',
    speckleColors: ['#2A4028', '#4A6848', '#1A2818', '#5A8058', '#3A5030'],
    pattern: 'granite',
  },
  'concrete-gray-quartz': {
    base: '#8A8A88',
    secondary: '#929290',
    accent: '#828280',
    veinColor: '#7A7A78',
    speckleColors: ['#959593', '#888886', '#9A9A98', '#808080'],
    pattern: 'quartz',
  },
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function drawGranite(ctx: CanvasRenderingContext2D, size: number, profile: StoneColorProfile, rng: () => number) {
  ctx.fillStyle = profile.base;
  ctx.fillRect(0, 0, size, size);

  // Large mineral patches
  for (let i = 0; i < 40; i++) {
    const x = rng() * size;
    const y = rng() * size;
    const r = 8 + rng() * 20;
    const color = profile.speckleColors[Math.floor(rng() * profile.speckleColors.length)];
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.4 + rng() * 0.4;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.6 + rng() * 0.8), rng() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fine speckles
  ctx.globalAlpha = 1;
  for (let i = 0; i < 3000; i++) {
    const x = rng() * size;
    const y = rng() * size;
    const r = 0.5 + rng() * 2.5;
    const color = profile.speckleColors[Math.floor(rng() * profile.speckleColors.length)];
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.3 + rng() * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Subtle grain lines
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = profile.accent;
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    let x = rng() * size;
    let y = rng() * size;
    ctx.moveTo(x, y);
    for (let j = 0; j < 8; j++) {
      x += (rng() - 0.5) * 40;
      y += (rng() - 0.5) * 40;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}

function drawMarble(ctx: CanvasRenderingContext2D, size: number, profile: StoneColorProfile, rng: () => number) {
  // Base gradient fill
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, profile.base);
  grad.addColorStop(0.5, profile.secondary);
  grad.addColorStop(1, profile.base);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Soft background wash
  for (let i = 0; i < 8; i++) {
    const x = rng() * size;
    const y = rng() * size;
    const r = 60 + rng() * 120;
    const g2 = ctx.createRadialGradient(x, y, 0, x, y, r);
    g2.addColorStop(0, profile.accent);
    g2.addColorStop(1, 'transparent');
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, size, size);
  }

  ctx.globalAlpha = 1;

  // Bold veins
  for (let v = 0; v < 3; v++) {
    ctx.beginPath();
    ctx.strokeStyle = profile.veinColor;
    ctx.lineWidth = 1.5 + rng() * 3;
    ctx.globalAlpha = 0.35 + rng() * 0.35;

    let x = rng() * size * 0.3;
    let y = rng() * size;
    const angle = (rng() - 0.5) * 0.8;
    ctx.moveTo(x, y);

    for (let s = 0; s < 30; s++) {
      x += 10 + rng() * 20;
      y += Math.sin(angle) * (15 + rng() * 15) + (rng() - 0.5) * 20;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Feathered secondary veins branching off
    for (let b = 0; b < 4; b++) {
      ctx.beginPath();
      ctx.lineWidth = 0.5 + rng() * 1.5;
      ctx.globalAlpha = 0.15 + rng() * 0.2;
      const bx = rng() * size;
      const by = rng() * size;
      ctx.moveTo(bx, by);
      for (let s = 0; s < 10; s++) {
        ctx.lineTo(bx + (rng() - 0.3) * s * 12, by + (rng() - 0.5) * s * 10);
      }
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;
}

function drawQuartz(ctx: CanvasRenderingContext2D, size: number, profile: StoneColorProfile, rng: () => number) {
  ctx.fillStyle = profile.base;
  ctx.fillRect(0, 0, size, size);

  // Very subtle texture variation
  for (let i = 0; i < 15; i++) {
    const x = rng() * size;
    const y = rng() * size;
    const r = 40 + rng() * 80;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, profile.secondary);
    g.addColorStop(1, 'transparent');
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }

  // Subtle veining (quartz has less prominent veins)
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = profile.veinColor;
  for (let v = 0; v < 2; v++) {
    ctx.beginPath();
    ctx.lineWidth = 1 + rng() * 2;
    let x = rng() * size * 0.2;
    let y = rng() * size;
    ctx.moveTo(x, y);
    for (let s = 0; s < 20; s++) {
      x += 12 + rng() * 18;
      y += (rng() - 0.5) * 25;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Fine particles
  for (let i = 0; i < 500; i++) {
    const x = rng() * size;
    const y = rng() * size;
    ctx.fillStyle = profile.speckleColors[Math.floor(rng() * profile.speckleColors.length)];
    ctx.globalAlpha = 0.1 + rng() * 0.15;
    ctx.beginPath();
    ctx.arc(x, y, 0.3 + rng() * 1, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

function drawQuartzite(ctx: CanvasRenderingContext2D, size: number, profile: StoneColorProfile, rng: () => number) {
  // Base
  const grad = ctx.createLinearGradient(0, 0, size * 0.7, size);
  grad.addColorStop(0, profile.base);
  grad.addColorStop(0.5, profile.secondary);
  grad.addColorStop(1, profile.accent);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Organic veining (more layered than marble)
  for (let v = 0; v < 5; v++) {
    ctx.beginPath();
    ctx.strokeStyle = profile.veinColor;
    ctx.lineWidth = 0.8 + rng() * 2.5;
    ctx.globalAlpha = 0.2 + rng() * 0.25;

    let x = rng() * size * 0.2;
    let y = rng() * size;
    ctx.moveTo(x, y);
    for (let s = 0; s < 25; s++) {
      x += 8 + rng() * 16;
      y += (rng() - 0.5) * 30;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Soft mineral washes
  for (let i = 0; i < 10; i++) {
    const x = rng() * size;
    const y = rng() * size;
    const r = 30 + rng() * 60;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const color = profile.speckleColors[Math.floor(rng() * profile.speckleColors.length)];
    g.addColorStop(0, color);
    g.addColorStop(1, 'transparent');
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }

  ctx.globalAlpha = 1;
}

export function generateStoneTexture(stoneId: string, size = 512): string {
  const cacheKey = `${stoneId}-${size}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey)!;

  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const profile = stoneProfiles[stoneId];
  if (!profile) {
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, size, size);
    const dataUrl = canvas.toDataURL('image/png');
    textureCache.set(cacheKey, dataUrl);
    return dataUrl;
  }

  const rng = mulberry32(hashCode(stoneId));

  switch (profile.pattern) {
    case 'granite':
      drawGranite(ctx, size, profile, rng);
      break;
    case 'marble':
      drawMarble(ctx, size, profile, rng);
      break;
    case 'quartz':
      drawQuartz(ctx, size, profile, rng);
      break;
    case 'quartzite':
      drawQuartzite(ctx, size, profile, rng);
      break;
  }

  const dataUrl = canvas.toDataURL('image/png');
  textureCache.set(cacheKey, dataUrl);
  return dataUrl;
}

export function generateStoneThumbnail(stoneId: string): string {
  return generateStoneTexture(stoneId, 256);
}

export function generateStoneSlabImage(stoneId: string): string {
  return generateStoneTexture(stoneId, 512);
}

export function getStoneBaseColor(stoneId: string): string {
  return stoneProfiles[stoneId]?.base || '#C0C0C0';
}
