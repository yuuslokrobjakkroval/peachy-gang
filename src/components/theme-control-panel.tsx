// React Imports
import { useCallback, useEffect } from "react";

// Next Imports

// Third-party Imports
import { useTheme } from "next-themes";

// Type Imports
import type { ThemeStyleProps } from "@/types/theme";
import ThemePresetSelect from "./theme-preset-select";

// Hook Imports
import { useSettings } from "@/hooks/useSettings";

// Util Imports
import { presets } from "@/utils/theme-presets";
import { ScrollArea } from "./ui/scroll-area";

type Mode = "light" | "dark";

const ThemeControlPanel = () => {
  // Hooks
  const { setTheme } = useTheme();
  const { settings, updateSettings, applyThemePreset, resetToDefault } =
    useSettings();

  const handleModeChange = (value: string) => {
    if (value) {
      const newMode = value as Mode;

      // Ensure both themes exist before switching
      const updatedSettings = {
        ...settings,
        mode: newMode,
        theme: {
          ...settings.theme,
          styles: {
            light: settings.theme.styles?.light || {},
            dark: settings.theme.styles?.dark || {},
          },
        },
      };

      // Update settings first
      updateSettings(updatedSettings);

      // Then update next-themes
      setTheme(newMode);
    }
  };

  // Helper function to ensure both themes are updated together
  const updateBothThemes = (updates: Partial<ThemeStyleProps>) => {
    const currentLight = settings.theme.styles?.light || {};
    const currentDark = settings.theme.styles?.dark || {};

    const updatedSettings = {
      ...settings,
      theme: {
        ...settings.theme,
        styles: {
          light: { ...currentLight, ...updates },
          dark: { ...currentDark, ...updates },
        },
      },
    };

    // Update settings and persist to storage
    updateSettings(updatedSettings);
  };

  useEffect(() => {
    // Ensure theme styles exist when component mounts
    if (!settings.theme.styles?.light || !settings.theme.styles?.dark) {
      const updatedSettings = {
        ...settings,
        theme: {
          ...settings.theme,
          styles: {
            light: settings.theme.styles?.light || {},
            dark: settings.theme.styles?.dark || {},
          },
        },
      };

      updateSettings(updatedSettings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (settings.mode) {
      setTheme(settings.mode);
    }
  }, [settings.mode, setTheme]);

  return (
    <ScrollArea className="h-[calc(100vh-6.3125rem)]">
      <div className="flex flex-col gap-6 p-6">
        {/* Themes Selection */}
        <ThemePresetSelect
          presets={presets}
          currentPreset={settings.theme.preset || null}
          onPresetChange={applyThemePreset}
        />
      </div>
    </ScrollArea>
  );
};

export default ThemeControlPanel;
