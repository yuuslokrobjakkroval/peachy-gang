// app/components/form/role-select-form.tsx
import React, { useMemo, forwardRef } from "react";
import { useGetGuildRolesQuery } from "@/redux/api/guild";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/loading/spinner";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface Role {
  id: string;
  name: string;
}

interface RoleSelectFormProps {
  control: {
    id: string;
    label: string;
    error?: any;
  };
  guild: string;
  value: string[];
  onChange: (value: string[]) => void;
  description?: string;
  className?: string;
}

export const RoleSelectForm = forwardRef<HTMLDivElement, RoleSelectFormProps>(
  ({ control, guild, value, onChange, description, className }, ref) => {
    const {
      data: roles = [],
      isLoading,
      error: queryError,
    } = useGetGuildRolesQuery(guild);

    const options = useMemo(
      (): { label: string; value: string }[] =>
        roles.map((role: Role) => ({
          label: role.name,
          value: role.id,
        })),
      [roles]
    );

    if (queryError) {
      toast.error("Failed to load roles");
      return <div className="text-red-400">Error loading roles</div>;
    }

    // Handle multi-select changes
    const handleChange = (selectedValue: string) => {
      // Skip if the selected value is the placeholder
      if (selectedValue === "no-roles") return;
      const newValues = value.includes(selectedValue)
        ? value.filter((v) => v !== selectedValue)
        : [...value, selectedValue];
      onChange(newValues);
    };

    return (
      <Card className="p-4" ref={ref}>
        <div className="space-y-2">
          <Label
            htmlFor={control.id}
            className="text-lg font-semibold text-primary"
          >
            {control.label}
          </Label>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}

          <Select
            onValueChange={handleChange}
            disabled={isLoading || options.length === 0}
          >
            <SelectTrigger id={control.id} className={className}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner variant="circle" className="h-4 w-4" />
                </div>
              ) : (
                <SelectValue
                  placeholder="Select roles"
                  className={value.length > 0 ? "" : "text-muted-foreground"}
                >
                  {value.length > 0
                    ? options
                        .filter((opt) => value.includes(opt.value))
                        .map((opt) => opt.label)
                        .join(", ")
                    : options.length === 0
                      ? "No roles available"
                      : "Select roles"}
                </SelectValue>
              )}
            </SelectTrigger>
            <SelectContent className="bg-card border rounded-md shadow-lg max-h-60 overflow-y-auto">
              {options.length === 0 ? (
                <div className="p-2 text-muted-foreground text-sm">
                  No roles available
                </div>
              ) : (
                options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-md"
                  >
                    <span
                      className={
                        value.includes(option.value)
                          ? "text-primary font-semibold"
                          : ""
                      }
                    >
                      {option.label}
                    </span>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  }
);

RoleSelectForm.displayName = "RoleSelectForm";
