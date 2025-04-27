import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type RadioGroupFormProps = {
  control: {
    id: string;
    label: string;
    error?: string;
    description?: string;
  };
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  layout?: "row" | "column";
};

export const RadioGroupForm = forwardRef<HTMLDivElement, RadioGroupFormProps>(
  (
    { control, options, value, onChange, className, layout = "column" },
    ref
  ) => {
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
          <RadioGroup
            className={`${className} flex ${
              layout === "row" ? "flex-row gap-4" : "flex-col gap-2"
            }`}
            value={value}
            onValueChange={onChange}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem
                  id={`${control.id}-${option.value}`}
                  value={option.value}
                />
                <Label htmlFor={`${control.id}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  }
);

RadioGroupForm.displayName = "RadioGroupForm";
