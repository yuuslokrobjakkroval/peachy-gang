"use client";

import React, {
  useRef,
  forwardRef,
  useState,
  useImperativeHandle,
  useMemo,
} from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/loading/spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaRegHeart } from "react-icons/fa6";
import Image from "next/image";
import { emojiUrl, PermissionFlags } from "@/utils/common";
import { useGetGuildEmojiQuery } from "@/redux/api/guild";
import { usePeachy } from "@/contexts/peachy";

export type TextAreaWithServerEmojiProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    control: {
      id: string;
      label: string;
      description?: string;
      error?: any;
    };
    enableEmoji: boolean;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
  };

export const TextAreaWithServerEmoji = forwardRef<
  HTMLTextAreaElement,
  TextAreaWithServerEmojiProps
>(({ control, enableEmoji, onChange, value, ...props }, ref) => {
  const { guilds, guildId } = usePeachy();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(
    guildId,
  );

  const emojisPerPage = 30;

  const {
    data: emojis = [],
    isSuccess,
    isLoading: loadingEmojis,
  } = useGetGuildEmojiQuery(selectedGuildId || "", {
    skip: !selectedGuildId,
  });

  useImperativeHandle(ref, () => inputRef.current!);

  const filteredEmojis = useMemo(() => {
    if (!isSuccess || !emojis) return [];

    return emojis.filter((emoji: any) =>
      emoji.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [emojis, searchQuery, isSuccess]);

  const totalPages = Math.ceil(filteredEmojis.length / emojisPerPage);
  const displayEmojis = filteredEmojis.slice(
    (currentPage - 1) * emojisPerPage,
    currentPage * emojisPerPage,
  );

  const handleEmojiClick = (emoji: any) => {
    const emojiIdentifier = emoji.animated
      ? `<a:${emoji.name}:${emoji.id}>`
      : `<:${emoji.name}:${emoji.id}>`;

    const inputElement = inputRef.current;
    if (inputElement && value !== undefined) {
      const cursor = inputElement.selectionStart || 0;
      const newValue =
        value.slice(0, cursor) + emojiIdentifier + value.slice(cursor);
      inputElement.value = newValue;

      if (onChange) {
        const syntheticEvent = {
          target: { value: newValue, id: control.id },
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(syntheticEvent);
      }

      setTimeout(() => {
        inputElement.selectionStart = inputElement.selectionEnd =
          cursor + emojiIdentifier.length;
        inputElement.focus();
      }, 0);
    }

    setSearchQuery("");
    setIsPopoverOpen(false);
  };

  return (
    <Card className="p-4">
      <div className="space-y-2">
        <Label
          htmlFor={control.id}
          className="text-lg font-semibold text-primary"
        >
          {control.label}
        </Label>
        {control.description && (
          <p className="text-sm text-muted-foreground">{control.description}</p>
        )}
        <div className="relative">
          <Textarea
            id={control.id}
            ref={inputRef}
            value={value}
            onChange={(e) => onChange && onChange(e)}
            className="pr-10"
            {...props}
          />
          {enableEmoji && (
            <Popover open={isPopoverOpen}>
              <PopoverTrigger asChild>
                <div className="absolute right-1 top-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPopoverOpen(!isPopoverOpen);
                    }}
                    aria-label="Pick an emoji"
                  >
                    <FaRegHeart className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-4">
                {!guilds ? (
                  <Spinner variant="circle" />
                ) : (
                  <>
                    <div className="w-full mb-4 cursor-pointer">
                      <Select
                        value={selectedGuildId ?? ""}
                        onValueChange={(newValue) => {
                          setSelectedGuildId(newValue);
                          setCurrentPage(1);
                          setSearchQuery("");
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select component category" />
                        </SelectTrigger>
                        <SelectContent>
                          {guilds
                            ?.filter(
                              (guild) =>
                                (Number(guild.permissions) &
                                  PermissionFlags.ADMINISTRATOR) !==
                                0,
                            )
                            .map((guild: any) => (
                              <SelectItem key={guild.id} value={guild.id}>
                                {guild.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {loadingEmojis ? (
                      <Spinner variant="circle" />
                    ) : (
                      <>
                        <Input
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search emojis"
                          className="mb-2"
                        />
                        <div className="grid grid-cols-6 gap-2 max-h-[300px] overflow-y-auto">
                          {displayEmojis.map((emoji: any) => (
                            <Button
                              key={emoji.id}
                              variant="ghost"
                              size="sm"
                              className="w-12 h-12 p-1"
                              onClick={() => handleEmojiClick(emoji)}
                            >
                              <Image
                                src={emojiUrl(emoji)}
                                alt={emoji.name}
                                width={48}
                                height={48}
                                className="object-contain"
                                unoptimized
                              />
                            </Button>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={currentPage <= 1}
                          >
                            Previous
                          </Button>
                          <span className="text-sm">
                            {currentPage} / {totalPages || 1}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((p) => Math.min(totalPages, p + 1))
                            }
                            disabled={currentPage >= totalPages}
                          >
                            Next
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </PopoverContent>
            </Popover>
          )}
        </div>
        {control.error && (
          <p className="pl-1 text-sm text-red-500">{control.error}</p>
        )}
      </div>
    </Card>
  );
});

TextAreaWithServerEmoji.displayName = "TextAreaWithServerEmoji";
