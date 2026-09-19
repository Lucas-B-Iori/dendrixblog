"use client";

import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

interface RollingCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
  formatter?: (val: number) => string;
}

/**
 * RollingCounter (Inspirado em Skiper 37 / Animated Number)
 * Odômetro digital com desaceleração exponencial quando entra no viewport.
 * Suporta formatação brasileira (10.412) e sufixos/prefixos forenses.
 */
export function RollingCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
  className = "",
  decimals = 0,
  formatter,
}: RollingCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    }
  }, [isInView, motionVal, value]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      if (!ref.current) return;
      let displayValue: string;
      if (formatter) {
        displayValue = formatter(latest);
      } else if (decimals > 0) {
        displayValue = latest.toFixed(decimals).replace(".", ",");
      } else {
        displayValue = Math.floor(latest).toLocaleString("pt-BR");
      }
      ref.current.textContent = `${prefix}${displayValue}${suffix}`;
    });

    return () => unsubscribe();
  }, [springVal, prefix, suffix, decimals, formatter]);

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums font-semibold tracking-tight ${className}`}
    >
      {prefix}0{suffix}
    </span>
  );
}
