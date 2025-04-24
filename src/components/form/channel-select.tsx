// components/ChannelSelect.tsx
"use client";
import React, { useMemo } from "react";
import { useGetGuildChannelsQuery } from "@/redux/api/guild";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/loading/spinner";
import { toast } from "sonner";
import { BsChatLeftText as ChatIcon } from "react-icons/bs";
import { MdRecordVoiceOver as VoiceIcon } from "react-icons/md";
import { ChannelTypes } from "@/utils/common";
import { cn } from "@/lib/utils";

interface GuildChannel {
  id: string;
  name: string;
  type: number;
  category?: string | null;
}

interface Option {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface ChannelSelectProps {
  className?: string;
  label?: string;
  description?: string;
  guild: string;
  value: string;
  onChange: (value: string) => void;
  error?: any;
  touched?: any;
  type?: number | null;
}

const renderChannel = (
  channel: GuildChannel,
  categoryName?: string
): Option => {
  const icon = () => {
    switch (channel.type) {
      case ChannelTypes.GUILD_STAGE_VOICE:
      case ChannelTypes.GUILD_VOICE:
        return <VoiceIcon className="w-4 h-4 text-pink-300" />;
      default:
        return <ChatIcon className="w-4 h-4 text-pink-300" />;
    }
  };

  return {
    label: categoryName ? `${categoryName}: ${channel.name}` : channel.name,
    value: channel.id,
    icon: icon(),
  };
};

const mapOptions = (
  channels: GuildChannel[],
  type: number | null
): Option[] => {
  const categories = new Map<string, GuildChannel[]>();
  const roots: GuildChannel[] = [];

  // Filter and group channels
  for (const channel of channels) {
    if (type !== null && channel.type !== type) continue;

    if (channel.category == null) {
      roots.push(channel);
    } else {
      const categoryChannels = categories.get(channel.category) ?? [];
      categoryChannels.push(channel);
      categories.set(channel.category, categoryChannels);
    }
  }

  // Map to options
  const options: Option[] = [];

  for (const channel of roots) {
    if (channel.type === ChannelTypes.GUILD_CATEGORY) {
      const categoryChannels = categories.get(channel.id) ?? [];
      for (const ch of categoryChannels) {
        options.push(renderChannel(ch, channel.name));
      }
    } else {
      options.push(renderChannel(channel));
    }
  }

  return options;
};

export function ChannelSelect({
  className,
  label,
  description,
  guild,
  value,
  onChange,
  error,
  touched,
  type = ChannelTypes.GUILD_TEXT,
}: ChannelSelectProps) {
  const {
    data: channels = [],
    isLoading,
    error: queryError,
  } = useGetGuildChannelsQuery(guild);

  const options = useMemo(() => mapOptions(channels, type), [channels, type]);

  if (queryError) {
    toast.error("Failed to load channels");
    return <div className="text-red-400">Error loading channels</div>;
  }

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <Label className="text-xl font-medium text-primary cursor-pointer transition-colors duration-300">
        {label}
      </Label>
      <p className="text-sm text-muted-foreground">{description}</p>
      {isLoading ? (
        <Spinner variant="circle" />
      ) : (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full border-primary transition-all duration-300">
            <SelectValue placeholder="Select a channel" />
          </SelectTrigger>
          <SelectContent className="bg-card border-primary max-h-128 overflow-y-auto">
            {options.length === 0 ? (
              <SelectItem value="" disabled>
                No channels available
              </SelectItem>
            ) : (
              options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="flex items-center gap-2 hover:bg-pink-500/10"
                >
                  {option.icon}
                  {option.label}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      )}
      {touched && error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
