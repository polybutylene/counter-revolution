export type MaterialType = 'granite' | 'quartz' | 'marble' | 'quartzite';
export type ColorFamily = 'white' | 'gray' | 'black' | 'brown' | 'blue' | 'green' | 'gold';
export type PriceTier = '$$' | '$$$' | '$$$$';
export type RoomType = 'kitchen' | 'bathroom' | 'outdoor';
export type FinishType = 'Polished' | 'Honed' | 'Leathered';
export type ThicknessOption = '2cm' | '3cm';
export type Difficulty = 'easy' | 'moderate' | 'hard';

export interface StoneSpecs {
  origin: string;
  thicknessOptions: ThicknessOption[];
  finishOptions: FinishType[];
  durability: number;
  maintenance: 'Low' | 'Medium' | 'High';
  heatResistance: number;
  stainResistance: number;
  scratchResistance: number;
}

export interface StoneImages {
  thumbnail: string;
  slab: string;
  closeup: string;
  texture: string;
}

export interface Stone {
  id: string;
  name: string;
  materialType: MaterialType;
  colorFamily: ColorFamily[];
  description: string;
  teamNote: string;
  specs: StoneSpecs;
  bestFor: RoomType[];
  priceTier: PriceTier;
  pricePerSqFtRange: [number, number];
  images: StoneImages;
  popularity: number;
  tags: string[];
}

export interface EdgeProfile {
  id: string;
  name: string;
  description: string;
  svgPath: string;
  addonPerLinearFt: number;
  popular?: boolean;
}

export interface StonePricing {
  stoneId: string;
  name: string;
  materialType: MaterialType;
  pricePerSqFtMin: number;
  pricePerSqFtMax: number;
}

export interface EstimateConfig {
  sinkCutoutPrice: number;
  cooktopCutoutPrice: number;
  backsplash4InchPerLF: number;
  backsplashFullPerSqFt: number;
  demolitionPerSqFt: number;
  fabricationPerSqFt: number;
}

export interface EstimateResult {
  materialCost: [number, number];
  fabricationCost: [number, number];
  edgeCost: number;
  sinkCutoutCost: number;
  cooktopCutoutCost: number;
  backsplashCost: number;
  demolitionCost: number;
  totalMin: number;
  totalMax: number;
}

export interface QuizAnswers {
  room?: string;
  vibe?: string;
  color?: string;
  budget?: string;
}

export type ShowroomTab = 'gallery' | 'visualizer' | 'estimate';

export interface Point {
  x: number;
  y: number;
}

export interface VisualizerState {
  image: string | null;
  imageWidth: number;
  imageHeight: number;
  polygons: Point[][];
  activePolygonIndex: number;
  selectedStoneId: string | null;
  textureOpacity: number;
  textureScale: number;
  textureRotation: number;
  isDrawing: boolean;
}

export interface ShowroomSession {
  favorites: string[];
  lastStoneId: string | null;
  lastTab: ShowroomTab;
  visualizerImage: string | null;
  estimateConfig: Partial<EstimateFormData> | null;
}

export interface EstimateFormData {
  stoneId: string;
  edgeProfileId: string;
  sizeMode: 'simple' | 'detailed';
  simpleSize: string;
  sections: { length: number; width: number }[];
  sinkType: string;
  sinkCount: number;
  cooktopCutout: boolean;
  backsplashType: string;
  backsplashLinearFt: number;
  includeDemolition: boolean;
}
