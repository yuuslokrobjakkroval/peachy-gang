import React, { forwardRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Button } from "../ui/button";

export type TagsInputFormProps = {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: string;
  };
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
};

export const TagsInputForm = forwardRef<HTMLInputElement, TagsInputFormProps>(
  (
    {
      control,
      value = [],
      onChange,
      placeholder = "Add a tag and press Enter...",
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        onChange?.([...value, inputValue.trim()]);
        setInputValue("");
      }
    };

    const removeTag = (tag: string) => {
      onChange?.(value.filter((t) => t !== tag));
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
            <p className="text-sm text-muted-foreground">
              {control.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2 p-2 border rounded-md">
            {value.map((tag) => (
              <span
                key={tag}
                className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
              >
                {tag}
                <Button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 focus:outline-none"
                >
                  <X className="h-4 w-4" />
                </Button>
              </span>
            ))}
            <Input
              id={control.id}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 border-none p-0 focus:ring-0"
              ref={ref}
              {...props}
            />
          </div>
          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  },
);

TagsInputForm.displayName = "TagsInputForm";
