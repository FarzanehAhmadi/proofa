import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";

export default function Hero() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <AnimatedGridPattern
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12",
        )}
        duration={1}
        maxOpacity={0.1}
        numSquares={30}
      />
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 text-center sm:px-8 sm:py-16 md:max-w-7xl lg:py-20">
          <h1 className="mx-auto mt-4 max-w-[18ch] font-bold text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3.5rem]">
            ZKP Blockchain Consultancy & Solutions
          </h1>

          <p className="mx-auto mt-6 max-w-[65ch] text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            Expert post-quantum consultancy for blockchain and cryptography. We
            help organisations navigate blockchain technology and prepare for
            the quantum computing era with quantum-resistant solutions.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:mt-12 sm:flex-row sm:justify-center sm:gap-6">
            <Button
              className="w-full rounded-full text-base sm:w-auto sm:text-lg"
              size="lg"
            >
              Book a Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              className="w-full rounded-full text-base shadow-none sm:w-auto sm:text-lg"
              size="lg"
              variant="outline"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
