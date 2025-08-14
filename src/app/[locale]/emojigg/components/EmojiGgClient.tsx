"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useMemo } from "react";

interface Emoji {
  id: number;
  title: string;
  image: string;
}

interface Pack {
  id: number;
  name: string;
  description: string;
  emojis: string[];
  amount: number;
  slug: string;
  tags: string[];
}

interface EmojiGgClientProps {
  emojis: Emoji[];
  packs: Pack[];
}

export default function EmojiGgClient({ emojis, packs }: EmojiGgClientProps) {
  const [activeTab, setActiveTab] = useState<"emojis" | "packs">("emojis");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentEmojiPage, setCurrentEmojiPage] = useState(1);
  const [currentPackPage, setCurrentPackPage] = useState(1);
  const [downloadingPacks, setDownloadingPacks] = useState<Set<number>>(
    new Set()
  );

  const ITEMS_PER_PAGE = 50;

  // Filter emojis based on search term
  const filteredEmojis = useMemo(() => {
    if (!searchTerm) return emojis;
    return emojis.filter((emoji) =>
      emoji.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [emojis, searchTerm]);

  // Filter packs based on search term
  const filteredPacks = useMemo(() => {
    if (!searchTerm) return packs;
    return packs.filter(
      (pack) =>
        pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pack.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pack.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [packs, searchTerm]);

  // Paginated data
  const paginatedEmojis = useMemo(() => {
    const startIndex = (currentEmojiPage - 1) * ITEMS_PER_PAGE;
    return filteredEmojis.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEmojis, currentEmojiPage]);

  const paginatedPacks = useMemo(() => {
    const startIndex = (currentPackPage - 1) * ITEMS_PER_PAGE;
    return filteredPacks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPacks, currentPackPage]);

  // Calculate total pages
  const totalEmojiPages = Math.ceil(filteredEmojis.length / ITEMS_PER_PAGE);
  const totalPackPages = Math.ceil(filteredPacks.length / ITEMS_PER_PAGE);

  // Reset pagination when search term changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentEmojiPage(1);
    setCurrentPackPage(1);
  };

  // Reset pagination when tab changes
  const handleTabChange = (tab: "emojis" | "packs") => {
    setActiveTab(tab);
    setCurrentEmojiPage(1);
    setCurrentPackPage(1);
  };

  const downloadPack = async (pack: Pack) => {
    if (downloadingPacks.has(pack.id)) return;

    setDownloadingPacks((prev) => {
      const newSet = new Set(prev);
      newSet.add(pack.id);
      return newSet;
    });

    try {
      // Create a download for the pack by creating a zip-like structure
      const packData = {
        name: pack.name,
        description: pack.description,
        emojis: pack.emojis,
        amount: pack.amount,
        tags: pack.tags,
        downloadedAt: new Date().toISOString(),
        emojiUrls: pack.emojis.map(
          (emoji) => `https://emoji.gg/assets/emoji/${emoji}`
        ),
      };

      const dataStr = JSON.stringify(packData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${pack.name
        .replace(/[^a-z0-9\s]/gi, "_")
        .toLowerCase()
        .replace(/\s+/g, "_")}_pack.json`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      // Clean up
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    } finally {
      setDownloadingPacks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(pack.id);
        return newSet;
      });
    }
  };

  return (
    <div className="container py-10 mx-auto">
      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="flex border-b border-border">
          <button
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === "emojis"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => handleTabChange("emojis")}
          >
            Emojis
          </button>
          <button
            className={`px-4 py-2 border-b-2 font-medium ml-4 transition-colors ${
              activeTab === "packs"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => handleTabChange("packs")}
          >
            Packs
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
          />
          <svg
            className="absolute w-4 h-4 transform -translate-y-1/2 text-muted-foreground left-3 top-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Emojis Section */}
      {activeTab === "emojis" && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">
            Individual Emojis
            {searchTerm && (
              <span className="ml-2 text-lg font-normal text-muted-foreground">
                - Found {filteredEmojis.length} result
                {filteredEmojis.length !== 1 ? "s" : ""}
              </span>
            )}
          </h2>
          {filteredEmojis.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No emojis found matching your search.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {paginatedEmojis.map((emoji: any, index: number) => (
                  <div
                    key={index}
                    className="p-3 text-center transition-shadow border rounded-lg border-border bg-card hover:shadow-md"
                  >
                    <img
                      src={emoji.image}
                      alt={emoji.title}
                      className="object-contain w-16 h-16 mx-auto"
                      loading="lazy"
                    />
                    <p
                      className="mt-2 text-sm truncate text-card-foreground"
                      title={emoji.title}
                    >
                      {emoji.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* Emoji Pagination */}
              {totalEmojiPages > 1 && (
                <div className="flex items-center justify-center mt-8 space-x-2">
                  <button
                    onClick={() =>
                      setCurrentEmojiPage(Math.max(1, currentEmojiPage - 1))
                    }
                    disabled={currentEmojiPage === 1}
                    className="px-3 py-2 text-sm border rounded-md border-border bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                  >
                    Previous
                  </button>

                  <span className="px-3 py-2 text-sm text-muted-foreground">
                    Page {currentEmojiPage} of {totalEmojiPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentEmojiPage(
                        Math.min(totalEmojiPages, currentEmojiPage + 1)
                      )
                    }
                    disabled={currentEmojiPage === totalEmojiPages}
                    className="px-3 py-2 text-sm border rounded-md border-border bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* Packs Section */}
      {activeTab === "packs" && (
        <section>
          <h2 className="mb-6 text-2xl font-bold">
            Emoji Packs
            {searchTerm && (
              <span className="ml-2 text-lg font-normal text-muted-foreground">
                - Found {filteredPacks.length} result
                {filteredPacks.length !== 1 ? "s" : ""}
              </span>
            )}
          </h2>
          {filteredPacks.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No packs found matching your search.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedPacks.map((pack: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 transition-shadow border rounded-lg border-border bg-card hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        className="text-lg font-semibold truncate text-card-foreground"
                        title={pack.name}
                      >
                        {pack.name}
                      </h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {pack.amount} emojis
                      </span>
                    </div>

                    <p className="mb-3 overflow-hidden text-sm text-muted-foreground text-ellipsis">
                      {pack.description.length > 100
                        ? `${pack.description.substring(0, 100)}...`
                        : pack.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {pack.tags
                        .slice(0, 3)
                        .map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      {pack.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{pack.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Preview of first few emojis */}
                    <div className="mb-3">
                      <div className="grid grid-cols-4 gap-2">
                        {pack.emojis
                          .slice(0, 4)
                          .map((emojiName: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-center justify-center rounded bg-muted aspect-square"
                            >
                              <img
                                src={`https://emoji.gg/assets/emoji/${emojiName}`}
                                alt={emojiName}
                                className="object-contain w-8 h-8"
                                loading="lazy"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display =
                                    "none";
                                }}
                              />
                            </div>
                          ))}
                      </div>
                      {pack.amount > 4 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          and {pack.amount - 4} more emojis...
                        </p>
                      )}
                    </div>

                    {/* Download Button */}
                    <Button
                      onClick={() => downloadPack(pack)}
                      className="w-full"
                      disabled={downloadingPacks.has(pack.id)}
                    >
                      {downloadingPacks.has(pack.id) ? (
                        <>
                          <svg
                            className="w-4 h-4 mr-2 animate-spin"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Download Pack
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>

              {/* Pack Pagination */}
              {totalPackPages > 1 && (
                <div className="flex items-center justify-center mt-8 space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPackPage(Math.max(1, currentPackPage - 1))
                    }
                    disabled={currentPackPage === 1}
                    className="px-3 py-2 text-sm border rounded-md border-border bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                  >
                    Previous
                  </button>

                  <span className="px-3 py-2 text-sm text-muted-foreground">
                    Page {currentPackPage} of {totalPackPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPackPage(
                        Math.min(totalPackPages, currentPackPage + 1)
                      )
                    }
                    disabled={currentPackPage === totalPackPages}
                    className="px-3 py-2 text-sm border rounded-md border-border bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}
