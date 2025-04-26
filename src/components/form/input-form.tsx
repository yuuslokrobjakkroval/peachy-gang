import React, { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type InputFormProps = React.InputHTMLAttributes<HTMLInputElement> & {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: string;
  };
};

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ control, ...props }, ref) => {
    return (
      <Card className="p-4">
        <div className="space-y-2">
          <Label htmlFor={control.id} className="text-sm font-medium">
            {control.label}
          </Label>
          {control.description && (
            <p className="text-sm text-muted-foreground">
              {control.description}
            </p>
          )}
          <Input id={control.id} ref={ref} {...props} />
          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  },
);

InputForm.displayName = "InputForm";
