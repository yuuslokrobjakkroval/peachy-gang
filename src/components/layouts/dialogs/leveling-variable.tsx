import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const levelingMessages = [
  { label: "Old Level", value: "${oldLevel}" },
  { label: "Current Level", value: "${currentLevel}" },
  { label: "Next Level", value: "${nextLevel}" },
  { label: "Current XP", value: "${currentXP}" },
  { label: "Required XP", value: "${requiredXP}" },
  { label: "Rank", value: "${rank}" },
  { label: "Level Progress", value: "${levelProgress}" },
  { label: "Total XP", value: "${totalXP}" },
  { label: "Level Up Timestamp", value: "${levelUpTimestamp}" },
  { label: "Role Reward", value: "${roleReward}" },
  { label: "XP Gained", value: "${xpGained}" },
  { label: "User ID", value: "${userid}" },
  { label: "Username", value: "${username}" },
  { label: "User Mention", value: "${usermention}" },
  { label: "User Display Name", value: "${userdisplayname}" },
];

const LevelingDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [copiedVariable, setCopiedVariable] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCopy = (variable: string) => {
    navigator.clipboard.writeText(variable);
    setCopiedVariable(variable);
    toast.success(`Copied ${variable} to clipboard`, {
      duration: 1500,
    });
    setTimeout(() => setCopiedVariable(null), 2000);
  };

  // Filtered messages based on search query
  const filteredMessages = levelingMessages.filter((variable) =>
    variable.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl mt-2 mb-2">
        <DialogHeader>
          <DialogTitle>Leveling Variables</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              The following leveling variables can be used in this message.
              <br />
              Click to copy a variable.
            </p>
            <Input
              placeholder="Type to search for a variable..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
            <div className="space-y-1 mt-2 mb-2 max-h-[300px] overflow-y-auto">
              {filteredMessages.map((variable) => (
                <div
                  key={variable.value}
                  className={`p-2 w-full rounded-md cursor-pointer transition-colors ${
                    copiedVariable === variable.value
                      ? "bg-green-100 dark:bg-green-900"
                      : "bg-gray-100 dark:bg-gray-700"
                  } hover:bg-gray-200 dark:hover:bg-gray-600`}
                  onClick={() => handleCopy(variable.value)}
                >
                  <div className="flex justify-between w-full">
                    <span className="text-gray-900 dark:text-gray-100">
                      {variable.label}
                    </span>
                    {copiedVariable === variable.value && (
                      <span className="text-sm text-green-500 dark:text-green-300">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="destructive" className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LevelingDialog;
