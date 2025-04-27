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
  value: string;
  onChange: (value: string) => void;
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

          <Select value={value} onValueChange={onChange}>
            <SelectTrigger id={control.id} className={className}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner variant="circle" className="h-4 w-4" />
                  <span>Loading...</span>
                </div>
              ) : (
                <SelectValue placeholder="Select a channel" />
              )}
            </SelectTrigger>
            <SelectContent className="bg-card border rounded-md shadow-lg max-h-60 overflow-y-auto">
              {options.length === 0 ? (
                <SelectItem value="" disabled>
                  No roles available
                </SelectItem>
              ) : (
                options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-md"
                  >
                    {option.label}
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
