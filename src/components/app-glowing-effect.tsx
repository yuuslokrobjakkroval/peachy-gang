"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Image from "next/image";

export function AppdGlowingEffect({ items }: { items: any[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items?.map((item, index) => <GridItem key={index} item={item} />)}
    </ul>
  );
}

interface GridItemProps {
  item: {
    area: string;
    icon: React.ReactNode;
    title: string;
    description?: React.ReactNode;
    url?: string;
    banner?: string;
    inviteUrl?: string;
  };
}

const GridItem = ({ item }: GridItemProps) => {
  const { area, icon, title, description, url, banner, inviteUrl } = item;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <li className={cn("min-h-[8rem] list-none", area)}>
            <a
              className="cursor-pointer"
              href={inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-card relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background/80 p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-3">
                        <h3 className="text-xl font-medium text-primary pt-0.5 leading-[1.375rem] tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance">
                          {title}
                        </h3>
                        <h2 className="whitespace-pre-line [&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                          {description}
                        </h2>
                      </div>
                      {url && (
                        <Image
                          className="rounded-lg object-cover"
                          src={url}
                          alt={title}
                          width={128}
                          height={128}
                          priority
                          sizes="(max-width: 768px) 50vw, 128px"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </TooltipTrigger>
        <TooltipContent>Try Now</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
