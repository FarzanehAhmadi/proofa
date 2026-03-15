"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/layout/Navbar/nav-menu";
import { NavigationSheet } from "@/components/layout/Navbar/navigation-sheet";
import Logo from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 h-16 transition-all duration-300 ${
        scrolled ? "bg-transparent backdrop-blur-md" : "bg-background"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Go to homepage">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* Contact Us – visible only on desktop */}
          <Button className="hidden md:inline-flex">Contact Us</Button>

          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
