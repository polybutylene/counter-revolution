import { EdgeProfile } from './types';

export const edgeProfiles: EdgeProfile[] = [
  {
    id: 'standard-eased',
    name: 'Standard Eased',
    description: 'A clean, simple edge with slightly rounded corners. Included with every installation.',
    svgPath: 'M 0 0 L 0 30 L 40 30 L 40 3 Q 40 0 37 0 Z',
    addonPerLinearFt: 0,
    popular: true,
  },
  {
    id: 'beveled',
    name: 'Beveled',
    description: 'A 45-degree angled cut along the top edge. Adds a modern architectural detail.',
    svgPath: 'M 0 0 L 0 30 L 40 30 L 40 8 L 32 0 Z',
    addonPerLinearFt: 8,
  },
  {
    id: 'bullnose',
    name: 'Full Bullnose',
    description: 'Fully rounded edge from top to bottom. Soft, classic, and family-friendly.',
    svgPath: 'M 0 0 L 0 30 L 40 30 L 40 15 Q 40 0 25 0 Z',
    addonPerLinearFt: 12,
    popular: true,
  },
  {
    id: 'half-bullnose',
    name: 'Half Bullnose',
    description: 'Rounded on the top edge with a flat bottom. A versatile, elegant choice.',
    svgPath: 'M 0 0 L 0 30 L 40 30 L 40 6 Q 40 0 34 0 Z',
    addonPerLinearFt: 10,
    popular: true,
  },
  {
    id: 'ogee',
    name: 'Ogee',
    description: 'An S-curve profile with a classic, ornate appearance. Perfect for traditional kitchens.',
    svgPath: 'M 0 0 L 0 30 L 40 30 L 40 14 Q 40 8 37 5 Q 34 2 34 0 Z',
    addonPerLinearFt: 15,
  },
  {
    id: 'waterfall',
    name: 'Waterfall',
    description: 'The countertop continues down the sides of the island to the floor. Ultra-modern and dramatic.',
    svgPath: 'M 0 0 L 0 30 L 5 30 L 5 5 Q 5 0 10 0 L 40 0 L 40 30 L 40 30 Z',
    addonPerLinearFt: 25,
  },
];

export function getEdgeProfileById(id: string): EdgeProfile | undefined {
  return edgeProfiles.find(e => e.id === id);
}
