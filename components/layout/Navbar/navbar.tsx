"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/layout/Navbar/nav-menu";
import { NavigationSheet } from "@/components/layout/Navbar/navigation-sheet";
import Image from "next/image";

const Navbar = () => {
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
        scrolled ? "bg-transparent backdrop-blur-md border-b" : "bg-background"
      }`}
    >
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Image src="/Logo.svg" width={124} height={32} alt="Logo" />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          {/* <Button className="hidden sm:inline-flex" variant="outline">
            Sign In
          </Button> */}
          <Button>Contact Us</Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
