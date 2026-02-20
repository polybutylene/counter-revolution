/**
 * Procedural stone texture generator using Canvas API with Perlin noise.
 * Generates realistic tileable textures as a fallback when real slab photos
 * are unavailable (offline, slow connections, newly added stones).
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

// --- Seeded PRNG ---
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

function lerpColor(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

// --- Perlin Noise ---
const PERM = new Uint8Array(512);
function initPerlin(rng: () => number) {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
}

function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(a: number, b: number, t: number) { return a + t * (b - a); }

function grad(hash: number, x: number, y: number): number {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function perlin2d(x: number, y: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = fade(xf);
  const v = fade(yf);

  const aa = PERM[PERM[X] + Y];
  const ab = PERM[PERM[X] + Y + 1];
  const ba = PERM[PERM[X + 1] + Y];
  const bb = PERM[PERM[X + 1] + Y + 1];

  return lerp(
    lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
    lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
    v,
  );
}

function fbm(x: number, y: number, octaves: number, lacunarity = 2.0, gain = 0.5): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxVal = 0;
  for (let i = 0; i < octaves; i++) {
    value += amplitude * perlin2d(x * frequency, y * frequency);
    maxVal += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }
  return value / maxVal;
}

// --- Drawing helpers ---

function fillNoiseBase(
  imgData: ImageData,
  size: number,
  baseRgb: [number, number, number],
  secRgb: [number, number, number],
  scale: number,
  octaves: number,
) {
  const d = imgData.data;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = (fbm(x / scale, y / scale, octaves) + 1) * 0.5;
      const c = lerpColor(baseRgb, secRgb, n);
      const i = (y * size + x) * 4;
      d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255;
    }
  }
}

// --- Stone pattern renderers ---

function drawGranite(ctx: CanvasRenderingContext2D, size: number, profile: StoneColorProfile, rng: () => number) {
  const imgData = ctx.getImageData(0, 0, size, size);
  const baseRgb = hexToRgb(profile.base);
  const secRgb = hexToRgb(profile.secondary);

  fillNoiseBase(imgData, size, baseRgb, secRgb, size / 4, 6);
  ctx.putImageData(imgData, 0, 0);

  // Multi-pass mineral grain: irregular polygon flakes instead of circles
  const grainCount = Math.floor(size * size / 80);
  for (let pass = 0; pass < 3; pass++) {
    const alpha = 0.25 + pass * 0.12;
    for (let i = 0; i < grainCount / 3; i++) {
      const cx = rng() * size;
      const cy = rng() * size;
      const r = 0.8 + rng() * (2.5 + pass);
      const sides = 3 + Math.floor(rng() * 4);
      const color = profile.speckleColors[Math.floor(rng() * profile.speckleColors.length)];
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha * (0.5 + rng() * 0.5);
      ctx.beginPath();
      for (let s = 0; s < sides; s++) {
        const angle = (s / sides) * Math.PI * 2 + rng() * 0.5;
        const rr = r * (0.5 + rng() * 0.7);
        ctx.lineTo(cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr);
      }
      ctx.closePath();
      ctx.fill();
    }
  }

  // Larger mineral patches with noise-driven opacity
  for (let i = 0; i < 60; i++) {
    const cx = rng() * size;
    const cy = rng() * size;
    const rx = 6 + rng() * 18;
    const ry = rx * (0.4 + rng() * 0.6);
    const angle = rng() * Math.PI;
    const color = profile.speckleColors[Math.floor(rng() * profile.speckleColors.length)];
    const noiseVal = (fbm(cx / 100, cy / 100, 3) + 1) * 0.5;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.15 + noiseVal * 0.3;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, angle, 0, Math.PI * 2);
    ctx.fill();
  }

  // Subtle crystalline highlight specks
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 200; i++) {
    const x = rng() * size;
    const y = rng() * size;
    const r = 0.5 + rng() * 1.5;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

function drawVeinBranch(
  ctx: CanvasRenderingContext2D,
  x0: number, y0: number,
  dx: number, dy: number,
  width: number, steps: number,
  depth: number, maxDepth: number,
  rng: () => number,
  color: string,
  alpha: number,
) {
  if (depth > maxDepth || steps < 3) return;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.globalAlpha = alpha;
  ctx.lineCap = 'round';

  let x = x0, y = y0;
  ctx.moveTo(x, y);
  for (let s = 0; s < steps; s++) {
    x += dx + (rng() - 0.5) * 20;
    y += dy + (rng() - 0.5) * 20;
    ctx.lineTo(x, y);

    if (rng() < 0.2 && depth < maxDepth) {
      drawVeinBranch(
        ctx, x, y,
        dx * 0.6 + (rng() - 0.5) * 8,
        dy * 0.6 + (rng() - 0.5) * 8,
        width * 0.5,
        Math.floor(steps * 0.4),
        depth + 1, maxDepth,
        rng, color, alpha * 0.6,
      );
    }
  }
  ctx.stroke();
}

function drawMarble(ctx: CanvasRenderingContext2D, size: number, profile: StoneColorProfile, rng: () => number) {
  const imgData = ctx.getImageData(0, 0, size, size);
  const baseRgb = hexToRgb(profile.base);
  const secRgb = hexToRgb(profile.secondary);

  fillNoiseBase(imgData, size, baseRgb, secRgb, size / 3, 5);
  ctx.putImageData(imgData, 0, 0);

  // Soft color wash clouds
  for (let i = 0; i < 12; i++) {
    const x = rng() * size;
    const y = rng() * size;
    const r = 80 + rng() * 180;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, profile.accent);
    g.addColorStop(1, 'transparent');
    ctx.globalAlpha = 0.08 + rng() * 0.1;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }

  // Branching veins with recursive subdivision
  for (let v = 0; v < 3; v++) {
    const startX = rng() * size * 0.2;
    const startY = rng() * size;
    const mainAngle = (rng() - 0.5) * 0.4;
    drawVeinBranch(
      ctx, startX, startY,
      12 + rng() * 10, Math.sin(mainAngle) * 12,
      2 + rng() * 3, 25 + Math.floor(rng() * 15),
      0, 3, rng, profile.veinColor, 0.3 + rng() * 0.3,
    );
  }

  // Surface reflection highlight
  addReflectionHighlight(ctx, size, rng);
  ctx.globalAlpha = 1;
}

function drawQuartz(ctx: CanvasRenderingContext2D, size: number, profile: StoneColorProfile, rng: () => number) {
  const imgData = ctx.getImageData(0, 0, size, size);
  const baseRgb = hexToRgb(profile.base);
  const secRgb = hexToRgb(profile.secondary);

  fillNoiseBase(imgData, size, baseRgb, secRgb, size / 2.5, 4);
  ctx.putImageData(imgData, 0, 0);

  // Engineered quartz has subtle, wispy veins
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = profile.veinColor;
  for (let v = 0; v < 2; v++) {
    ctx.beginPath();
    ctx.lineWidth = 1 + rng() * 2.5;
    let x = rng() * size * 0.15;
    let y = rng() * size;
    ctx.moveTo(x, y);
    for (let s = 0; s < 30; s++) {
      const nx = x / 120;
      const ny = y / 120;
      const drift = fbm(nx, ny, 3) * 25;
      x += 10 + rng() * 14;
      y += drift + (rng() - 0.5) * 15;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Fine particle speckles
  for (let i = 0; i < Math.floor(size * size / 400); i++) {
    const x = rng() * size;
    const y = rng() * size;
    ctx.fillStyle = profile.speckleColors[Math.floor(rng() * profile.speckleColors.length)];
    ctx.globalAlpha = 0.08 + rng() * 0.12;
    ctx.beginPath();
    ctx.arc(x, y, 0.3 + rng() * 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  addReflectionHighlight(ctx, size, rng);
  ctx.globalAlpha = 1;
}

function drawQuartzite(ctx: CanvasRenderingContext2D, size: number, profile: StoneColorProfile, rng: () => number) {
  const imgData = ctx.getImageData(0, 0, size, size);
  const baseRgb = hexToRgb(profile.base);
  const accRgb = hexToRgb(profile.accent);

  // Quartzite has more layered, directional noise
  const d = imgData.data;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n1 = (fbm(x / (size / 3), y / (size / 5), 5, 2.2, 0.45) + 1) * 0.5;
      const n2 = (fbm(x / (size / 6) + 100, y / (size / 8) + 100, 3) + 1) * 0.5;
      const blend = n1 * 0.7 + n2 * 0.3;
      const c = lerpColor(baseRgb, accRgb, blend);
      const i = (y * size + x) * 4;
      d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Layered branching veins
  for (let v = 0; v < 5; v++) {
    const startX = rng() * size * 0.15;
    const startY = rng() * size;
    drawVeinBranch(
      ctx, startX, startY,
      9 + rng() * 10, (rng() - 0.5) * 18,
      0.8 + rng() * 2, 20 + Math.floor(rng() * 12),
      0, 2, rng, profile.veinColor, 0.18 + rng() * 0.2,
    );
  }

  // Soft mineral wash patches
  for (let i = 0; i < 10; i++) {
    const x = rng() * size;
    const y = rng() * size;
    const r = 30 + rng() * 80;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const color = profile.speckleColors[Math.floor(rng() * profile.speckleColors.length)];
    g.addColorStop(0, color);
    g.addColorStop(1, 'transparent');
    ctx.globalAlpha = 0.08 + rng() * 0.08;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }

  addReflectionHighlight(ctx, size, rng);
  ctx.globalAlpha = 1;
}

function addReflectionHighlight(ctx: CanvasRenderingContext2D, size: number, rng: () => number) {
  const cx = size * (0.3 + rng() * 0.4);
  const cy = size * (0.2 + rng() * 0.3);
  const r = size * (0.4 + rng() * 0.3);
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, 'rgba(255,255,255,0.06)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.02)');
  g.addColorStop(1, 'transparent');
  ctx.globalAlpha = 1;
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
}

// --- Public API ---

export function generateStoneTexture(stoneId: string, size = 1024): string {
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
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    textureCache.set(cacheKey, dataUrl);
    return dataUrl;
  }

  const seed = hashCode(stoneId);
  const rng = mulberry32(seed);
  initPerlin(rng);

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

  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  textureCache.set(cacheKey, dataUrl);
  return dataUrl;
}

export function generateStoneThumbnail(stoneId: string): string {
  return generateStoneTexture(stoneId, 512);
}

export function generateStoneSlabImage(stoneId: string): string {
  return generateStoneTexture(stoneId, 1024);
}

export function getStoneBaseColor(stoneId: string): string {
  return stoneProfiles[stoneId]?.base || '#C0C0C0';
}
