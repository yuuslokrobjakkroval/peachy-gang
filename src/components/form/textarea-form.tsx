import React, {
  useRef,
  forwardRef,
  useState,
  useImperativeHandle,
} from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePeachy } from "@/contexts/peachy";
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
import Image from "next/image";

export type TextAreaFormProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    control: {
      id: string;
      label: string;
      description?: string;
      error?: any;
    };
    enableEmoji: boolean;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Add onChange prop
    value?: string; // Add value prop for controlled component
  };

export const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaFormProps>(
  ({ control, enableEmoji, onChange, value, ...props }, ref) => {
    const { guildId } = usePeachy();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const emojisPerPage = 20;
    const { data: emojis, isLoading } = useGetGuildEmojiQuery(guildId);

    // Expose the inputRef to the parent via ref
    useImperativeHandle(ref, () => inputRef.current!);

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
      const emojiIdentifier = emoji.identifier.startsWith("a")
        ? `<${emoji.identifier}>`
        : `<:${emoji.identifier}>`;
      const inputElement = inputRef.current;

      if (inputElement && value !== undefined) {
        const cursorPosition = inputElement.selectionStart || 0;
        const newValue =
          value.slice(0, cursorPosition) +
          emojiIdentifier +
          value.slice(cursorPosition);
        inputElement.value = newValue; // Update the input value directly

        // Trigger onChange to update the form state
        if (onChange) {
          const syntheticEvent = {
            target: { value: newValue, id: control.id },
          } as React.ChangeEvent<HTMLTextAreaElement>;
          onChange(syntheticEvent);
        }

        // Update cursor position
        setTimeout(() => {
          if (inputElement) {
            inputElement.selectionStart =
              cursorPosition + emojiIdentifier.length;
            inputElement.selectionEnd = cursorPosition + emojiIdentifier.length;
            inputElement.focus();
          }
        }, 0);
      }

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
            <Textarea
              className="pr-10"
              id={control.id}
              ref={inputRef}
              value={value} // Controlled component
              onChange={(e) => onChange && onChange(e)} // Pass onChange to parent
              {...props}
            />
            {enableEmoji && (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
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
                          key={emoji.name}
                          variant="ghost"
                          size="sm"
                          className="w-16 h-16"
                          onClick={() => handleEmojiClick(emoji)}
                        >
                          <Image
                            key={emoji.id}
                            src={emojiUrl(emoji)}
                            alt={emoji.name || "Emoji"}
                            width={128}
                            height={128}
                            className="object-contain"
                            onError={(e) =>
                              (e.currentTarget.src = "/fallback-emoji.png")
                            }
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
