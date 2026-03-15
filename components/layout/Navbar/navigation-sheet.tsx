/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

import { NavMenu } from "@/components/layout/Navbar/nav-menu";
import Logo from "@/components/ui/logo";

export const NavigationSheet = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close sheet automatically when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full max-w-xs flex-col gap-6 px-5 py-6 sm:max-w-sm sm:px-6"
      >
        <div className="flex items-center justify-between">
          <Logo size="sm" />
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <NavMenu
            orientation="vertical"
            className="flex flex-col gap-1 [&>div]:w-full"
          />

          <Button
            asChild
            variant="default"
            className="w-full justify-center"
            size="lg"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
