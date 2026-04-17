"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navItemStyle =
  "px-3 py-2 text-sm font-medium bg-transparent hover:bg-transparent focus:bg-transparent text-foreground hover:text-primary transition-all duration-200 hover:scale-105";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navItemStyle}>
          <Link href="/">Home</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navItemStyle}>
          <Link href="/blog">Blog</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* <NavigationMenuItem>
        <NavigationMenuLink asChild className={navItemStyle}>
          <Link href="/services">Services</Link>
        </NavigationMenuLink>
      </NavigationMenuItem> */}

      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navItemStyle}>
          <Link href="/dapps">dApps</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
