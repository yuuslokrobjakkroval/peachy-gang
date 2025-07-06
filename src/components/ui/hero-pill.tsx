import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroPillProps {
  href: string;
  label: any;
  announcement?: string;
  className?: string;
  isExternal?: boolean;
}

export function HeroPill({
  href,
  label,
  announcement = "📣 Announcement",
  className,
  isExternal = false,
}: HeroPillProps) {
  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      className={cn(
        "flex justify-center items-center space-x-2 rounded-full",
        "px-2 py-1 whitespace-pre",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className={cn(
          "w-fit rounded-full bg-accent px-2 py-0.5",
          "text-xs font-medium text-primary sm:text-sm",
          "text-center"
        )}
      >
        {announcement}
      </div>
      <p className="text-xs font-medium text-primary sm:text-sm">{label}</p>
    </motion.a>
  );
}
