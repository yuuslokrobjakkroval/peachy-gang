import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

function Setting() {
  const { setTheme } = useTheme();
  const [darkmode, setDarkmode] = React.useState(false);
  return (
    <Card className="w-full p-4 h-full">
      <div className="relative mb-3 flex items-center justify-between pt-1">
        <h4 className="text-balance text-xl font-bold text-navy-700 dark:text-white">
          Settings
        </h4>
        {/* <CardMenu /> */}
      </div>
      <div className="flex flex-col">
        <div className="mt-3 flex items-center gap-3">
          <Switch
            id="switch1"
            onClick={() => {
              if (darkmode) {
                document.body.classList.remove("dark");
                setTheme("light");
                setDarkmode(false);
              } else {
                document.body.classList.add("dark");
                setTheme("dark");
                setDarkmode(true);
              }
            }}
          />
          <label
            htmlFor="checkbox1"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Dark Mode
            <p className="flex justify-center text-balance text-base font-normal text-muted-foreground">
              Enables dark theme to protect your eyes
            </p>
          </label>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Switch id="switch2" />
          <label
            htmlFor="checkbox2"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Developer Mode
            <p className="flex justify-center text-balance text-base  font-normal text-muted-foreground">
              Used for debugging and testing
            </p>
          </label>
        </div>
      </div>
      <div className="flex justify-center items-center mt-2 gap-3">
        <Button variant="destructive" size="lg">
          Logout
        </Button>
      </div>
    </Card>
  );
}

export default Setting;
