"use client";

import React, { useEffect, useState } from "react";
import { usePeachy } from "@/contexts/peachy";
import {
  emojiUrl,
  iconUrl,
  PermissionFlags,
  toCapitalCase,
} from "@/utils/common";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LimelightGuild } from "@/components/limelight-guild";
import { useGetGuildInfoQuery, useGetGuildEmojiQuery } from "@/redux/api/guild";
import Image from "next/image";
import Loading from "@/components/loading/circle";
import NotJoined from "@/components/modules/guilds/not-join";
import { Search, X } from "lucide-react";

const EmojiManagementPage = () => {
  const { guilds } = usePeachy();
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const emojisPerPage = 50;

  // Download handler function
  const handleDownload = async (emoji: any) => {
    setDownloadingIds((prev) => new Set(prev).add(emoji.id));

    try {
      const url = emojiUrl(emoji);

      // Add CORS headers if needed
      const response = await fetch(url, {
        mode: "cors",
        credentials: "omit",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch emoji");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      // Get file extension from URL or default to png
      const urlParts = url.split(".");
      const extension = urlParts[urlParts.length - 1]?.split("?")[0] || "png";

      // Clean emoji name for filename
      const cleanName = emoji.name.replace(/[^a-zA-Z0-9_-]/g, "_");

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
      const cleanName = emoji.name.replace(/[^a-zA-Z0-9_-]/g, "_");
      const link = document.createElement("a");
      link.href = emojiUrl(emoji);
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
        newSet.delete(emoji.id);
        return newSet;
      });
    }
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

  const { data: emojis = [], isLoading: isEmojiLoading } =
    useGetGuildEmojiQuery(selectedGuildId);

  // Ensure emojis is an array and filter based on search query
  const emojiArray = Array.isArray(emojis) ? emojis : [];
  const filteredEmojis = emojiArray.filter((emoji: any) =>
    emoji.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Clear search when switching guilds
  const handleGuildChange = (guildId: string) => {
    setSelectedGuildId(guildId);
    setPage(1);
    setSearchQuery("");
  };

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (!selectedGuildId) {
      const filtered = Array.isArray(guilds)
        ? [...guilds]?.sort((a, b) => a.name.localeCompare(b.name))
        : [];
      setSelectedGuildId(filtered?.[0]?.id ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGuildId]);

  const paginatedEmojis = filteredEmojis.slice(
    (page - 1) * emojisPerPage,
    page * emojisPerPage
  );
  const totalPages = Math.ceil(filteredEmojis.length / emojisPerPage);

  if (isGuildLoading || isEmojiLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[50vh] px-4">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-sm text-muted-foreground xs:text-base">
            Loading emojis...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-3 py-4 mx-auto overflow-x-hidden xs:px-4 sm:px-6 lg:px-8 xs:py-6 sm:py-8 lg:py-10 max-w-7xl">
      <h1 className="mb-4 text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
        Emoji Management :{" "}
        <span className="text-primary">
          {guild?.name} {filteredEmojis?.length ?? 0} Emojis
          {searchQuery && (
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              (filtered from {emojiArray?.length ?? 0})
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
            placeholder="Search emojis..."
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
        filteredEmojis?.length > 0 ? (
          <>
            <div className="grid grid-cols-4 gap-2 mb-4 xs:grid-cols-5 xs:gap-3 sm:grid-cols-6 sm:gap-4 md:grid-cols-8 md:gap-5 lg:grid-cols-10 lg:gap-6 xl:grid-cols-12 xl:gap-8">
              {paginatedEmojis.map((emoji: any) => (
                <div
                  key={emoji.id}
                  className="relative flex flex-col items-center space-y-1 text-center group"
                >
                  <div className="relative">
                    <Image
                      src={emojiUrl(emoji)}
                      alt={emoji.name}
                      width={48}
                      height={48}
                      unoptimized
                      className="object-contain w-8 h-8 transition-transform xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 group-hover:scale-110"
                    />
                  </div>

                  {/* Clickable emoji name for download */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleDownload(emoji)}
                        disabled={downloadingIds.has(emoji.id)}
                        className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-muted-foreground break-all max-w-full hover:text-primary hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed leading-tight"
                      >
                        {downloadingIds.has(emoji.id) ? (
                          <span className="flex items-center justify-center gap-1">
                            <div className="w-2 h-2 border border-current rounded-full xs:w-3 xs:h-3 animate-spin border-t-transparent" />
                            <span className="hidden xs:inline">
                              Downloading...
                            </span>
                            <span className="xs:hidden">...</span>
                          </span>
                        ) : (
                          <span className="block px-1 truncate">
                            {toCapitalCase(emoji.name)}
                          </span>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {downloadingIds.has(emoji.id)
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
                ? `No emojis found matching "${searchQuery}"`
                : "No emojis found in this server."}
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

export default EmojiManagementPage;
