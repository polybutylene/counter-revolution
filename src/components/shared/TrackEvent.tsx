"use client";

import { useEffect, ReactNode } from "react";

interface TrackEventProps {
  event: string;
  params?: Record<string, string | number | boolean>;
  triggerOn?: "mount" | "click";
  children?: ReactNode;
  className?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function trackEvent(event: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
}

export function TrackEvent({
  event,
  params,
  triggerOn = "mount",
  children,
  className,
}: TrackEventProps) {
  useEffect(() => {
    if (triggerOn === "mount") {
      trackEvent(event, params);
    }
  }, [event, params, triggerOn]);

  if (triggerOn === "click" && children) {
    return (
      <div onClick={() => trackEvent(event, params)} className={className}>
        {children}
      </div>
    );
  }

  return children ? <>{children}</> : null;
}

export { trackEvent };
