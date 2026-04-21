import Link from "next/link";
import { FileText, Wallet, PenTool, Eye } from "lucide-react";

export default function DappHub() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col px-6 py-12 sm:py-14">
      <h2 className="text-center font-semibold text-4xl tracking-tight sm:text-5xl">
        Proofa Lab
      </h2>
      <p className="mt-3 text-center text-muted-foreground text-xl sm:text-xl">
        Explore Web3 tools and cryptographic experiments
      </p>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dapps.map((app) => (
          <Link key={app.title} href={app.href}>
            <div className="relative flex flex-col items-start overflow-hidden border bg-card cursor-pointer hover:shadow-lg transition">
              {/* Decorative dashed lines */}
              <div className="absolute inset-x-0 top-7 h-9.5 border-y border-dashed bg-muted/30" />
              <div className="absolute inset-y-0 left-7 w-9.5 border-x border-dashed bg-muted/30" />

              <div className="relative isolate flex items-start justify-between gap-5 p-6">
                {/* Icon */}
                <div className="w-fit shrink-0 rounded-3xl bg-transparent p-1">
                  <div className="relative border bg-background flex items-center justify-center w-16 h-16">
                    <app.icon className="text-2xl text-purple-700" />
                  </div>
                </div>

                {/* Title & description */}
                <div className="flex-1">
                  <h3 className="py-2 font-semibold text-xl">{app.title}</h3>
                  <p className="mt-4 mb-2 text-muted-foreground tracking-normal text-sm sm:text-base">
                    {app.description}
                  </p>
                  {/* Status */}
                  <div className="mt-2">
                    {app.status === "live" ? (
                      <span className="text-green-600 text-sm font-medium">
                        Open →
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">Coming soon</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const dapps = [
  {
    title: "Proof of Existence",
    description:
      "Upload a file and register its hash on the blockchain to prove ownership.",
    href: "/dapps/proof",
    status: "live",
    icon: FileText,
  },
  {
    title: "Wallet Connect",
    description:
      "Connect your Web3 wallet to interact with blockchain-based tools.",
    href: "/dapps/wallet",
    status: "live",
    icon: Wallet,
  },
  {
    title: "Message Signing",
    description:
      "Sign messages to verify your identity or approve actions securely.",
    href: "/dapps/sign",
    status: "coming",
    icon: PenTool,
  },
  {
    title: "zk Proof Demo",
    description:
      "Try a zero-knowledge proof demo to see privacy-preserving proofs in action.",
    href: "/dapps/zk",
    status: "coming",
    icon: Eye,
  },
];
