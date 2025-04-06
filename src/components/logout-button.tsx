"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const handleLogout = () => {
    window.location.href = "/api/auth/signout";
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="sm"
      className="gap-2 text-muted-foreground hover:text-foreground"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
} 