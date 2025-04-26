import React, { useRef, forwardRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePeachy } from "@/context/peachy";
import { useGetGuildEmojiQuery } from "@/redux/api/guild";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/loading/spinner";
import { FaRegHeart } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { emojiUrl } from "@/utils/common";

export type TextAreaFormProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    control: {
      id: string;
      label: string;
      description?: string;
      error?: any;
    };
    enableEmoji: boolean;
  };

export const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaFormProps>(
  ({ control, enableEmoji, ...props }, ref) => {
    const { guildId } = usePeachy();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const emojisPerPage = 20;
    const emojisPerRow = 4;
    const { data: emojis, isLoading } = useGetGuildEmojiQuery(guildId);

    const filteredEmojis = emojis
      ? emojis.filter((emoji: any) =>
          emoji.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

    const totalPages =
      filteredEmojis.length > 0
        ? Math.ceil(filteredEmojis.length / emojisPerPage)
        : 0;

    const startIndex = (currentPage - 1) * emojisPerPage;
    const currentPageEmojis = filteredEmojis.slice(
      startIndex,
      startIndex + emojisPerPage,
    );
    const displayCurrentPage = totalPages > 0 ? currentPage : 0;
    const displayTotalPages = totalPages > 0 ? totalPages : 0;

    const handleEmojiClick = (emoji: any) => {
      let emojiIdentifier = "";
      if (emoji.identifier.startsWith("a")) {
        emojiIdentifier = `<${emoji.identifier}>`;
      } else {
        emojiIdentifier = `<:${emoji.identifier}>`;
      }
      const inputElement = inputRef.current;
      const cursorPosition = inputElement?.selectionStart || 0;
      setTimeout(() => {
        if (inputElement) {
          inputElement.selectionStart = cursorPosition + emojiIdentifier.length;
          inputElement.selectionEnd = cursorPosition + emojiIdentifier.length;
        }
      }, 0);
      setSearchQuery("");
      setIsPopoverOpen(false);
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    if (isLoading) {
      return <Spinner variant="circle" />;
    }

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
            <p className="text-sm text-muted-foreground">
              {control.description}
            </p>
          )}
          <div className="relative">
            <Textarea className="pr-10" id={control.id} ref={ref} {...props} />
            {enableEmoji && (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="absolute right-1 top-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                      aria-label="Pick an emoji"
                    >
                      <FaRegHeart className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4">
                  <div className="space-y-3">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for emoji"
                      className="mb-3"
                    />
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {currentPageEmojis.map((emoji: any) => (
                        <Button
                          key={emoji.id}
                          variant="ghost"
                          size="sm"
                          className="w-16 h-16"
                          onClick={() => handleEmojiClick(emoji)}
                        >
                          <img
                            src={emojiUrl(emoji)}
                            alt={emoji.name}
                            className="object-contain"
                          />
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-4">
                      <Button
                        onClick={handlePrevPage}
                        disabled={displayCurrentPage <= 1}
                        variant="outline"
                        size="sm"
                      >
                        Previous
                      </Button>
                      <span className="text-sm">
                        {displayCurrentPage} / {displayTotalPages}
                      </span>
                      <Button
                        onClick={handleNextPage}
                        disabled={displayCurrentPage === displayTotalPages}
                        variant="outline"
                        size="sm"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
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
  },
);

TextAreaForm.displayName = "TextAreaForm";
