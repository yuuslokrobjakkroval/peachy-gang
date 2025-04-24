"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  values: string[];
  onValuesChange: (values: string[]) => void;
  children: React.ReactNode;
}

function MultiSelect({ values, onValuesChange, children }: MultiSelectProps) {
  const handleChange = (value: string) => {
    if (values.includes(value)) {
      onValuesChange(values.filter((v) => v !== value));
    } else {
      onValuesChange([...values, value]);
    }
  };

  return (
    <div className="relative inline-block w-full">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { values, onChange: handleChange });
        }
        return child;
      })}
    </div>
  );
}

function MultiSelectTrigger({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border rounded-md px-3 py-2 cursor-pointer",
        className
      )}
    >
      {children}
      <ChevronDownIcon className="w-4 h-4" />
    </div>
  );
}

function MultiSelectContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

function MultiSelectItem({
  value,
  values,
  onChange,
  children,
  className,
}: {
  value: string;
  values: string[];
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const isSelected = values.includes(value);

  return (
    <div
      onClick={() => onChange(value)}
      className={cn(
        "flex items-center gap-2 px-3 py-2 cursor-pointer",
        isSelected ? "bg-primary text-white" : "hover:bg-gray-100",
        className
      )}
    >
      {isSelected && <CheckIcon className="w-4 h-4" />}
      {children}
    </div>
  );
}

function MultiSelectValue({ placeholder }: { placeholder: string }) {
  return <span className="text-gray-500">{placeholder}</span>;
}

export {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectValue,
};
