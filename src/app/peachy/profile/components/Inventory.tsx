import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { User } from "@/utils/types";
import { wallpapers } from "@/assets/inventory/wallpaper";
import { FaHeart } from "react-icons/fa";

const Inventory = ({
  peachyInfo,
  userInfo,
}: {
  peachyInfo: any;
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
    <Card className="w-full p-4 h-full">
      <div className="mb-4 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Inventory
        </h4>
      </div>
      {userWallpapers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userWallpapers.map((wallpaper: any) => (
            <div
              key={wallpaper.id}
              className="flex w-full flex-row items-center justify-between rounded-2xl bg-white p-2 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
            >
              {/* Image on the left */}
              <div className="flex-shrink-0">
                <Image
                  className="rounded-lg object-cover"
                  src={wallpaper.image}
                  alt={wallpaper.name}
                  width={128}
                  height={128}
                  quality={100}
                />
              </div>

              {/* Text on the right */}
              <div className="flex flex-1 flex-row items-center justify-between ml-4">
                <div className="flex-1">
                  <p className="text-base font-medium text-navy-700 dark:text-white">
                    {wallpaper.name}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {wallpaper.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No wallpapers in your inventory yet!
        </p>
      )}
    </Card>
  );
};

export default Inventory;
