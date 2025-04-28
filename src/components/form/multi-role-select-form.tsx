import React, { forwardRef } from "react";
import { useGetGuildRolesQuery } from "@/redux/api/guild";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/loading/spinner";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Role, roleIconUrl } from "@/utils/common";
import { User, Check } from "lucide-react";
import Image from "next/image";

interface RoleSelectFormProps {
  control: {
    id: string;
    label: string;
    error?: string | null;
  };
  guild: string;
  value: string[];
  onChange: (value: string[]) => void;
  description?: string;
  className?: string;
}

export const MultiRoleSelectForm = forwardRef<
  HTMLDivElement,
  RoleSelectFormProps
>(({ control, guild, value, onChange, description, className }, ref) => {
  const { data: roles = [], isLoading, isError } = useGetGuildRolesQuery(guild);

  const options: Role[] =
    roles?.filter((role: Role) => role.name !== "@everyone" && !role.tags) ||
    [];

  const handleChange = (selectedValue: string) => {
    if (selectedValue === "no-roles") return;
    const newValues = value.includes(selectedValue)
      ? value.filter((v) => v !== selectedValue)
      : [...value, selectedValue];
    onChange(newValues);
  };

  if (isError) {
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

        <div className="relative">
          <Command className="border rounded-md">
            <CommandInput
              placeholder="Select roles"
              className={value.length > 0 ? "" : "text-muted-foreground"}
              disabled={isLoading || options.length === 0}
            />
            <CommandList className="max-h-45 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center p-2">
                  <Spinner variant="ellipsis" className="h-4 w-4" />
                </div>
              ) : (
                <>
                  <CommandEmpty>No roles available</CommandEmpty>
                  <CommandGroup>
                    {options.map((option: Role) => (
                      <CommandItem
                        key={option.id}
                        value={option.id}
                        onSelect={() => handleChange(option.id)}
                        className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-md cursor-pointer"
                      >
                        {roleIconUrl(option) ? (
                          <Image
                            className="rounded-full"
                            src={roleIconUrl(option)}
                            alt={option.name}
                            width={24}
                            height={24}
                          />
                        ) : (
                          <User className="h-6 w-6 text-muted-foreground" />
                        )}
                        <span
                          className={
                            value.includes(option.id)
                              ? "text-primary font-semibold"
                              : ""
                          }
                        >
                          {option.name}
                        </span>
                        {value.includes(option.id) && (
                          <Check className="ml-auto h-4 w-4 text-primary" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
          {/* Display selected roles below the Command input */}
          {value.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {options
                .filter((option: Role) => value.includes(option.id))
                .map((option: Role) => (
                  <span
                    key={option.id}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {option.name}
                    <button
                      type="button" // Prevent form submission
                      onClick={() => handleChange(option.id)}
                      className="ml-1 text-primary hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
            </div>
          )}
        </div>

        {control.error && (
          <p className="pl-1 text-sm text-red-500">{control.error}</p>
        )}
      </div>
    </Card>
  );
});

MultiRoleSelectForm.displayName = "MultiRoleSelectForm";
