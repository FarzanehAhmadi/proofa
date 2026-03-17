import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileText, Wallet, PenTool, Eye } from "lucide-react";

export default function Integrations() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col px-6 py-12 sm:py-14">
      <h2 className="text-center font-semibold text-4xl tracking-tight sm:text-5xl">
        Proofa Lab
      </h2>
      <p className="mt-3 text-center text-muted-foreground text-xl sm:text-2xl">
        Explore Web3 tools and cryptographic proofs.
      </p>
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <div
            className="flex flex-col items-start rounded-lg border bg-card p-6"
            key={integration.title}
          >
            <div className="grow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full mb-2">
                <integration.icon className="text-primary" />
              </div>
              <h3 className="mt-5 font-semibold text-xl">
                {integration.title}
              </h3>
              <p className="mt-1 text-pretty text-muted-foreground tracking-normal">
                {integration.description}
              </p>
            </div>
            <div className="mt-4">
              {integration.status === "live" ? (
                <Button className="mt-6 cursor-pointer">
                  Connect <ArrowUpRight />
                </Button>
              ) : (
                <span className="text-gray-400 text-sm">Coming soon</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const integrations = [
  {
    title: "Proof of Existence",
    description:
      "Upload a file and register its hash on the blockchain to prove ownership.",
    href: "/dapp/proof",
    status: "live",
    icon: FileText,
  },
  {
    title: "Wallet Connect",
    description:
      "Connect your Web3 wallet to interact with blockchain-based tools.",
    href: "/dapp/wallet",
    status: "live",
    icon: Wallet,
  },
  {
    title: "Message Signing",
    description:
      "Sign messages to verify your identity or approve actions securely.",
    href: "/dapp/sign",
    status: "coming",
    icon: PenTool,
  },
  {
    title: "zk Proof Demo",
    description:
      "Try a zero-knowledge proof demo to see privacy-preserving proofs in action.",
    href: "/dapp/zk",
    status: "coming",
    icon: Eye,
  },
];
