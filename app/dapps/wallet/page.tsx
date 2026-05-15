"use client";

import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther, isAddress } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function WalletPage() {
  const { isConnected } = useAccount();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const { sendTransaction, isPending, data } = useSendTransaction();

  const handleSend = async () => {
    if (!isAddress(to)) {
      alert("Invalid wallet address");
      return;
    }

    sendTransaction({
      to,
      value: parseEther(amount),
    });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border bg-card p-8 text-center">
        <h2>Wallet</h2>

        <div className="mt-6 flex justify-center">
          <ConnectButton />
        </div>

        {isConnected && (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Receiver address"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded border p-2"
            />

            <input
              type="text"
              placeholder="Amount in ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded border p-2"
            />

            <button
              onClick={handleSend}
              disabled={isPending}
              className="w-full rounded bg-black p-2 text-white"
            >
              {isPending ? "Sending..." : "Send ETH"}
            </button>

            {data && <p className="break-all text-sm">Tx Hash: {data}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
