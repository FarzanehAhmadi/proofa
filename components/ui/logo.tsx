"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const dimensions = {
    sm: { width: 80, height: 20 },
    md: { width: 124, height: 32 },
    lg: { width: 180, height: 46 },
  };

  // After mounting, we can safely show the theme-dependent UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial client render, show a placeholder with same dimensions
  if (!mounted) {
    return (
      <div
        style={{
          width: dimensions[size].width,
          height: dimensions[size].height,
        }}
      />
    );
  }

  const logoSrc = resolvedTheme === "dark" ? "/Logo-dark.svg" : "/Logo.svg";

  return (
    <Image
      src={logoSrc}
      width={dimensions[size].width}
      height={dimensions[size].height}
      alt="Logo"
    />
  );
}
