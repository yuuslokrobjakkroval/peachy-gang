import React, { forwardRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export type AutocompleteFormProps = {
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

export const AutocompleteForm = forwardRef<
  HTMLButtonElement,
  AutocompleteFormProps
>(
  (
    {
      control,
      options,
      value = "",
      onChange,
      placeholder = "Search...",
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

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
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  <CommandEmpty>No options found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          onChange?.(currentValue);
                          setOpen(false);
                        }}
                      >
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

AutocompleteForm.displayName = "AutocompleteForm";
