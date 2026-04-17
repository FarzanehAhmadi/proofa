"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function WalletPage() {
  const { isConnected } = useAccount();

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border bg-card p-8 text-center">
        <h2>Wallet</h2>

        <p className="mt-3 text-muted-foreground body-m">
          Connect your wallet to continue
        </p>

        <div className="mt-6 flex justify-center">
          <ConnectButton />
        </div>

        {!isConnected && (
          <p className="mt-6 text-muted-foreground body-s">
            No wallet connected
          </p>
        )}
      </div>
    </div>
  );
}
