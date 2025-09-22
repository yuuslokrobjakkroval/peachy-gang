"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-provider";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Spinner } from "@/components/loading/spinner";

export function LogoutButton() {
  const { signOut } = useAuth();
  const t = useTranslations("common");
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSignOut}
      disabled={loading}
      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
    >
      {loading ? (
        <Spinner className="w-4 h-4 mr-2" />
      ) : (
        <LogOut className="w-4 h-4 mr-2" />
      )}
      {loading ? t("loading") : "Sign Out"}
    </Button>
  );
}
