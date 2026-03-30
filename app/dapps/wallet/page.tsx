export default function WalletPage() {
  return (
    <div className="container mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Wallet Connection</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Connect, view balances, switch networks, and interact with your wallet.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-8">
          <h2 className="text-2xl font-semibold">Connection Status</h2>
          <div className="mt-6">
            {/* Here goes: useAccount(), <ConnectButton />, account address, chain, etc. */}
            <p className="text-lg">Connect your wallet to see details</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-8">
          <h2 className="text-2xl font-semibold">Quick Actions</h2>
          <div className="mt-6 space-y-4">
            <button className="w-full rounded-lg border p-4 text-left hover:bg-accent">
              View Balances
            </button>
            <button className="w-full rounded-lg border p-4 text-left hover:bg-accent">
              Switch Network
            </button>
            <button className="w-full rounded-lg border p-4 text-left hover:bg-accent">
              Send Transaction (demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
