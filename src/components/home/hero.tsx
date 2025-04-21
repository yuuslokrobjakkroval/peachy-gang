import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import BotInformation from "../contents/bot-info";
import { CARD } from "@/utils/config";

export function Hero() {
  return (
    <section className="w-full">
      <div className="container px-4 md:px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-left max-w-2xl mx-auto lg:mx-0">
            <div>
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium shadow-sm transition-none"
                variant="secondary"
              >
                <span className="mr-1 text-primary">✦</span> Visual Theme Editor
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70">
              Design Your Perfect{" "}
              <span className="text-primary">shadcn/ui</span> Theme
            </h1>
            <p className="text-muted-foreground mb-8 text-lg md:text-xl leading-relaxed">
              Customize colors, typography, and layouts with a real-time
              preview. No signup required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/editor/theme">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 cursor-pointer shadow-md hover:shadow-lg transition-transform duration-300 hover:translate-y-[-2px] text-base"
                >
                  Start Customizing
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <a href="#examples">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 cursor-pointer border-primary/20 hover:border-primary/50 transition-transform duration-300 hover:translate-y-[-2px] text-base"
                >
                  View Examples
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-5 text-primary" />
                <span>Real-time Preview</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-5 text-primary" />
                <span>Export to Tailwind</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-5 text-primary" />
                <span>Beautiful Presets</span>
              </div>
            </div>
          </div>

          {/* Right Column - Preview Card */}
          {/* <div className="text-right max-w-2xl mx-auto lg:mx-0">
            <BotInformation Cards={CARD} />
          </div> */}
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_30%,var(--muted),transparent_35%)] blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_70%,var(--muted),transparent_10%)] blur-3xl"></div>
    </section>
  );
}
