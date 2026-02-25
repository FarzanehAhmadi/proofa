import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Unbounded } from "next/font/google";
import "./globals.css";

const bodyFont = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const monoFont = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const headingFont = Unbounded({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Proofa",
  description: "Privacy infrastructure powered by zero-knowledge proofs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${bodyFont.variable}
          ${monoFont.variable}
          ${headingFont.variable}
          font-sans
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
