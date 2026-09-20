"use client";

import React from "react";
import { useDemoModal } from "@/components/providers/DemoModalProvider";
import { trackDemoCtaClick } from "@/lib/analytics";

interface OpenDemoButtonProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  ctaLocation?: string;
}

export function OpenDemoButton({
  children,
  className = "",
  ariaLabel = "Agendar demonstração prática",
  ctaLocation = "general_cta",
}: OpenDemoButtonProps) {
  const { openDemoModal } = useDemoModal();

  const handleClick = () => {
    trackDemoCtaClick({
      cta_location: ctaLocation,
      cta_text: typeof children === "string" ? children : ariaLabel,
    });
    openDemoModal();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
