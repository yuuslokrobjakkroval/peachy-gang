import React, { forwardRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export type DatePickerFormProps = {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: string;
  };
  value?: string;
  onChange?: (value: string) => void;
  theme?: "default" | "ghibli";
};

export const DatePickerForm = forwardRef<HTMLInputElement, DatePickerFormProps>(
  ({ control, value, onChange, theme = "default", ...props }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const ghibliStyles =
      theme === "ghibli"
        ? {
            card: `bg-gradient-to-br from-green-100 to-blue-100 border-none shadow-md transform transition-all duration-500 ${
              isMounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`,
            label: "text-green-800 font-handwritten animate-twinkle",
          }
        : {
            card: "",
            label: "text-primary",
          };

    return (
      <Card className={`p-4 ${ghibliStyles.card}`}>
        <div className="space-y-2">
          <Label
            htmlFor={control.id}
            className={`text-lg font-semibold ${ghibliStyles.label}`}
          >
            {control.label}
          </Label>
          {control.description && (
            <p className="text-sm text-muted-foreground">
              {control.description}
            </p>
          )}
          <Input
            id={control.id}
            type="date"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full"
            ref={ref}
            {...props}
          />
          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  },
);

DatePickerForm.displayName = "DatePickerForm";
