import React, { useMemo, forwardRef } from "react";
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
import { Card } from "@/components/ui/card";

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

export type ChannelSelectFormProps = {
  control: {
    id: string;
    label: string;
    error?: any;
  };
  guild: string;
  value: string;
  onChange: (value: string) => void;
  type?: number | null;
  description?: string;
  className?: string;
};

const renderChannel = (
  channel: GuildChannel,
  categoryName?: string,
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
  type: number | null,
): Option[] => {
  const categories = new Map<string, GuildChannel[]>();
  const roots: GuildChannel[] = [];

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

export const ChannelSelectForm = forwardRef<
  HTMLDivElement,
  ChannelSelectFormProps
>(
  (
    {
      control,
      guild,
      value,
      onChange,
      type = ChannelTypes.GUILD_TEXT,
      description,
      className,
    },
    ref,
  ) => {
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
      <Card className="p-4" ref={ref}>
        <div className="space-y-2">
          <Label
            htmlFor={control.id}
            className="text-lg font-semibold text-primary"
          >
            {control.label}
          </Label>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {isLoading ? (
            <div className="flex justify-center items-center h-12">
              <Spinner variant="circle" />
            </div>
          ) : (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger
                id={control.id}
                className={cn("w-full", className)}
              >
                <SelectValue placeholder="Select a channel" />
              </SelectTrigger>
              <SelectContent className="bg-card border  rounded-md shadow-lg max-h-60 overflow-y-auto">
                {options.length === 0 ? (
                  <SelectItem value="" disabled>
                    No channels available
                  </SelectItem>
                ) : (
                  options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="flex items-center gap-2 p-2 hover:bg-pink-500/10 rounded-md"
                    >
                      {option.icon}
                      {option.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          )}
          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  },
);

ChannelSelectForm.displayName = "ChannelSelectForm";
