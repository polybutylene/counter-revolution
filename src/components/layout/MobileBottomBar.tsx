"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageSquare, Calculator } from "lucide-react";

export function MobileBottomBar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-warm-medium bg-white transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-3 divide-x divide-warm-medium">
        <a
          href="tel:+18500000000"
          className="flex flex-col items-center gap-1 py-3 text-navy transition-colors active:bg-warm-light"
          aria-label="Call us"
        >
          <Phone className="h-5 w-5" />
          <span className="text-xs font-medium">Call</span>
        </a>
        <a
          href="sms:+18500000000"
          className="flex flex-col items-center gap-1 py-3 text-navy transition-colors active:bg-warm-light"
          aria-label="Text us"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs font-medium">Text Us</span>
        </a>
        <Link
          href="/showroom"
          className="flex flex-col items-center gap-1 bg-gold py-3 text-navy transition-colors active:bg-gold-dark"
          aria-label="Visit showroom"
        >
          <Calculator className="h-5 w-5" />
          <span className="text-xs font-bold">Showroom</span>
        </Link>
      </div>
    </div>
  );
}
