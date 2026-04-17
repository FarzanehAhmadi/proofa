"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";

export default function DappHome() {
  const { isConnected } = useAccount();
  const router = useRouter();

  return (
    <div className="w-full min-h-screen relative bg-background flex items-center justify-center p-6">
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/70 pointer-events-none" />

      {/* Main Container */}
      <div
        className="
          relative z-10
          w-full max-w-[980px]

          flex flex-col lg:flex-row
          bg-card/30 backdrop-blur-xl
          border border-border
          rounded-3xl overflow-hidden

          p-6 sm:p-8 lg:p-10 gap-8 lg:gap-10
        "
      >
        {/* LEFT: Wallet */}
        <div className="flex-1 flex items-start justify-center pt-6 lg:pt-10">
          <div className="w-full max-w-sm text-center space-y-6">
            <h2 className="text-foreground text-2xl font-semibold">Wallet</h2>

            <p className="text-muted-foreground body-m">
              Connect your wallet to continue
            </p>

            <div className="flex justify-center">
              <ConnectButton />
            </div>

            {isConnected ? (
              <p className="text-muted-foreground body-s">Wallet connected</p>
            ) : (
              <p className="text-muted-foreground body-s">
                No wallet connected
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: DApps */}
        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight">
              Applications
            </h2>

            <p className="text-muted-foreground mt-2">
              Choose a dApp to continue
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Proof */}
            <button
              onClick={() => router.push("/dapps/proof")}
              className="text-left bg-card/60 border border-border rounded-2xl p-6 hover:bg-card transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl mb-4" />
              <div className="font-semibold text-foreground">
                Proof of Existence
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Store and verify file hashes on-chain
              </div>
            </button>

            {/* Wallet */}
            <button
              onClick={() => router.push("/dapps/wallet")}
              className="text-left bg-card/60 border border-border rounded-2xl p-6 hover:bg-card transition-all"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-xl mb-4" />
              <div className="font-semibold text-foreground">Wallet</div>
              <div className="text-sm text-muted-foreground mt-1">
                View balance and manage connection
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
