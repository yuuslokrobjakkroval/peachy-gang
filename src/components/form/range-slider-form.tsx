import React, { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export type RangeSliderFormProps = {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: string;
  };
  min?: number;
  max?: number;
  step?: number;
  value?: number[];
  onChange?: (value: number[]) => void;
};

export const RangeSliderForm = forwardRef<HTMLDivElement, RangeSliderFormProps>(
  (
    {
      control,
      min = 0,
      max = 100,
      step = 1,
      value = [min],
      onChange,
      ...props
    },
    ref,
  ) => {
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
          <Slider
            id={control.id}
            min={min}
            max={max}
            step={step}
            value={value}
            onValueChange={onChange}
            className="w-full"
            ref={ref}
            {...props}
          />
          <div className="text-sm text-gray-600">
            Value: {value.join(" - ")}
          </div>
          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  },
);

RangeSliderForm.displayName = "RangeSliderForm";
