"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { StepProjectType } from "./StepProjectType";
import { StepDetails } from "./StepDetails";
import { StepMaterial } from "./StepMaterial";
import { StepEdgeProfile } from "./StepEdgeProfile";
import { StepContact } from "./StepContact";
import { StepResult } from "./StepResult";
import { calculateEstimate } from "@/lib/estimator/calculate";
import { trackEvent } from "@/components/shared/TrackEvent";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import type { EstimatorFormData, EstimateResult, ProjectType, MaterialPreference, EdgeProfile } from "@/types/estimator";

const TOTAL_STEPS = 6;

export function EstimatorWizard() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<EstimatorFormData>({
    projectType: "" as ProjectType,
    linearFootage: 0,
    sinkCutouts: 1,
    cooktopCutouts: 0,
    includeBacksplash: false,
    backsplashHeight: undefined,
    includeIsland: false,
    islandSize: undefined,
    materialPreference: "" as MaterialPreference,
    edgeProfile: "" as EdgeProfile,
    name: "",
    phone: "",
    email: "",
    preferredContact: "" as any,
    timeline: "" as any,
    notes: "",
  });

  const submitEstimate = useMutation(api.estimator.submitEstimate);

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const canGoNext = (): boolean => {
    switch (step) {
      case 1: return !!formData.projectType;
      case 2: return formData.linearFootage >= 1;
      case 3: return !!formData.materialPreference;
      case 4: return !!formData.edgeProfile;
      case 5: return !!formData.name && !!formData.phone && !!formData.email;
      default: return true;
    }
  };

  const validateStep5 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = "Name is required";
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Valid phone number is required";
    if (!formData.email || !formData.email.includes("@")) newErrors.email = "Valid email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (step === 5) {
      if (!validateStep5()) return;
      handleSubmit();
      return;
    }
    trackEvent("estimate_step_completed", { step });
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const estimate = calculateEstimate(formData);
      setResult(estimate);

      await submitEstimate({
        ...formData,
        estimateLow: estimate.low,
        estimateHigh: estimate.high,
        estimateBreakdown: estimate.breakdown,
      });

      trackEvent("estimate_submitted", {
        estimateValue: Math.round((estimate.low + estimate.high) / 2),
        material: formData.materialPreference,
        projectType: formData.projectType,
      });

      setStep(6);
    } catch (error) {
      console.error("Failed to submit estimate:", error);
      const estimate = calculateEstimate(formData);
      setResult(estimate);
      setStep(6);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {step < 6 && <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {step === 1 && (
            <StepProjectType
              value={formData.projectType}
              onChange={(v) => { updateField("projectType", v); setStep(2); trackEvent("estimate_step_completed", { step: 1 }); }}
            />
          )}
          {step === 2 && (
            <StepDetails
              linearFootage={formData.linearFootage}
              sinkCutouts={formData.sinkCutouts}
              cooktopCutouts={formData.cooktopCutouts}
              includeBacksplash={formData.includeBacksplash}
              backsplashHeight={formData.backsplashHeight}
              includeIsland={formData.includeIsland}
              islandSize={formData.islandSize}
              onChange={updateField}
            />
          )}
          {step === 3 && (
            <StepMaterial
              value={formData.materialPreference}
              onChange={(v) => { updateField("materialPreference", v); setStep(4); trackEvent("estimate_step_completed", { step: 3 }); }}
            />
          )}
          {step === 4 && (
            <StepEdgeProfile
              value={formData.edgeProfile}
              onChange={(v) => { updateField("edgeProfile", v); setStep(5); trackEvent("estimate_step_completed", { step: 4 }); }}
            />
          )}
          {step === 5 && (
            <StepContact
              name={formData.name}
              phone={formData.phone}
              email={formData.email}
              preferredContact={formData.preferredContact}
              timeline={formData.timeline}
              notes={formData.notes || ""}
              onChange={updateField}
              errors={errors}
            />
          )}
          {step === 6 && result && (
            <StepResult result={result} materialPreference={formData.materialPreference} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {step > 1 && step < 6 && (
        <div className="mt-8 flex items-center justify-between">
          <Button type="button" variant="ghost" onClick={goBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button
            type="button"
            variant="gold"
            size="lg"
            onClick={goNext}
            disabled={!canGoNext() || submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...
              </>
            ) : step === 5 ? (
              "Get My Estimate"
            ) : (
              <>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
