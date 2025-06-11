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

const userMessages = [
  { label: "User ID", value: "${userid}" },
  { label: "User Tag", value: "${usertag}" },
  { label: "Username", value: "${username}" },
  { label: "User Mention", value: "${usermention}" },
  { label: "User Avatar URL", value: "${useravatarurl}" },
  { label: "User Server Avatar URL", value: "${userserveravatarurl}" },
  { label: "User Nickname", value: "${usernickname}" },
  { label: "User Display Name", value: "${userdisplayname}" },
  { label: "User Creation Date", value: "${usercreatedat}" },
  { label: "User Creation Timestamp", value: "${usercreatedtimestamp}" },
  { label: "User Joined Date", value: "${userjoinedat}" },
  { label: "User Joined Timestamp", value: "${userjoinedtimestamp}" },
  { label: "Global Nickname", value: "${userglobalnickname}" },
];

const inviteMessages = [
  { label: "Invite Code", value: "${invitecode}" },
  { label: "Invite URL", value: "${inviteurl}" },
  { label: "Invite Channel", value: "${invitechannel}" },
  { label: "Invite Uses", value: "${inviteuses}" },
];

const inviterMessages = [
  { label: "Inviter ID", value: "${inviterid}" },
  { label: "Inviter Tag", value: "${invitertag}" },
  { label: "Inviter Name", value: "${invitername}" },
  { label: "Inviter Mention", value: "${invitermention}" },
  { label: "Inviter Avatar URL", value: "${inviteravatarurl}" },
];

const guildMessages = [
  { label: "Server ID", value: "${guildid}" },
  { label: "Server Name", value: "${guildname}" },
  { label: "Server Icon URL", value: "${guildiconurl}" },
  { label: "Server Banner URL", value: "${guildbannerurl}" },
  { label: "Server Member Count", value: "${guildmembercount}" },
  { label: "Server Vanity Code", value: "${guildvanitycode}" },
];

const InviteTrackerVariableDialog = ({
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

  const allMessages = userMessages.concat(
    inviterMessages,
    guildMessages,
    inviteMessages
  );

  const filteredMessages = allMessages.filter((variable) =>
    variable.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Invite Tracker Variables</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              The following variables can be used in this message.
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

export default InviteTrackerVariableDialog;
