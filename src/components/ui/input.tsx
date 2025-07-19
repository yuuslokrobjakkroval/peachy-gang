"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  className?: string;
  type?: string;
  leftIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void; // Add onClear callback
}

function Input({
  className,
  type = "text",
  leftIcon,
  clearable,
  onClear,
  ...props
}: InputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
      if (props.onChange) {
        const event = new Event("input", { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
      onClear?.();
    }
  };

  return (
    <div className="relative flex items-center">
      {leftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {leftIcon}
        </span>
      )}
      <input
        ref={inputRef}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-card px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-card file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:!shadow-destructive",
          leftIcon && "pl-10",
          clearable && props.value && "pr-10",
          className,
        )}
        {...props}
      />
      {clearable && props.value && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={handleClear}
          aria-label="Clear input"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export { Input };
