"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { sepolia } from "wagmi/chains";
import { useMemo } from "react";

export default function Web3Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { config, queryClient } = useMemo(
    () => ({
      config: getDefaultConfig({
        appName: "Proofa",
        projectId: "b358e1212b4ad479e1d418e1059e858c",
        chains: [sepolia],
      }),
      queryClient: new QueryClient(),
    }),
    [],
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
