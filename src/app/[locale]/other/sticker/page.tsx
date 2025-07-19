"use client";

import React, { useEffect, useState } from "react";
import { usePeachy } from "@/contexts/peachy";
import { PermissionFlags, iconUrl, stickerUrl } from "@/utils/common";
import { LimelightGuild } from "@/components/limelight-guild";
import {
  useGetGuildInfoQuery,
  useGetGuildStickerQuery,
} from "@/redux/api/guild";
import Image from "next/image";
import Loading from "@/components/loading/circle";
import NotJoined from "@/components/modules/guilds/not-join";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EmojiManagementPage = () => {
  const { guilds } = usePeachy();
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const emojisPerPage = 100;

  const guildsTabs = guilds
    .filter(
      (guild) =>
        (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0,
    )
    .map((guild) => ({
      id: guild.id,
      icon: guild.icon ? iconUrl(guild) : null,
      label: guild.name,
      onClick: () => {
        setSelectedGuildId(guild.id);
        setPage(1);
      },
    }));

  const { data: guild, isLoading: isGuildLoading } =
    useGetGuildInfoQuery(selectedGuildId);

  const { data: stickers = [], isLoading: isStickerLoading } =
    useGetGuildStickerQuery(selectedGuildId);

  useEffect(() => {
    if (!selectedGuildId) {
      const filtered = guilds.filter(
        (guild) =>
          (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0,
      );
      setSelectedGuildId(filtered[0]?.id ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGuildId]);

  const paginatedEmojis = stickers.slice(
    (page - 1) * emojisPerPage,
    page * emojisPerPage,
  );
  const totalPages = Math.ceil(stickers.length / emojisPerPage);

  if (isGuildLoading || isStickerLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 sm:py-8 lg:py-10">
      <h1 className="mb-4 text-lg font-bold sm:text-xl md:text-2xl">
        Sticker Management :{" "}
        <span className="text-primary">
          {guild?.name} {stickers?.length ?? 0} Stickers
        </span>
      </h1>

      <div className="mx-auto mb-6">
        <LimelightGuild
          className="overflow-x-auto overflow-y-hidden"
          iconClassName="rounded-md object-cover w-8 h-8 sm:w-10 sm:h-10"
          items={guildsTabs}
        />
      </div>
      {guild ? (
        stickers?.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 xs:gap-4 sm:gap-6 md:gap-8">
              {paginatedEmojis.map((sticker: any) => (
                <div
                  key={sticker.id}
                  className="flex flex-col items-center space-y-1 text-center"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={stickerUrl(sticker)}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] xs:text-xs sm:text-sm hover:underline break-all"
                      >
                        <Image
                          src={stickerUrl(sticker)}
                          width={48}
                          height={48}
                          alt={sticker.name}
                          className="object-contain w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14"
                          unoptimized
                        />
                        {stickerUrl(sticker.name)}
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-sm sm:gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 text-xs border rounded sm:px-4 sm:py-2 disabled:opacity-50 sm:text-sm"
                >
                  Prev
                </button>
                <span className="text-xs text-muted-foreground sm:text-sm">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 text-xs border rounded sm:px-4 sm:py-2 disabled:opacity-50 sm:text-sm"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="mt-6 text-sm text-center text-muted-foreground sm:text-base">
            No sticker found in this server.
          </p>
        )
      ) : (
        <NotJoined guildId={selectedGuildId} />
      )}
    </div>
  );
};

export default EmojiManagementPage;
