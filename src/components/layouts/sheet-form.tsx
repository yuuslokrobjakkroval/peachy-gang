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

  const ghibliStyles =
    theme === "ghibli"
      ? {
          content: "bg-gradient-to-br from-blue-100 to-purple-100 border-none",
          title: "text-blue-800 font-handwritten animate-twinkle",
          button: "bg-blue-200 hover:bg-blue-300 text-blue-800",
        }
      : {
          content: "bg-white",
          title: "text-primary",
          button: "bg-primary text-white",
        };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </SheetTrigger>
      <SheetContent side={side} className={ghibliStyles.content}>
        <SheetHeader>
          <SheetTitle className={`text-lg font-semibold ${ghibliStyles.title}`}>
            {title}
          </SheetTitle>
          {description && (
            <SheetDescription className="text-sm text-muted-foreground">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter a title"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="details" className="text-sm font-medium">
              Details
            </Label>
            <Textarea
              id="details"
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              placeholder="Enter details"
              className="w-full"
            />
          </div>
          <Button type="submit" className={`w-full ${ghibliStyles.button}`}>
            Save
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};
