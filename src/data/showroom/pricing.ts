import { EstimateConfig } from './types';

export const estimateConfig: EstimateConfig = {
  sinkCutoutPrice: 250,
  cooktopCutoutPrice: 300,
  backsplash4InchPerLF: 25,
  backsplashFullPerSqFt: 45,
  demolitionPerSqFt: 8,
  fabricationPerSqFt: 10,
};

export const simpleSizeOptions = [
  { label: 'Small Kitchen (< 25 sq ft)', value: 'small', sqFt: 20, linearFt: 15 },
  { label: 'Medium Kitchen (25–40 sq ft)', value: 'medium', sqFt: 32, linearFt: 22 },
  { label: 'Large Kitchen (40–60 sq ft)', value: 'large', sqFt: 50, linearFt: 30 },
  { label: 'Extra Large Kitchen (60+ sq ft)', value: 'xl', sqFt: 70, linearFt: 38 },
  { label: 'Bathroom Vanity (Small)', value: 'bath-small', sqFt: 8, linearFt: 6 },
  { label: 'Bathroom Vanity (Double)', value: 'bath-double', sqFt: 15, linearFt: 10 },
] as const;

export const sinkTypes = [
  { label: 'None', value: 'none', multiplier: 0 },
  { label: 'Undermount', value: 'undermount', multiplier: 1 },
  { label: 'Drop-in', value: 'dropin', multiplier: 0.8 },
  { label: 'Farmhouse/Apron', value: 'farmhouse', multiplier: 1.2 },
] as const;

export const backsplashTypes = [
  { label: 'None', value: 'none' },
  { label: '4-inch Backsplash', value: '4inch' },
  { label: 'Full-height Backsplash', value: 'full' },
] as const;
