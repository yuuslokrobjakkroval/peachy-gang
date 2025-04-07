"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";
import { cva } from "class-variance-authority";

const toastVariants = cva(
    "group flex items-center justify-between gap-2 rounded-md border p-4 text-sm font-medium shadow-md transition-all",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground border-primary-border dark:bg-primary/80",
                success:
                    "bg-green-500 text-white border-green-600 dark:bg-green-600 dark:border-green-700",
                destructive:
                    "bg-destructive text-white border-destructive-border dark:bg-destructive/60 dark:border-destructive/80",
                outline:
                    "bg-card text-foreground border-border dark:bg-input/30 dark:border-input",
                secondary:
                    "bg-secondary text-secondary-foreground border-secondary-border dark:bg-secondary/80",
            },
            size: {
                default: "min-h-12 w-full max-w-xs",
                sm: "min-h-10 w-full max-w-[200px] p-3 text-xs",
                lg: "min-h-14 w-full max-w-sm p-5 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

type ToasterPropsWithVariants = ToasterProps & {
    variant?: "default" | "success" | "destructive" | "outline" | "secondary";
    size?: "default" | "sm" | "lg";
};

const Toaster = ({ variant = "default", size = "default", ...props }: ToasterPropsWithVariants) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                className: toastVariants({ variant, size }),
                style: {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                } as React.CSSProperties,
            }}
            {...props}
        />
    );
};

export { Toaster };
