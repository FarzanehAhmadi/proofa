"use client";

import Web3Provider from "@/components/provider/Web3Provider";

export default function DappLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Web3Provider>{children}</Web3Provider>;
}
