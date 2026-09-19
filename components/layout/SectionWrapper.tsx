import React from "react";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  width?: "default" | "wide" | "narrow" | "full";
  spacing?: "default" | "hero" | "tight" | "spacious" | "none";
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
    default: "max-w-7xl", // 1280px (aligns with Navbar max-w-7xl)
    wide: "max-w-[1360px]", // 1360px
    narrow: "max-w-4xl", // 896px for FAQ / Editorial
    full: "w-full",
  };

  const spacingClasses = {
    default: "py-20 sm:py-28 lg:py-32",
    hero: "pt-8 sm:pt-12 lg:pt-16 pb-20 sm:pb-28 lg:pb-32",
    tight: "py-14 sm:py-18 lg:py-20",
    spacious: "py-24 sm:py-32 lg:py-36",
    none: "py-0",
  };

  return (
    <section id={id} className={`w-full relative ${spacingClasses[spacing]} ${className}`}>
      <div className={`relative z-20 mx-auto px-4 sm:px-6 lg:px-8 ${widthClasses[width]} ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
