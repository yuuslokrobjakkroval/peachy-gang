import React, { forwardRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

export type MultiSelectFormProps = {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: string;
  };
  options: { value: string; label: string }[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
};

export const MultiSelectForm = forwardRef<
  HTMLSelectElement,
  MultiSelectFormProps
>(
  (
    {
      control,
      options,
      value = [],
      onChange,
      placeholder = "Select options",
      ...props
    },
    ref
  ) => {
    const [history, setHistory] = useState<string[][]>([value]);
    const [historyIndex, setHistoryIndex] = useState(0);

    useEffect(() => {
      if (JSON.stringify(history[historyIndex]) !== JSON.stringify(value)) {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(value);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }, [value]);

    const handleValueChange = (newValue: string) => {
      if (value.includes(newValue)) {
        onChange?.(value.filter((v) => v !== newValue));
      } else {
        onChange?.([...value, newValue]);
      }
    };

    const undo = () => {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        onChange?.(history[newIndex]);
      }
    };

    const redo = () => {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        onChange?.(history[newIndex]);
      }
    };

    return (
      <Card className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label
              htmlFor={control.id}
              className="text-lg font-semibold text-primary"
            >
              {control.label}
            </Label>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={historyIndex === 0}
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={historyIndex === history.length - 1}
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {control.description && (
            <p className="text-sm text-muted-foreground">
              {control.description}
            </p>
          )}
          <Select onValueChange={handleValueChange} {...props}>
            <SelectTrigger id={control.id} className="w-full">
              <SelectValue placeholder={placeholder}>
                {value.length > 0
                  ? value
                      .map(
                        (val) => options.find((opt) => opt.value === val)?.label
                      )
                      .filter(Boolean)
                      .join(", ")
                  : placeholder}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options.length === 0 ? (
                <SelectItem value="" disabled>
                  No options available
                </SelectItem>
              ) : (
                options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <Input
                        type="checkbox"
                        checked={value.includes(option.value)}
                        readOnly
                        className="mr-2"
                      />
                      {option.label}
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  }
);

MultiSelectForm.displayName = "MultiSelectForm";
