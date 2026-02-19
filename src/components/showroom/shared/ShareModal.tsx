"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Check, Mail, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  shareUrl?: string;
  shareText?: string;
}

export function ShareModal({
  open,
  onOpenChange,
  title,
  description,
  shareUrl,
  shareText,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const url = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const text = shareText || title;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${text}\n\n${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleSMS = () => {
    const body = encodeURIComponent(`${text} ${url}`);
    window.open(`sms:?body=${body}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share {title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="space-y-3 pt-2">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={handleEmail}
          >
            <Mail className="h-5 w-5 text-navy" />
            Share via Email
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={handleSMS}
          >
            <MessageSquare className="h-5 w-5 text-navy" />
            Share via Text Message
          </Button>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={url}
              className="flex-1 rounded-lg border border-warm-medium bg-warm-light px-3 py-2.5 text-sm text-dark truncate"
              aria-label="Share link"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              className={cn('shrink-0', copied && 'text-success border-success')}
              aria-label="Copy link"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
