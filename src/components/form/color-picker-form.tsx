import React, { forwardRef, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HexAlphaColorPicker, HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import { useForwardedRef } from "@/lib/use-forwarded-ref";

export type ColorPickerFormProps = {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: string;
  };
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  supportAlpha?: boolean;
};

export const ColorPickerForm = forwardRef<
  HTMLInputElement,
  ColorPickerFormProps
>(
  (
    {
      control,
      value,
      onChange,
      onBlur,
      supportAlpha = false,
      disabled,
      className,
      name,
    },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [inputValue, setInputValue] = useState(value || "#FFFFFF");

    const parsedValue = useMemo(() => inputValue || "#FFFFFF", [inputValue]);

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);

      const hexPattern = supportAlpha
        ? /^#([0-9A-F]{8}|[0-9A-F]{4})$/i
        : /^#([0-9A-F]{6}|[0-9A-F]{3})$/i;

      if (hexPattern.test(val)) {
        onChange(val);
      }
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            <div className="flex flex-col gap-2">
              {supportAlpha ? (
                <HexAlphaColorPicker
                  color={parsedValue}
                  onChange={(color) => {
                    setInputValue(color);
                    onChange(color);
                  }}
                />
              ) : (
                <HexColorPicker
                  color={parsedValue}
                  onChange={(color) => {
                    setInputValue(color);
                    onChange(color);
                  }}
                />
              )}
              <Input
                id={`${control.id}-hex`}
                ref={ref}
                name={name}
                value={inputValue}
                onChange={handleHexChange}
                onBlur={onBlur}
                placeholder={supportAlpha ? "#RRGGBBAA" : "#RRGGBB"}
                maxLength={supportAlpha ? 9 : 7}
                disabled={disabled}
              />
            </div>
          </div>

          {control.error && (
            <p className="text-sm text-red-500 pl-1">{control.error}</p>
          )}
        </div>
      </Card>
    );
  }
);

ColorPickerForm.displayName = "ColorPickerForm";
