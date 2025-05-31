import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  avatarUrl,
  bannerUrl,
  decorationUrl,
  formatCoinCompact,
} from "@/utils/common";
import { MdVerified } from "react-icons/md";
import { User } from "@/utils/types";

const Information = ({
  userInfoByDiscord,
  userInfo,
}: {
  userInfoByDiscord: any;
  userInfo: User;
}) => {
  const backgroundStyle = userInfoByDiscord.banner
    ? {
        background: `url(${bannerUrl(
          userInfoByDiscord.id,
          userInfoByDiscord.banner
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundColor: userInfoByDiscord.banner_color };

  return (
    <Card className="items-center w-full h-full p-[16px] bg-cover">
      {/* Background and profile */}
      <div
        className="relative mt-1 flex w-full justify-center rounded-xl bg-cover h-[clamp(160px,20vw,300px)]"
        style={backgroundStyle}
      >
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          {/* Decoration and Avatar Wrapper */}
          <div className="relative w-[96px] h-[96px] flex items-center justify-center">
            {/* Avatar */}
            <div className="relative w-[87px] h-[87px] rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700 overflow-hidden">
              <Image
                src={avatarUrl(userInfoByDiscord)}
                alt="Profile Avatar"
                width={87}
                height={87}
                className="rounded-full object-cover"
              />
            </div>

            {/* Avatar Decoration */}
            {userInfoByDiscord.avatar_decoration_data?.asset && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Image
                  src={decorationUrl(userInfoByDiscord.avatar_decoration_data)}
                  alt="Avatar Decoration"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Name and Username */}
      <div className="mt-8 flex flex-col">
        <h4 className="flex justify-center text-xl font-bold text-navy-700 dark:text-white gap-1">
          {userInfoByDiscord?.global_name}
          {userInfoByDiscord?.verified && <MdVerified className="mt-0.5" />}
        </h4>
        <p className="flex justify-center text-base font-normal text-muted-foreground">
          {userInfoByDiscord?.username}
        </p>
      </div>

      {/* Post followers */}
      <div className="mt-3 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="flex justify-center items-center text-lg font-bold text-navy-700 dark:text-white">
            {formatCoinCompact(userInfo?.balance?.coin ?? 0)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">Coin</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="flex justify-center items-center text-lg font-bold text-navy-700 dark:text-white">
            {formatCoinCompact(userInfo?.balance?.bank ?? 0)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">Bank</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="flex justify-center items-center text-lg font-bold text-navy-700 dark:text-white">
            {formatCoinCompact(userInfo?.balance?.slots ?? 0)}
          </p>
          <p className="flex justify-center items-center text-sm font-normal text-muted-foreground">
            Slot
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="flex justify-center items-center text-lg font-bold text-navy-700 dark:text-white">
            {formatCoinCompact(userInfo?.balance?.blackjack ?? 0)}
          </p>
          <p className="flex justify-center items-center text-sm font-normal text-muted-foreground">
            Blackjack
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="flex justify-center items-center text-lg font-bold text-navy-700 dark:text-white">
            {formatCoinCompact(userInfo?.balance?.coinflip ?? 0)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">Coin Flip</p>
        </div>
      </div>
    </Card>
  );
};

export default Information;
