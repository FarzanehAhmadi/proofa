"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar"; // Import your original Navbar component

export default function NavbarWrapper() {
  const pathname = usePathname();

  // If the URL starts with /admin, return nothing (null)
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <Navbar />;
}
