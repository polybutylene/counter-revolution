"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Materials", href: "/materials" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-warm-medium bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold text-navy">
            Counter<span className="text-gold"> Revolution</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-dark transition-colors hover:bg-warm-light hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Trust Badge + CTA (Desktop) */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-1.5 text-sm">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="font-semibold text-dark">4.8</span>
            <span className="text-muted-foreground">· 120+ Reviews</span>
          </div>
          <Button variant="gold" size="default" asChild>
            <Link href="/showroom">Get Free Estimate</Link>
          </Button>
        </div>

        {/* Mobile: Trust + Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex items-center gap-1 text-xs">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="font-semibold">4.8</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-dark hover:bg-warm-light"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-warm-medium bg-white lg:hidden"
          >
            <nav className="flex flex-col px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-dark transition-colors hover:bg-warm-light"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-warm-medium pt-4">
                <Button variant="gold" size="lg" asChild>
                  <Link href="/showroom" onClick={() => setMobileMenuOpen(false)}>
                    Get Free Estimate
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="tel:+18500000000">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Us
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
