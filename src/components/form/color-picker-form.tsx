import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export type ColorPickerFormProps = {
  control: {
    id: string;
    label: string;
    error?: string;
    description?: string;
  };
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const ColorPickerForm = forwardRef<HTMLDivElement, ColorPickerFormProps>(
  ({ control, value, onChange, className }, ref) => {
    return (
      <Card className="p-4" ref={ref}>
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
          <input
            type="color"
            id={control.id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-12 h-12 p-0 border-none ${className}`}
          />
          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  },
);

ColorPickerForm.displayName = "ColorPickerForm";
