import React, { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export type InputFormProps = {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: string;
    tooltip?: string;
  };
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
};

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ control, value = "", onChange, placeholder, type = "text", ...props }, ref) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <Card className="p-4">
        <div className="space-y-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label
                  htmlFor={control.id}
                  className="text-lg font-semibold text-primary cursor-help"
                >
                  {control.label}
                </Label>
              </TooltipTrigger>
              {control.tooltip && (
                <TooltipContent>
                  <p>{control.tooltip}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          {control.description && (
            <p className="text-sm text-muted-foreground">
              {control.description}
            </p>
          )}
          <Input
            id={control.id}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  }
);

InputForm.displayName = "InputForm";