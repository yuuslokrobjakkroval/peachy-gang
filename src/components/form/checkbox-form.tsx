import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CheckBox } from "@/components/ui/checkbox";

export type CheckboxFormProps = {
  control: {
    id: string;
    label: string;
    error?: string;
    description?: string;
  };
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export const CheckboxForm = forwardRef<HTMLDivElement, CheckboxFormProps>(
  ({ control, checked, onChange, className }, ref) => {
    return (
      <Card className="p-4" ref={ref}>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <CheckBox
              id={control.id}
              checked={checked}
              onCheckedChange={onChange}
              className="text-primary"
            />
            <div>
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
            </div>
          </div>
          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  },
);

CheckboxForm.displayName = "CheckboxForm";
