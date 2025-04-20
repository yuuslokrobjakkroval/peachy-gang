import { cn } from "@/lib/utils";
import { AppConfig } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

const BotInformation = ({ Cards }: { Cards: AppConfig[] }) => {
  return (
    <div className="flex w-full items-center justify-center py-8 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 max-w-[90%] sm:max-w-7xl">
        {Cards.map((card: AppConfig) => (
          <div
            key={card.id}
            className="flex w-full flex-col rounded-xl bg-card overflow-hidden transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex flex-col justify-start text-xs sm:text-sm uppercase">
              <span className="px-4 py-1 text-muted-foreground rounded-md">
                <h4 className="flex text-2xl font-semibold tracking-tight text-primary gap-2">
                  <card.icon className="mt-1" /> {card.name}
                </h4>
              </span>
            </div>

            <div className="w-full px-2 sm:px-2 pb-3 sm:pb-3">
              <Separator className="flex-1" />
            </div>

            {/* Image Container */}
            <div className="relative w-full aspect-[1/1] overflow-hidden">
              <Image
                className="object-cover rounded-xl px-2"
                src={card.url}
                alt={`${card.name} avatar`}
                fill
                quality={85}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPgZ3H9gAAAABJRU5ErkJggg=="
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 rounded-t-xl" />
            </div>
            {/* Content Container */}
            <div className="p-4 sm:p-5 flex flex-col flex-1">
              {/* Invite Button */}
              <Link
                href={card.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 sm:mt-3 w-full inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-gray-800 rounded-lg bg-primary border border-primary-border text-primary-foreground hover:bg-primary/90"
                aria-label={`Invite ${card.name} to your Discord server`}
              >
                Invite Bot
              </Link>
            </div>

            {/* Command Categories */}
            <div className="w-full px-2 sm:px-2 pb-3 sm:pb-3">
              <div className="relative mb-2 sm:mb-3">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm uppercase">
                  <span className="bg-background px-3 text-muted-foreground">
                    Command Categories
                  </span>
                </div>
              </div>
              <div className={cn("grid gap-1", "grid-cols-3 sm:grid-cols-3")}>
                {card.categories?.map((category, index) => (
                  <div
                    key={index}
                    className={cn(
                      "bg-card border border-border",
                      "rounded-[var(--radius)] p-3 text-center text-sm",
                      "font-medium text-card-foreground",
                      "hover:bg-muted hover:shadow-sm transition-all duration-200"
                    )}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BotInformation;
