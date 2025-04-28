"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type SheetFormProps = {
  triggerLabel: string;
  title: string;
  description?: string;
  onSubmit: (data: { [key: string]: string }) => void;
  theme?: "default" | "ghibli";
  side?: "left" | "right" | "top" | "bottom";
};

export const SheetForm: React.FC<SheetFormProps> = ({
  triggerLabel,
  title,
  description,
  onSubmit,
  theme = "default",
  side = "right",
}) => {
  const [formData, setFormData] = React.useState({ title: "", details: "" });
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
    setFormData({ title: "", details: "" });
  };

  const baseStyles = {
    content: "bg-sidebar text-sidebar-foreground shadow-lg border",
    title: "text-lg font-semibold",
    button:
      "bg-primary text-primary-foreground shadow-primary hover:bg-primary/90",
  };

  const ghibliStyles =
    theme === "ghibli"
      ? {
          content:
            "relative bg-gradient-to-br from-[oklch(0.85_0.08_200)] to-[oklch(0.85_0.08_260)] border-none shadow-md",
          title:
            "text-[oklch(0.41_0.077_78.9)] font-handwritten animate-twinkle",
          button:
            "bg-[oklch(0.68_0.16_184.9)] text-[oklch(0.26_0.016_0)] shadow-primary hover:bg-[oklch(0.68_0.16_184.9)]/80",
          texture: "texture",
        }
      : {};

  const styles = { ...baseStyles, ...ghibliStyles };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="border shadow-sm">
          {triggerLabel}
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className={styles.content}>
        {theme === "ghibli" && <div className={styles.texture} />}
        <SheetHeader>
          <SheetTitle className={styles.title}>{title}</SheetTitle>
          {description && (
            <SheetDescription className="text-sm text-muted-foreground">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter a title"
              className="w-full border shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="details"
              className="text-sm font-medium text-foreground"
            >
              Details
            </Label>
            <Textarea
              id="details"
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              placeholder="Enter details"
              className="w-full border shadow-sm"
            />
          </div>
          <Button type="submit" className={`w-full ${styles.button}`}>
            Save
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};
