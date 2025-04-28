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

  const ghibliStyles =
    theme === "ghibli"
      ? {
          content:
            "bg-gradient-to-br from-yellow-100 to-orange-100 border-none shadow-lg",
          button: "bg-yellow-200 hover:bg-yellow-300 text-yellow-800",
        }
      : {
          content: "bg-white",
          button: "bg-primary text-white",
        };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </PopoverTrigger>
      <PopoverContent className={`w-80 ${ghibliStyles.content}`}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="note" className="text-sm font-medium">
              Quick Note
            </Label>
            <Input
              id="note"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              placeholder="Add a note..."
              className="w-full"
            />
          </div>
          <Button type="submit" className={`w-full ${ghibliStyles.button}`}>
            Save
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
