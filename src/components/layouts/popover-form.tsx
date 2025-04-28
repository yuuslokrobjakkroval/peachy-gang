"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export type PopoverFormProps = {
  triggerLabel: string;
  onSubmit: (data: { [key: string]: string }) => void;
  theme?: "default" | "ghibli";
};

export const PopoverForm: React.FC<PopoverFormProps> = ({
  triggerLabel,
  onSubmit,
  theme = "default",
}) => {
  const [formData, setFormData] = React.useState({ note: "" });
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
    setFormData({ note: "" });
  };

  const baseStyles = {
    content:
      "bg-popover text-popover-foreground shadow-lg rounded-[--radius-md] border",
    button:
      "bg-primary text-primary-foreground shadow-primary hover:bg-primary/90",
  };

  const ghibliStyles =
    theme === "ghibli"
      ? {
          content:
            "relative bg-gradient-to-br from-[oklch(0.85_0.08_60)] to-[oklch(0.85_0.08_90)] border-none shadow-md",
          button:
            "bg-[oklch(0.85_0.19_85.4)] text-[oklch(0.26_0.016_0)] shadow-primary hover:bg-[oklch(0.85_0.19_85.4)]/80",
          texture: "texture",
        }
      : {};

  const styles = { ...baseStyles, ...ghibliStyles };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border shadow-sm">
          {triggerLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-80 ${styles.content}`}>
        {theme === "ghibli" && <div className={styles.texture} />}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label
              htmlFor="note"
              className="text-sm font-medium text-foreground"
            >
              Quick Note
            </Label>
            <Input
              id="note"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              placeholder="Add a note..."
              className="w-full border shadow-sm"
            />
          </div>
          <Button type="submit" className={`w-full ${styles.button}`}>
            Save
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
