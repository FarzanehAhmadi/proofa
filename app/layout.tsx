import type { Metadata } from "next";
import { Unbounded, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import Navbar from "@/components/layout/Navbar/navbar";

const headingFont = Unbounded({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

const bodyFont = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-body",
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
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme={false}
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
