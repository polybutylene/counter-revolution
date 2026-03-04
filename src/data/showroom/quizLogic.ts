import { stones } from './stones';
import type { Stone, QuizAnswers } from './types';

export const quizSteps = [
  {
    id: 'room',
    question: 'What room are you working on?',
    options: [
      { value: 'kitchen', label: 'Kitchen', icon: '🍳' },
      { value: 'bathroom', label: 'Bathroom', icon: '🛁' },
      { value: 'outdoor', label: 'Outdoor Kitchen', icon: '☀️' },
      { value: 'other', label: 'Other', icon: '🏠' },
    ],
  },
  {
    id: 'vibe',
    question: 'What vibe are you going for?',
    options: [
      { value: 'modern', label: 'Modern & Clean', icon: '✨' },
      { value: 'classic', label: 'Warm & Classic', icon: '🏡' },
      { value: 'bold', label: 'Bold & Dramatic', icon: '🎭' },
      { value: 'natural', label: 'Natural & Organic', icon: '🌿' },
    ],
  },
  {
    id: 'color',
    question: 'What colors are you drawn to?',
    options: [
      { value: 'light', label: 'Light & Bright', icon: '🤍' },
      { value: 'dark', label: 'Dark & Rich', icon: '🖤' },
      { value: 'colorful', label: 'Something Unique', icon: '💎' },
      { value: 'neutral', label: 'Neutral & Warm', icon: '🧡' },
      { value: 'none', label: 'No Preference', icon: '🤷' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your budget range?',
    options: [
      { value: 'good', label: 'Good ($35–$60/sq ft)', icon: '💰' },
      { value: 'better', label: 'Better ($55–$80/sq ft)', icon: '💰💰' },
      { value: 'best', label: 'Best ($75–$130/sq ft)', icon: '💰💰💰' },
    ],
  },
] as const;

function scoreStone(stone: Stone, answers: QuizAnswers): number {
  let score = 0;

  if (answers.room) {
    if (answers.room === 'outdoor' && stone.bestFor.includes('outdoor')) score += 20;
    else if (answers.room === 'kitchen' && stone.bestFor.includes('kitchen')) score += 10;
    else if (answers.room === 'bathroom' && stone.bestFor.includes('bathroom')) score += 10;
    if (answers.room === 'outdoor' && !stone.bestFor.includes('outdoor')) score -= 30;
  }

  if (answers.vibe) {
    const vibeMap: Record<string, (s: Stone) => boolean> = {
      modern: (s) => s.tags.includes('modern') || s.tags.includes('minimal') || s.colorFamily.includes('gray') || s.colorFamily.includes('black'),
      classic: (s) => s.tags.includes('classic') || s.tags.includes('warm') || s.colorFamily.includes('brown') || s.colorFamily.includes('gold'),
      bold: (s) => s.tags.includes('bold') || s.tags.includes('exotic') || s.priceTier === '$$$$',
      natural: (s) => s.materialType === 'granite' || s.materialType === 'quartzite' || s.colorFamily.includes('green'),
    };
    if (vibeMap[answers.vibe]?.(stone)) score += 15;
  }

  if (answers.color && answers.color !== 'none') {
    const colorMap: Record<string, string[]> = {
      light: ['white'],
      dark: ['black', 'gray'],
      colorful: ['blue', 'green'],
      neutral: ['brown', 'gold'],
    };
    const targetColors = colorMap[answers.color] || [];
    if (stone.colorFamily.some(c => targetColors.includes(c))) score += 15;
  }

  if (answers.budget) {
    const budgetMap: Record<string, string[]> = {
      good: ['$$'],
      better: ['$$', '$$$'],
      best: ['$$$', '$$$$'],
    };
    if (budgetMap[answers.budget]?.includes(stone.priceTier)) score += 10;
    else score -= 5;
  }

  if (stone.tags.includes('popular')) score += 3;
  if (stone.tags.includes('staff-pick')) score += 2;

  return score;
}

export function getQuizRecommendations(answers: QuizAnswers): { stone: Stone; reason: string }[] {
  const scored = stones.map(stone => ({
    stone,
    score: scoreStone(stone, answers),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 5).map(({ stone }) => ({
    stone,
    reason: generateReason(stone, answers),
  }));
}

function generateReason(stone: Stone, answers: QuizAnswers): string {
  const parts: string[] = [];

  if (answers.room === 'outdoor' && stone.bestFor.includes('outdoor')) {
    parts.push('rated for outdoor use');
  }

  if (answers.vibe === 'modern' && (stone.tags.includes('modern') || stone.tags.includes('minimal'))) {
    parts.push('clean, modern aesthetic');
  } else if (answers.vibe === 'classic' && (stone.tags.includes('classic') || stone.tags.includes('warm'))) {
    parts.push('warm, timeless feel');
  } else if (answers.vibe === 'bold') {
    parts.push('makes a dramatic statement');
  }

  if (stone.specs.maintenance === 'Low') {
    parts.push('low maintenance');
  }

  if (stone.tags.includes('popular')) {
    parts.push('a Bay County favorite');
  }

  if (stone.tags.includes('staff-pick')) {
    parts.push('a Stratum Co. team pick');
  }

  if (parts.length === 0) {
    parts.push(`great ${stone.materialType} option in your price range`);
  }

  return parts.slice(0, 2).join(' · ');
}
