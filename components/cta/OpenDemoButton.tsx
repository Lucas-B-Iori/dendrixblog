"use client";

import React from "react";
import { useDemoModal } from "@/components/providers/DemoModalProvider";

interface OpenDemoButtonProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function OpenDemoButton({
  children,
  className = "",
  ariaLabel = "Agendar demonstração prática",
}: OpenDemoButtonProps) {
  const { openDemoModal } = useDemoModal();

  return (
    <button
      type="button"
      onClick={openDemoModal}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
