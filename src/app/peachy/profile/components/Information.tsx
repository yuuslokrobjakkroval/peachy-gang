import Image from "next/image";
import { Card } from "@/components/ui/card";
import { avatarUrl, bannerUrl, formatCoinCompact } from "@/utils/common";
import { MdVerified } from "react-icons/md";
import { User } from "@/utils/types";
import {
  BrainCog,
  CircleDollarSign,
  Coins,
  Gift,
  HandCoins,
  Landmark,
  Spade,
} from "lucide-react";

const Information = ({
  peachyInfo,
  userInfo,
}: {
  peachyInfo: any;
  userInfo: User;
}) => {
  const backgroundStyle =
    !!peachyInfo.banner === null
      ? { background: `url(${bannerUrl(peachyInfo.id, peachyInfo.banner)})` }
      : { backgroundColor: peachyInfo.banner_color };

  return (
    <Card className="items-center w-full h-full p-[16px] bg-cover">
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={backgroundStyle}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <Image
            className="h-full w-full rounded-full"
            src={avatarUrl(peachyInfo)}
            alt=""
            width="512"
            height="512"
          />
        </div>
      </div>

      {/* Global Name and Username */}
      <div className="mt-8 flex flex-col">
        <h4 className="flex justify-center text-xl font-bold text-navy-700 dark:text-white gap-1">
          {peachyInfo?.global_name}
          {peachyInfo?.verified && <MdVerified className="mt-0.5" />}
        </h4>

        <p className="flex justify-center text-base font-normal text-muted-foreground">
          {peachyInfo?.username}
        </p>

        <p className="text-base font-normal text-muted-foreground">
          {userInfo?.profile?.bio ?? ""}
        </p>
      </div>

      {/* Post followers */}
      <div className="mt-3 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="flex justify-center items-center text-lg font-bold text-navy-700 dark:text-white">
            {formatCoinCompact(userInfo.balance?.coin ?? 0)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">Coin</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="flex justify-center items-center text-lg font-bold text-navy-700 dark:text-white">
            {formatCoinCompact(userInfo.balance?.bank ?? 0)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">Bank</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="flex justify-center items-center text-lg font-bold text-navy-700 dark:text-white">
            {formatCoinCompact(userInfo.balance?.slots ?? 0)}
          </p>
          <p className="flex justify-center items-center text-sm font-normal text-muted-foreground">
            Slot
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="flex justify-center items-center text-lg font-bold text-navy-700 dark:text-white">
            {formatCoinCompact(userInfo.balance?.blackjack ?? 0)}
          </p>
          <p className="flex justify-center items-center text-sm font-normal text-muted-foreground">
            Blackjack
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="flex justify-center items-center text-lg font-bold text-navy-700 dark:text-white">
            {formatCoinCompact(userInfo.balance?.coinflip ?? 0)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">Coin Flip</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="flex justify-center items-center text-lg font-bold text-navy-700 dark:text-white">
            {formatCoinCompact(userInfo.balance?.sponsor ?? 0)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">Sponsor</p>
        </div>
      </div>
    </Card>
  );
};

export default Information;
