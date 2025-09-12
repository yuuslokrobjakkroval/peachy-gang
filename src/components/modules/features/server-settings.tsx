import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const languages = [{ value: "en", label: "English" }];

const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export default function ServerSettings() {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("system");
  // Add more settings as needed

  const handleSave = () => {
    // Implement save logic (API call, context, etc.)
    alert(`Settings saved!\nLanguage: ${language}\nTheme: ${theme}`);
  };

  return (
    <div className="mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-primary">Server Settings</h2>
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-muted-foreground">
          Language
        </label>
        <select
          className="w-full px-4 py-2 border rounded-lg bg-background"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-muted-foreground">
          Theme
        </label>
        <select
          className="w-full px-4 py-2 border rounded-lg bg-background"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {themes.map((theme) => (
            <option key={theme.value} value={theme.value}>
              {theme.label}
            </option>
          ))}
        </select>
      </div>
      {/* Add more settings here */}
      <Button
        className="w-full py-2 text-lg font-semibold bg-primary"
        onClick={handleSave}
      >
        Save Settings
      </Button>
    </div>
  );
}
