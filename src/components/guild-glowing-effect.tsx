"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Guild, iconUrl } from "@/utils/common";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { usePeachy } from "@/contexts/peachy";

export function GuildGlowingEffect({ items }: { items: Guild[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items?.map((item: Guild, index) => (
        <GridItem key={index} item={item} />
      ))}
    </ul>
  );
}

const GridItem = ({ item }: { item: Guild }) => {
  const { setGuildId } = usePeachy();
  const router = useRouter();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <li className={cn("min-h-[8rem] list-none")}>
            <a
              className="cursor-pointer"
              rel="noopener noreferrer"
              onClick={() => {
                setGuildId(item.id);
                router.push(`/guilds/${item.id}`);
              }}
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
                    <div className="flex items-center justify-start">
                      <Avatar className="h-12 w-12 rounded-lg border-2 mr-3">
                        {item.icon ? (
                          <Image
                            className="rounded-xs object-cover"
                            src={iconUrl(item)}
                            alt={item.name}
                            width={128}
                            height={128}
                            priority
                            sizes="(max-width: 768px) 50vw, 128px"
                          />
                        ) : (
                          <AvatarFallback className="rounded-xs bg-primary text-sm font-semibold">
                            {item.name?.[0]}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-primary text-base font-semibold truncate">
                          {item.name}
                        </span>
                        {item?.description && (
                          <p className="flex flex-col text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </TooltipTrigger>
        <TooltipContent>Config Now</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
