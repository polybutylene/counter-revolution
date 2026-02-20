"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Sparkles, Eye, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import { quizSteps, getQuizRecommendations } from '@/data/showroom/quizLogic';
import { useAnalytics } from '../hooks/useAnalytics';
import { StoneImage } from '../shared/StoneImage';
import type { QuizAnswers, Stone } from '@/data/showroom/types';

interface StoneQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewStone: (stoneId: string) => void;
  onEstimate: (stoneId: string) => void;
}

export function StoneQuiz({ open, onOpenChange, onViewStone, onEstimate }: StoneQuizProps) {
  const { track } = useAnalytics();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [results, setResults] = useState<{ stone: Stone; reason: string }[] | null>(null);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (step < quizSteps.length - 1) {
      setStep(step + 1);
    } else {
      const recs = getQuizRecommendations(newAnswers);
      setResults(recs);
      track('gallery_quiz_completed', { answers: newAnswers });
    }
  };

  const handleBack = () => {
    if (results) {
      setResults(null);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setResults(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(handleReset, 300);
  };

  const currentStep = quizSteps[step];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        {!results ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-navy">
                <Sparkles className="h-5 w-5 text-gold" />
                Help Me Choose
              </DialogTitle>
              <DialogDescription>
                Question {step + 1} of {quizSteps.length}
              </DialogDescription>
            </DialogHeader>

            {/* Progress bar */}
            <div className="flex gap-1">
              {quizSteps.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1.5 flex-1 rounded-full transition-colors',
                    i <= step ? 'bg-gold' : 'bg-warm-medium'
                  )}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-heading font-semibold text-dark mb-4">
                  {currentStep.question}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentStep.options.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentStep.id, option.value)}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:border-navy/30',
                        answers[currentStep.id as keyof QuizAnswers] === option.value
                          ? 'border-navy bg-navy/5'
                          : 'border-warm-medium'
                      )}
                    >
                      <span className="text-2xl">{option.icon}</span>
                      <span className="text-sm font-medium text-dark">{option.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {step > 0 && (
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
            )}
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-navy">
                <Sparkles className="h-5 w-5 text-gold" />
                Your Recommendations
              </DialogTitle>
              <DialogDescription>
                Based on your preferences, we think you&apos;ll love these
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {results.map(({ stone, reason }, i) => (
                <div
                  key={stone.id}
                  className="flex gap-3 rounded-xl border border-warm-medium bg-white p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-warm-light">
                    <StoneImage
                      stoneId={stone.id}
                      src={stone.images.thumbnail}
                      alt={stone.name}
                      className="h-full w-full object-cover"
                      size={160}
                    />
                    {i === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gold/20">
                        <Badge variant="gold" className="text-[10px]">Top Pick</Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-navy">{stone.name}</h4>
                    <p className="text-xs text-dark/60 mt-0.5">{reason}</p>
                    <p className="text-sm font-medium text-gold-dark mt-1">
                      ${stone.pricePerSqFtRange[0]}–${stone.pricePerSqFtRange[1]}/sq ft
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => { handleClose(); onViewStone(stone.id); }}
                        className="flex items-center gap-1 text-xs font-medium text-navy hover:text-navy-light"
                      >
                        <Eye className="h-3 w-3" /> Details
                      </button>
                      <button
                        onClick={() => { handleClose(); onEstimate(stone.id); }}
                        className="flex items-center gap-1 text-xs font-medium text-gold-dark hover:text-gold"
                      >
                        <Calculator className="h-3 w-3" /> Estimate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Start Over
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
