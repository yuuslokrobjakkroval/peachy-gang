"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

function Setting() {
  const t = useTranslations();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <Card className="w-full p-6 h-full bg-card text-card-foreground border-2 shadow-md transition-all duration-300 ease-in-out flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-2xl font-semibold tracking-tight text-primary transition-colors duration-300">
          {t("profile.settings.title")}
        </h4>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        <div className="flex items-center gap-4">
          <Switch
            id="dark-mode"
            checked={theme === "dark"}
            onClick={handleThemeToggle}
          />
          <div>
            <label
              htmlFor="dark-mode"
              className="text-lg font-medium text-primary cursor-pointer transition-colors duration-300"
            >
              {t("profile.settings.dark_mode")}
            </label>
            <p className="text-sm text-muted-foreground transition-colors duration-300">
              {t("profile.settings.dark_mode_description")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Switch id="developer-mode" />
          <div>
            <label
              htmlFor="developer-mode"
              className="text-lg font-medium text-primary cursor-pointer transition-colors duration-300"
            >
              {t("profile.settings.developer_mode")}
            </label>
            <p className="text-sm text-muted-foreground transition-colors duration-300">
              {t("profile.settings.developer_mode_description")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <Button
          variant="destructive"
          size="lg"
          className="w-full max-w-xs shadow-destructive-border hover:bg-destructive/90 transition-colors duration-200 ease-in-out"
          onClick={() => router.push("/login")}
        >
          {t("profile.settings.logout")}
        </Button>
      </div>
    </Card>
  );
}

export default Setting;
