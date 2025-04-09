"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { AppConfig } from "@/utils/types";
import Image from "next/image";

interface BannerPageProps {
  item: AppConfig;
}

const BannerPage = ({ item }: BannerPageProps) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (item.inviteUrl && typeof item.inviteUrl === "string") {
      router.push(item.inviteUrl);
    } else {
      console.error("Invalid invite URL:", item.inviteUrl);
    }
  };

  return (
    <div className="flex flex-col w-full rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 overflow-hidden">
      {/* Content Container */}
      <div className="flex flex-col flex-1">
        <p className="text-lg font-medium text-primary pl-5 pt-3 pb-3">
          {item.name}
        </p>
      </div>

      <div className="flex flex-col justify-center items-center w-[128px] pb-4">
        <Button
          onClick={handleButtonClick}
          aria-label={`Try ${item.name} now`}
          disabled={!item.inviteUrl}
        >
          Try Now
        </Button>
      </div>
    </div>
  );
};

export default BannerPage;
