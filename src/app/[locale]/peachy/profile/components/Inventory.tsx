import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { User } from "@/utils/types";
import { wallpapers } from "@/assets/inventory/wallpaper";

const Inventory = ({
  userInfoByDiscord,
  userInfo,
}: {
  userInfoByDiscord: any;
  userInfo: User;
}) => {
  const userWallpapers: any =
    userInfo?.inventory
      ?.map((inv: any) => {
        const matchedWallpaper = wallpapers.find((wp) => wp.id === inv.id);
        return matchedWallpaper;
      })
      .filter(Boolean) || [];

  return (
    <Card className="w-full p-6 h-full bg-card text-card-foreground border-2 px-4 py-2 shadow-md transition-colors duration-200">
      <div className="w-full">
        <h4 className="text-2xl font-semibold tracking-tight text-primary">
          Inventory
        </h4>
      </div>
      {userWallpapers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userWallpapers.map((wallpaper: any) => (
            <div
              key={wallpaper.id}
              className="group flex w-full flex-col rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  className="rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-105"
                  src={wallpaper.image}
                  alt={wallpaper.name}
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPgZ3H9gAAAABJRU5ErkJggg=="
                />
              </div>

              {/* Content Container */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-lg font-medium text-primary transition-colors">
                  {wallpaper.name}
                </p>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {wallpaper.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-32">
          <p className="text-muted-foreground text-center text-lg">
            No wallpapers in your inventory yet!
          </p>
        </div>
      )}
    </Card>
  );
};

export default Inventory;
