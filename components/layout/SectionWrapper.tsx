import React from "react";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  width?: "default" | "wide" | "narrow" | "full";
  spacing?: "default" | "hero" | "tight" | "none";
}

export function SectionWrapper({
  id,
  className = "",
  containerClassName = "",
  children,
  width = "default",
  spacing = "default",
}: SectionWrapperProps) {
  const widthClasses = {
    default: "max-w-7xl", // 1280px
    wide: "max-w-[1360px]", // 1360px for Hero Split
    narrow: "max-w-3xl", // 768px for FAQ / Editorial
    full: "w-full",
  };

  const spacingClasses = {
    default: "py-16 sm:py-20 lg:py-24",
    hero: "pt-8 sm:pt-12 pb-16 sm:pb-24",
    tight: "py-12 sm:py-16",
    none: "py-0",
  };

  return (
    <section id={id} className={`w-full relative ${spacingClasses[spacing]} ${className}`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${widthClasses[width]} ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
