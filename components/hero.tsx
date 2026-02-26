import { ArrowUpRight } from "lucide-react";
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
        duration={3}
        maxOpacity={0.1}
        numSquares={30}
      />
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto grid w-full max-w-(--breakpoint-xl) gap-12 px-6 py-12 lg:grid-cols-2">
          <div>
            <h1 className="mt-6 max-w-[17ch] font-semibold text-4xl leading-[1.2]! tracking-[-0.035em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
              Customized Shadcn UI Blocks & Components
            </h1>
            <p className="mt-6 max-w-[60ch] text-foreground/80 sm:text-lg">
              Explore a collection of Shadcn UI blocks and components, ready to
              preview and copy. Streamline your development workflow with
              easy-to-implement examples.
            </p>
            <div className="mt-12 flex items-center gap-4">
              <Button className="rounded-full text-base" size="lg">
                Get Started <ArrowUpRight className="h-5! w-5!" />
              </Button>
              <Button
                className="rounded-full text-base shadow-none"
                size="lg"
                variant="outline"
              >
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="aspect-video w-full rounded-xl bg-accent" />
        </div>
      </div>
    </div>
  );
}
