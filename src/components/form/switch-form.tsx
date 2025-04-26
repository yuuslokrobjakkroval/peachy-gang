import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export type SwitchFormProps = {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: any;
  };
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export const SwitchForm = forwardRef<HTMLDivElement, SwitchFormProps>(
  ({ control, checked, onChange, className }, ref) => {
    return (
      <Card className="p-4" ref={ref}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
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
            <Switch
              id={control.id}
              checked={checked}
              onCheckedChange={onChange}
              className={className}
            />
          </div>
          {control.error && (
            <p className="text-sm text-red-500 mt-2">{control.error}</p>
          )}
        </div>
      </Card>
    );
  },
);

SwitchForm.displayName = "SwitchForm";
