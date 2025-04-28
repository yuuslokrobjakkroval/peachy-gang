"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card } from "../ui/card";

interface UpdateFeaturePanelProps {
  onSubmit: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export default function UpdateFeaturePanel({
  onSubmit,
  onReset,
  isLoading,
}: UpdateFeaturePanelProps) {
  return (
    <Card className="p-2">
      <div className={cn("w-full flex items-center rounded-lg gap-4")}>
        <Alert className="flex-1 bg-transparent border-none">
          <AlertTitle className="flex items-center gap-2 text-chart-1">
            <span className="w-5 h-5 rounded-full bg-chart-1 text-primary-foreground flex items-center justify-center">
              !
            </span>
            Save Changes
          </AlertTitle>
        </Alert>
        <div className="flex gap-2">
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 cursor-pointer"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button
            className="bg-transparent text-muted-foreground hover:bg-muted/50 px-4 py-2 cursor-pointer"
            onClick={onReset}
            disabled={isLoading}
          >
            Discard
          </Button>
        </div>
      </div>
    </Card>
  );
}
