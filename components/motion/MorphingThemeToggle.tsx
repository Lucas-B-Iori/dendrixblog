"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

interface MorphingThemeToggleProps {
  isDark?: boolean;
  onToggle?: (isDark: boolean) => void;
  className?: string;
  size?: "sm" | "md";
}

/**
 * MorphingThemeToggle (Inspirado em Skiper 26)
 * Botão de alternância com morfismo cinético entre Sol e Lua.
 * Utiliza transições de escala, rotação e spring physics estilo iOS/macOS.
 */
export function MorphingThemeToggle({
  isDark: controlledDark,
  onToggle,
  className = "",
  size = "md",
}: MorphingThemeToggleProps) {
  const [internalDark, setInternalDark] = useState(true);
  const isDark = controlledDark !== undefined ? controlledDark : internalDark;

  const handleToggle = () => {
    const nextState = !isDark;
    if (controlledDark === undefined) {
      setInternalDark(nextState);
    }
    onToggle?.(nextState);
  };

  const isSmall = size === "sm";

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      aria-label={isDark ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
      className={`relative inline-flex items-center justify-center rounded-xl transition-all duration-300 border ${
        isSmall ? "w-8 h-8" : "w-9 h-9"
      } ${
        isDark
          ? "bg-[#0B1520] border-white/10 text-emerald-400 hover:border-emerald-500/30 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]"
          : "bg-white border-slate-200 text-amber-500 hover:border-amber-300 hover:shadow-[0_0_12px_rgba(245,158,11,0.15)] shadow-xs"
      } ${className}`}
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {isDark ? (
          /* Ícone da Lua com cratera sutil */
          <motion.svg
            width={isSmall ? "15" : "18"}
            height={isSmall ? "15" : "18"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.15" />
            <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.4" />
          </motion.svg>
        ) : (
          /* Ícone do Sol com raios radiais */
          <motion.svg
            width={isSmall ? "15" : "18"}
            height={isSmall ? "15" : "18"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </motion.svg>
        )}
      </motion.div>
    </motion.button>
  );
}
