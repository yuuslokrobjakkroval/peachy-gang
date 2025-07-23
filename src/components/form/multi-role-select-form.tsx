import React, { forwardRef, useEffect, useMemo, useState } from "react";
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
  const [searchValue, setSearchValue] = useState("");
  const { data: roles = [], isLoading, isError } = useGetGuildRolesQuery(guild);

  const options: Role[] = useMemo(
    () =>
      roles?.filter((role: Role) => role.name !== "@everyone" && !role.tags) ||
      [],
    [roles]
  );

  const filteredOptions = useMemo(() => {
    return options?.filter((role: Role) =>
      role.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

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
              disabled={isLoading || options?.length === 0}
              value={searchValue}
              onValueChange={(value) => setSearchValue(value)}
            />
            <CommandList className="overflow-y-auto max-h-45">
              {isLoading ? (
                <div className="flex items-center justify-center p-2">
                  <Spinner variant="ellipsis" className="w-4 h-4" />
                </div>
              ) : (
                <>
                  <CommandEmpty>No roles found</CommandEmpty>
                  <CommandGroup>
                    {filteredOptions.map((option: Role) => (
                      <CommandItem
                        key={option.id}
                        value={option.name}
                        onSelect={() => handleChange(option.id)}
                        className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary/10"
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
                          <User className="w-6 h-6 text-muted-foreground" />
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
                          <Check className="w-4 h-4 ml-auto text-primary" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>

          {value.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {options
                .filter((option: Role) => value.includes(option.id))
                .map((option: Role) => (
                  <span
                    key={option.id}
                    className="inline-flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-primary/10 text-primary"
                  >
                    {option.name}
                    <button
                      type="button"
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
