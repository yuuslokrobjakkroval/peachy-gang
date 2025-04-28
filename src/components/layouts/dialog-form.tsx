"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export type DialogFormProps = {
  triggerLabel: string;
  title: string;
  description?: string;
  onSubmit: (data: { [key: string]: string }) => void;
  theme?: "default" | "ghibli";
};

export const DialogForm: React.FC<DialogFormProps> = ({
  triggerLabel,
  title,
  description,
  onSubmit,
  theme = "default",
}) => {
  const [formData, setFormData] = React.useState({ name: "" });
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
    setFormData({ name: "" });
  };

  const baseStyles = {
    content:
      "bg-card text-card-foreground shadow-lg rounded-[--radius-lg] border",
    title: "text-lg font-semibold",
    button:
      "bg-primary text-primary-foreground shadow-primary hover:bg-primary/90",
  };

  const ghibliStyles =
    theme === "ghibli"
      ? {
          content:
            "relative bg-gradient-to-br from-[oklch(0.85_0.08_110)] to-[oklch(0.85_0.08_140)] border-none shadow-md",
          title:
            "text-[oklch(0.41_0.077_78.9)] font-handwritten animate-twinkle",
          button:
            "bg-[oklch(0.71_0.097_111.7)] text-[oklch(0.98_0.005_0)] shadow-primary hover:bg-[oklch(0.71_0.097_111.7)]/80",
          texture: "texture",
        }
      : {};

  const styles = { ...baseStyles, ...ghibliStyles };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border shadow-sm">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${styles.content}`}>
        {theme === "ghibli" && <div className={styles.texture} />}
        <DialogHeader>
          <DialogTitle className={styles.title}>{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
              className="w-full border shadow-sm"
            />
          </div>
          <Button type="submit" className={`w-full ${styles.button}`}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
