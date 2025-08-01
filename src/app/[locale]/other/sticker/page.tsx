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
import { Search, X } from "lucide-react";

const StickerManagementPage = () => {
  const { guilds } = usePeachy();
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const emojisPerPage = 30;

  // Download handler function
  const handleDownload = async (sticker: any) => {
    setDownloadingIds((prev) => new Set(prev).add(sticker.id));

    try {
      const url = stickerUrl(sticker);

      // Add CORS headers if needed
      const response = await fetch(url, {
        mode: "cors",
        credentials: "omit",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sticker");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      // Get file extension from URL or default to png
      const urlParts = url.split(".");
      const extension = urlParts[urlParts.length - 1]?.split("?")[0] || "png";

      // Clean sticker name for filename
      const cleanName = sticker.name.replace(/[^a-zA-Z0-9_-]/g, "_");

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${cleanName}.${extension}`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback to direct link download
      const cleanName = sticker.name.replace(/[^a-zA-Z0-9_-]/g, "_");
      const link = document.createElement("a");
      link.href = stickerUrl(sticker);
      link.download = cleanName;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    } finally {
      setDownloadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(sticker.id);
        return newSet;
      });
    }
  };

  // Clear search when switching guilds
  const handleGuildChange = (guildId: string) => {
    setSelectedGuildId(guildId);
    setPage(1);
    setSearchQuery("");
  };

  const guildsTabs = Array.isArray(guilds)
    ? [...guilds]
        ?.sort((a, b) => a.name.localeCompare(b.name))
        ?.map((guild) => ({
          id: guild.id,
          icon: guild.icon ? iconUrl(guild) : null,
          label: guild.name,
          onClick: () => handleGuildChange(guild.id),
        }))
    : [];

  const { data: guild, isLoading: isGuildLoading } =
    useGetGuildInfoQuery(selectedGuildId);

  const { data: stickers = [], isLoading: isStickerLoading } =
    useGetGuildStickerQuery(selectedGuildId);

  // Filter stickers based on search query
  const filteredStickers = Array.isArray(stickers)
    ? stickers.filter((sticker: any) =>
        sticker.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (!selectedGuildId) {
      const filtered = Array.isArray(guilds)
        ? [...guilds]?.sort((a, b) => a.name.localeCompare(b.name))
        : [];
      setSelectedGuildId(filtered[0]?.id ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGuildId]);

  const paginatedEmojis = filteredStickers.slice(
    (page - 1) * emojisPerPage,
    page * emojisPerPage
  );
  const totalPages = Math.ceil(filteredStickers.length / emojisPerPage);

  if (isGuildLoading || isStickerLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-3 py-4 mx-auto overflow-x-hidden xs:px-4 sm:px-6 lg:px-8 xs:py-6 sm:py-8 lg:py-10 max-w-7xl">
      <h1 className="mb-4 text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
        Sticker Management :{" "}
        <span className="text-primary">
          {guild?.name} {filteredStickers?.length ?? 0} Stickers
          {searchQuery && (
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              (filtered from {stickers?.length ?? 0})
            </span>
          )}
        </span>
      </h1>

      <div className="py-4 mx-auto mb-4 overflow-x-hidden xs:py-6 sm:mb-6">
        <LimelightGuild
          className="overflow-x-auto overflow-y-hidden"
          iconClassName="rounded-md object-cover w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10"
          items={guildsTabs}
        />
      </div>

      {/* Search Bar */}
      <div className="mb-4 xs:mb-6">
        <div className="relative w-full max-w-sm xs:max-w-md sm:max-w-lg">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-muted-foreground xs:w-5 xs:h-5" />
          </div>
          <input
            type="text"
            placeholder="Search stickers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-10 text-sm transition-colors border rounded-lg outline-none xs:py-3 xs:pl-12 xs:pr-12 xs:text-base focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors hover:text-primary xs:pr-4"
            >
              <X className="w-4 h-4 xs:w-5 xs:h-5" />
            </button>
          )}
        </div>
      </div>
      {guild ? (
        filteredStickers?.length > 0 ? (
          <>
            <div className="grid grid-cols-4 gap-2 mb-4 xs:grid-cols-5 xs:gap-3 sm:grid-cols-6 sm:gap-4 md:grid-cols-8 md:gap-5 lg:grid-cols-10 lg:gap-6 xl:grid-cols-12 xl:gap-8">
              {paginatedEmojis.map((sticker: any) => (
                <div
                  key={sticker.id}
                  className="relative flex flex-col items-center space-y-1 text-center group"
                >
                  <div className="relative">
                    <Image
                      src={stickerUrl(sticker)}
                      width={48}
                      height={48}
                      alt={sticker.name}
                      className="object-contain w-10 h-10 transition-transform xs:w-12 xs:h-12 sm:w-14 sm:h-14 group-hover:scale-110"
                      unoptimized
                    />
                  </div>

                  {/* Clickable sticker name for download */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleDownload(sticker)}
                        disabled={downloadingIds.has(sticker.id)}
                        className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground break-all max-w-full hover:text-primary hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {downloadingIds.has(sticker.id) ? (
                          <span className="flex items-center justify-center gap-1">
                            <div className="w-2 h-2 border border-current rounded-full xs:w-3 xs:h-3 animate-spin border-t-transparent" />
                            <span className="hidden xs:inline">
                              Downloading...
                            </span>
                            <span className="xs:hidden">...</span>
                          </span>
                        ) : (
                          sticker.name
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {downloadingIds.has(sticker.id)
                          ? "Downloading..."
                          : "Click to download"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center justify-center gap-3 mt-6 xs:flex-row xs:gap-4 sm:mt-8">
                <div className="flex items-center gap-2 xs:gap-3">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-2 text-xs font-medium transition-colors border rounded-md xs:px-4 xs:py-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-2 text-xs font-medium transition-colors border rounded-md xs:px-4 xs:py-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                  >
                    Next
                  </button>
                </div>
                <span className="text-xs font-medium text-muted-foreground xs:text-sm">
                  Page {page} of {totalPages}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-8 text-center xs:py-12 sm:py-16">
            <p className="text-sm text-muted-foreground xs:text-base sm:text-lg">
              {searchQuery
                ? `No stickers found matching "${searchQuery}"`
                : "No stickers found in this server."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs underline text-primary hover:no-underline xs:text-sm"
              >
                Clear search
              </button>
            )}
          </div>
        )
      ) : (
        <NotJoined guildId={selectedGuildId} />
      )}
    </div>
  );
};

export default StickerManagementPage;
