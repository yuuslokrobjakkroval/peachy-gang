"use client";

import { Ellipsis } from "lucide-react";

export function EllipsisPage() {
    return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-2">
            <Ellipsis className="h-8 w-8 animate-ping text-muted-foreground"  />
        </div>
    );
}
