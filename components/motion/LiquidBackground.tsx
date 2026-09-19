"use client";

import React, { useEffect, useRef } from "react";

interface LiquidBackgroundProps {
  className?: string;
  variant?: "hero" | "closing" | "subtle";
}

/**
 * LiquidBackground (Inspirado em Skiper 12 / Vercel Liquid Simulation)
 * Cria uma atmosfera de luxo fluida em Canvas 2D/WebGL com ondas harmônicas
 * multidirecionais e reação física sutil ao cursor/touch.
 * Elimina o fundo pálido sem poluição visual e com 60fps constantes.
 */
export function LiquidBackground({
  className = "",
  variant = "hero",
}: LiquidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse tracking suavizado
    const mouse = {
      x: width * 0.5,
      y: height * 0.3,
      targetX: width * 0.5,
      targetY: height * 0.3,
      speed: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleResize();

    // Intersection observer para pausar quando fora do viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let t = 0;

    // Configuração de paleta refinada para Dark Prestige Forense
    // Tons: Obsidiana (#04070B), Chumbo Azulado (#09131C), Toque Esmeralda (#064E3B) e Ciano (#0369A1)
    const blobs = [
      { x: 0.3, y: 0.3, r: 0.45, color: "rgba(11, 26, 42, 0.75)", speed: 0.0006 },
      { x: 0.7, y: 0.4, r: 0.5, color: "rgba(6, 38, 30, 0.45)", speed: 0.0008 },
      { x: 0.5, y: 0.7, r: 0.55, color: "rgba(15, 35, 55, 0.6)", speed: 0.0005 },
      { x: 0.8, y: 0.8, r: 0.4, color: "rgba(8, 20, 32, 0.7)", speed: 0.0007 },
    ];

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      t += 1;
      // Lerp mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Fundo escuro base de veludo
      ctx.fillStyle = "#05080C";
      ctx.fillRect(0, 0, width, height);

      // Renderização das lentes líquidas sobrepostas
      blobs.forEach((blob, i) => {
        const angle = t * blob.speed + (i * Math.PI) / 2;
        const currentX = width * blob.x + Math.cos(angle) * (width * 0.12) + (mouse.x - width * 0.5) * 0.06;
        const currentY = height * blob.y + Math.sin(angle * 1.2) * (height * 0.1) + (mouse.y - height * 0.5) * 0.06;
        const radius = Math.max(width, height) * blob.r;

        const gradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          radius
        );

        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(0.5, blob.color.replace(/[\d\.]+\)$/, "0.2)"));
        gradient.addColorStop(1, "rgba(5, 8, 12, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ponto de luz focal interativo seguindo o mouse
      const mouseGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        Math.min(width, height) * 0.35
      );
      mouseGlow.addColorStop(0, "rgba(16, 185, 129, 0.12)"); // Esmeralda nobre
      mouseGlow.addColorStop(0.4, "rgba(2, 132, 199, 0.08)"); // Ciano forense
      mouseGlow.addColorStop(1, "rgba(5, 8, 12, 0)");
      ctx.fillStyle = mouseGlow;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, Math.min(width, height) * 0.35, 0, Math.PI * 2);
      ctx.fill();

      // Linhas finas de grade técnica sutil (Technical Grid)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [variant]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: "100%", height: "100%" }}
      />
      {/* Máscara de vinheta superior e inferior para transição suave com seções vizinhas */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05080C]/80 pointer-events-none" />
    </div>
  );
}
