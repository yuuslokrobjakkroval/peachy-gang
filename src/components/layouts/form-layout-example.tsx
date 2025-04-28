"use client";

import React from "react";
import { DialogForm } from "./dialog-form";
import { PopoverForm } from "./popover-form";
import { SheetForm } from "./sheet-form";

export default function FormLayoutExample() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Form Layout Example</h1>

      {/* Dialog Form */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Dialog Form</h2>
        <DialogForm
          triggerLabel="Add User"
          title="Add New User"
          description="Enter the user's details below."
          onSubmit={(data) => console.log("Dialog Form:", data)}
          theme="ghibli"
        />
      </div>

      {/* Popover Form */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Popover Form</h2>
        <PopoverForm
          triggerLabel="Add Quick Note"
          onSubmit={(data) => console.log("Popover Form:", data)}
          theme="ghibli"
        />
      </div>

      {/* Sheet Form */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Sheet Form</h2>
        <SheetForm
          triggerLabel="Edit Settings"
          title="Edit Settings"
          description="Update your settings below."
          onSubmit={(data) => console.log("Sheet Form:", data)}
          theme="ghibli"
          side="right"
        />
      </div>
    </div>
  );
}
