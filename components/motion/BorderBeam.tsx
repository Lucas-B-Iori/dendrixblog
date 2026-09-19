"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = "#0F2B48",
  colorTo = "#10B981",
}: BorderBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    const ro = new ResizeObserver(updateDimensions);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const perimeter = (dimensions.width + dimensions.height) * 2;
  const beamLength = Math.min(size, perimeter * 0.35);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <svg
          className="absolute inset-0 w-full h-full"
          width={dimensions.width}
          height={dimensions.height}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colorFrom} stopOpacity="0" />
              <stop offset="50%" stopColor={colorTo} stopOpacity="1" />
              <stop offset="100%" stopColor={colorFrom} stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={Math.max(0, dimensions.width - borderWidth)}
            height={Math.max(0, dimensions.height - borderWidth)}
            rx="16"
            ry="16"
            fill="none"
            stroke="url(#beam-gradient)"
            strokeWidth={borderWidth}
            strokeDasharray={`${beamLength} ${perimeter - beamLength}`}
            style={{
              animation: `border-beam-travel ${duration}s linear infinite`,
            }}
          />
        </svg>
      )}

      <style jsx>{`
        @keyframes border-beam-travel {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -${perimeter}px;
          }
        }
      `}</style>
    </div>
  );
}
