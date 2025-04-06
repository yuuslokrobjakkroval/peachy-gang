import { NextPage } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { useGetGuildsQuery } from "@/redux/api/discord";
import { LoadingPage } from "./loading-page";
import { getOwnerGuild, iconUrl } from "@/utils/common";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const GuildsPage = ({}) => {
  const { data: guilds, isLoading } = useGetGuildsQuery(null);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="w-full flex flex-col items-center gap-3 overflow-y-auto px-2">
      {getOwnerGuild(guilds)?.map((guild: any) => (
        <Card
          key={guild.id}
          className="w-full max-w-[280px] bg-[#e8e2d5] dark:bg-gray-700 hover:bg-[#d9d2c5] dark:hover:bg-gray-600 transition-all duration-200 cursor-pointer rounded-xl shadow-md"
        >
          <CardHeader className="p-4">
            <CardTitle className="flex items-start gap-3">
              <Avatar className="h-12 w-12 rounded-lg border-2 border-white dark:border-gray-600 shadow-sm">
                <AvatarImage
                  src={iconUrl(guild)}
                  alt={guild.name}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-sm font-semibold">
                  {guild.name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {guild.name}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
