"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const { resolvedTheme } = useTheme();

  const logoSrc = resolvedTheme === "dark" ? "/Logo-dark.svg" : "/Logo.svg";

  const dimensions = {
    sm: { width: 80, height: 20 },
    md: { width: 124, height: 32 },
    lg: { width: 180, height: 46 },
  };

  return (
    <Image
      src={logoSrc}
      width={dimensions[size].width}
      height={dimensions[size].height}
      alt="Logo"
    />
  );
}
