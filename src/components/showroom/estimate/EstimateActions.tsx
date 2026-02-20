"use client";

import { useState } from 'react';
import { Calendar, Download, Share2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShareModal } from '../shared/ShareModal';
import { ContactDrawer } from '../shared/ContactDrawer';
import { useAnalytics } from '../hooks/useAnalytics';
import { formatCurrency } from '@/lib/utils';
import type { EstimateResult } from '@/data/showroom/types';

interface EstimateActionsProps {
  result: EstimateResult;
  stoneName: string;
  edgeProfileName: string;
}

export function EstimateActions({
  result,
  stoneName,
  edgeProfileName,
}: EstimateActionsProps) {
  const { track } = useAnalytics();
  const [showShare, setShowShare] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const estimateRange = `${formatCurrency(result.totalMin)} – ${formatCurrency(result.totalMax)}`;

  const handleSavePDF = () => {
    track('estimate_saved');
    // In production, generate a PDF. For now, print the page.
    window.print();
  };

  return (
    <>
      <div className="space-y-3">
        <Button
          variant="gold"
          size="xl"
          className="w-full"
          onClick={() => {
            setShowContact(true);
            track('contact_form_opened', { source: 'estimate' });
          }}
        >
          <Calendar className="mr-2 h-5 w-5" />
          Schedule Your Free In-Home Estimate
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={handleSavePDF}>
            <Download className="mr-2 h-4 w-4" />
            Save Estimate
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowShare(true);
              track('estimate_shared');
            }}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share with Partner
          </Button>
        </div>
      </div>

      <ShareModal
        open={showShare}
        onOpenChange={setShowShare}
        title="My Countertop Estimate"
        description="Check out this countertop estimate from Counter Revolution"
        shareText={`I'm looking at ${stoneName} countertops from Counter Revolution. Estimated cost: ${estimateRange}. What do you think?`}
      />

      <ContactDrawer
        open={showContact}
        onOpenChange={setShowContact}
        context={{
          stoneName,
          estimateRange,
          edgeProfile: edgeProfileName,
        }}
      />
    </>
  );
}
