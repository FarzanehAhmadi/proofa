"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export default function Logo() {
  const { theme } = useTheme();

  const logoSrc = theme === "dark" ? "/Logo-dark.svg" : "/Logo.svg";

  return <Image src={logoSrc} width={124} height={32} alt="Logo" />;
}
