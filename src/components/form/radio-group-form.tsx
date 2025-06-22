import React, { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type RadioGroupFormProps = {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: string;
  };
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  layout?: "row" | "column";
};

export const RadioGroupForm = forwardRef<HTMLDivElement, RadioGroupFormProps>(
  ({ control, options, value, onChange, layout = "column", ...props }, ref) => {
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
          <RadioGroup
            id={control.id}
            value={value}
            onValueChange={onChange}
            className={`flex ${layout === "row" ? "flex-row space-x-4" : "flex-col space-y-2"}`}
            ref={ref}
            aria-labelledby={`${control.id}-label`}
            {...props}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${control.id}-${option.value}`}
                  aria-label={option.label}
                />
                <Label
                  htmlFor={`${control.id}-${option.value}`}
                  className="text-sm font-medium"
                >
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
  },
);

RadioGroupForm.displayName = "RadioGroupForm";
