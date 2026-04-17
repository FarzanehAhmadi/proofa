"use client";

import { useAccount, useBalance, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function formatAddress(addr?: string) {
  if (!addr) return "";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: balance } = useBalance({
    address,
    query: {
      enabled: !!address,
    },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <h1>Wallet</h1>

      <p className="mt-4 text-muted-foreground body-l">
        Connect your wallet to view balance and status.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 md:p-8">
          <h2>Wallet Status</h2>

          <div className="mt-6 space-y-4">
            <ConnectButton />

            {isConnected ? (
              <div className="space-y-3 body-m">
                <div>
                  <span className="text-muted-foreground">Address:</span>
                  <p>{formatAddress(address)}</p>
                </div>

                <div>
                  <span className="text-muted-foreground">Balance:</span>
                  <p>
                    {balance
                      ? `${balance.formatted} ${balance.symbol}`
                      : "Loading..."}
                  </p>
                </div>

                <button
                  onClick={() => disconnect()}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold hover:bg-accent transition"
                >
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <p className="mt-4 text-muted-foreground body-m">
                Not connected yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
