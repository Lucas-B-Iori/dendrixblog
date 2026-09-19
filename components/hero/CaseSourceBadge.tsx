import React from "react";

interface CaseSourceBadgeProps {
  page: string;
  documentType?: string;
  variant?: "amber" | "emerald" | "neutral";
  className?: string;
}

export function CaseSourceBadge({
  page,
  documentType,
  variant = "emerald",
  className = "",
}: CaseSourceBadgeProps) {
  const variantStyles = {
    amber: "bg-amber-50 text-amber-900 border-amber-200/80",
    emerald: "bg-emerald-50 text-emerald-900 border-emerald-200/80",
    neutral: "bg-slate-100 text-slate-800 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs font-medium px-2 py-0.5 rounded border transition-all ${variantStyles[variant]} ${className}`}
      title="Origem documental conferida nos autos"
    >
      <span className="opacity-75">Fls.</span>
      <span className="font-semibold">{page}</span>
      {documentType && <span className="opacity-70 text-[10px] hidden sm:inline">• {documentType}</span>}
    </span>
  );
}
