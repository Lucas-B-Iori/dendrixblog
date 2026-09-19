"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-slate-200/40 dark:bg-white/[0.04]">
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 origin-left shadow-[0_0_12px_rgba(16,185,129,0.5)]"
        style={{ scaleX }}
      />
    </div>
  );
}
