"use client";

import React, { useState } from "react";
import { Toast } from "@/components/ui/toast";

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
  const [state, setState] = useState<"initial" | "loading" | "success">(
    isLoading ? "loading" : "initial"
  );

  const handleSave = () => {
    setState("loading");
    setTimeout(() => {
      setState("success");
      setTimeout(() => {
        setState("initial");
      }, 2000);
    }, 1500);
    onSubmit();
  };

  const handleReset = () => {
    onReset();
    setState("initial");
  };

  return (
    <div className="fixed flex items-center justify-center z-50">
      <Toast state={state} onSave={handleSave} onReset={handleReset} />
    </div>
  );
}
