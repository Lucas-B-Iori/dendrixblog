"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ContainerScroll3DProps {
  children: React.ReactNode;
  className?: string;
}

export function ContainerScroll3D({
  children,
  className = "",
}: ContainerScroll3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // On desktop: subtle 3D rotation that flattens out smoothly
  const rotateX = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], isMobile ? [1, 1] : [0.98, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.5], [0, -10]);

  return (
    <div
      ref={containerRef}
      className={`relative [perspective:1200px] ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          scale,
          translateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full transition-shadow duration-300"
      >
        {children}
      </motion.div>
    </div>
  );
}
