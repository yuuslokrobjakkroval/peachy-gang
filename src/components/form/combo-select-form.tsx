"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export type ComboSelectFormProps = {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: string;
  };
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export const ComboSelectForm = React.forwardRef<
  HTMLButtonElement,
  ComboSelectFormProps
>(
  (
    {
      control,
      options,
      value = "",
      onChange,
      placeholder = "Select an option",
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
                ref={ref}
                id={control.id}
                {...props}
              >
                {value
                  ? options.find((option) => option.value === value)?.label
                  : placeholder}
                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search options..." />
                <CommandList>
                  <CommandEmpty>No options found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          const newValue =
                            currentValue === value ? "" : currentValue;
                          onChange?.(newValue);
                          setOpen(false);
                        }}
                      >
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 256 256"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                          strokeWidth="0.25"
                          className={cn(
                            "mr-2 size-6",
                            value === option.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                          aria-label="check"
                        >
                          <rect
                            x="80"
                            y="128"
                            width="14"
                            height="14"
                            rx="1"
                            transform="rotate(90 80 128)"
                          ></rect>
                          <rect
                            x="96"
                            y="144"
                            width="14"
                            height="14"
                            rx="1"
                            transform="rotate(90 96 144)"
                          ></rect>
                          <rect
                            x="112"
                            y="160"
                            width="14"
                            height="14"
                            rx="1"
                            transform="rotate(90 112 160)"
                          ></rect>
                          <rect
                            x="128"
                            y="144"
                            width="14"
                            height="14"
                            rx="1"
                            transform="rotate(90 128 144)"
                          ></rect>
                          <rect
                            x="144"
                            y="128"
                            width="14"
                            height="14"
                            rx="1"
                            transform="rotate(90 144 128)"
                          ></rect>
                          <rect
                            x="160"
                            y="112"
                            width="14"
                            height="14"
                            rx="1"
                            transform="rotate(90 160 112)"
                          ></rect>
                          <rect
                            x="176"
                            y="96"
                            width="14"
                            height="14"
                            rx="1"
                            transform="rotate(90 176 96)"
                          ></rect>
                          <rect
                            x="192"
                            y="80"
                            width="14"
                            height="14"
                            rx="1"
                            transform="rotate(90 192 80)"
                          ></rect>
                        </svg>
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  },
);

ComboSelectForm.displayName = "ComboSelectForm";
