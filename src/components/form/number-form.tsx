"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Transition } from "motion/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  SlidingNumber,
  type SlidingNumberProps,
} from "@/components/ui/sliding-number";

type CounterProps = HTMLMotionProps<"div"> & {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: string;
    tooltip?: string;
  };
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  type?: string;
  slidingNumberProps?: Omit<SlidingNumberProps, "number">;
  buttonProps?: Omit<React.ComponentProps<typeof Button>, "onClick">;
  transition?: Transition;
};

export const CounterForm = ({
  control,
  value = 0,
  onChange,
  className,
  slidingNumberProps,
  buttonProps,
  transition = { type: "spring", bounce: 0, stiffness: 300, damping: 30 },
  ...props
}: CounterProps) => {
  const handleDecrement = (e: any) => {
    e.preventDefault();
    const newValue = (value ?? 0) - 1;
    onChange?.(newValue);
  };

  const handleIncrement = (e: any) => {
    e.preventDefault();
    const newValue = (value ?? 0) + 1;
    onChange?.(newValue);
  };

  return (
    <Card className="p-4">
      <div className="space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label
                htmlFor={control.id}
                className="text-lg font-semibold text-primary cursor-help"
              >
                {control.label}
              </Label>
            </TooltipTrigger>
            {control.tooltip && (
              <TooltipContent>
                <p>{control.tooltip}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        {control.description && (
          <p className="text-sm text-muted-foreground">{control.description}</p>
        )}
        <motion.div
          data-slot="counter"
          layout
          transition={transition}
          className={cn("flex items-center gap-x-2 p-1 rounded-xl", className)}
          {...props}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="icon"
              {...buttonProps}
              disabled={value <= 0}
              onClick={handleDecrement}
              className={cn(
                "text-2xl font-light pb-[3px]",
                buttonProps?.className
              )}
            >
              -
            </Button>
          </motion.div>

          <SlidingNumber
            number={value}
            {...slidingNumberProps}
            className={cn("text-2xl px-8", slidingNumberProps?.className)}
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="icon"
              {...buttonProps}
              disabled={value >= 100}
              onClick={handleIncrement}
              className={cn(
                "text-2xl font-light pb-[3px]",
                buttonProps?.className
              )}
            >
              +
            </Button>
          </motion.div>
        </motion.div>
        {control.error && (
          <p className="pl-1 text-sm text-red-500">{control.error}</p>
        )}
      </div>
    </Card>
  );
};

CounterForm.displayName = "CounterForm";
