import React, { useState } from "react";
import { useSendMessageFeatureMutation } from "@/redux/api/guild";
import { TextAreaWithServerEmoji } from "@/components/form/textarea-with-emoji";
import { InputForm } from "@/components/form/input-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export default function SendDiscordMessage({
  guild,
  feature,
}: {
  guild: string;
  feature: string;
}) {
  const [messageType, setMessageType] = useState<"content" | "embed">(
    "content"
  );
  const [content, setContent] = useState("");
  const [embed, setEmbed] = useState({
    title: "",
    description: "",
    color: "",
    author: "",
    footer: "",
    thumbnail: "",
    image: "",
    timestamp: false,
    fields: [] as Array<{ name: string; value: string; inline: boolean }>,
  });
  const [sendMessage, { isLoading }] = useSendMessageFeatureMutation();

  const handleSend = async () => {
    const payload: any = { guild, feature };
    if (messageType === "content") {
      payload.content = content;
    } else {
      payload.embeds = [
        {
          title: embed.title,
          description: embed.description,
          color: embed.color || undefined,
          author: embed.author ? { name: embed.author } : undefined,
          footer: embed.footer ? { text: embed.footer } : undefined,
          thumbnail: embed.thumbnail ? { url: embed.thumbnail } : undefined,
          image: embed.image ? { url: embed.image } : undefined,
          timestamp: embed.timestamp ? new Date().toISOString() : undefined,
          fields: embed.fields,
        },
      ];
    }
    try {
      await sendMessage(payload).unwrap();
      toast.success("Message sent!");
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-6 mx-auto space-y-4 rounded-xl">
      <h2 className="mb-2 text-2xl font-bold text-primary">Embed Messages</h2>
      <p className="text-muted-foreground">
        Send rich embed messages to your Discord channels with customizable
        options.
      </p>
      <Separator />
      <div className="flex items-center gap-6 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="messageType"
            value="content"
            checked={messageType === "content"}
            onChange={() => setMessageType("content")}
            className="accent-primary"
          />
          <span className="font-medium">Content</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="messageType"
            value="embed"
            checked={messageType === "embed"}
            onChange={() => setMessageType("embed")}
            className="accent-primary"
          />
          <span className="font-medium">Embed</span>
        </label>
      </div>
      {messageType === "content" ? (
        <div className="rounded-lg">
          <TextAreaWithServerEmoji
            control={{
              id: "content",
              label: "Content",
              description: "Plain message content.",
            }}
            placeholder="Type your message..."
            enableEmoji
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
          />
        </div>
      ) : (
        <div className="space-y-4 rounded-lg">
          <h3 className="mb-2 text-lg font-semibold text-primary">
            Embed Options
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputForm
              control={{
                id: "embed.title",
                label: "Title",
                description: "Title for the embed.",
              }}
              placeholder="Embed Title"
              value={embed.title}
              onChange={(value: string) =>
                setEmbed((prev) => ({ ...prev, title: value }))
              }
            />
            <InputForm
              control={{
                id: "embed.author",
                label: "Author Name",
                description: "Author name for the embed.",
              }}
              placeholder="Author Name"
              value={embed.author}
              onChange={(value: string) =>
                setEmbed((prev) => ({ ...prev, author: value }))
              }
            />
            <InputForm
              control={{
                id: "embed.footer",
                label: "Footer Text",
                description: "Footer text for the embed.",
              }}
              placeholder="Footer Text"
              value={embed.footer}
              onChange={(value: string) =>
                setEmbed((prev) => ({ ...prev, footer: value }))
              }
            />
            <InputForm
              control={{
                id: "embed.color",
                label: "Embed Color",
                description: "Hex color (e.g. #ff69b4).",
              }}
              placeholder="#ff69b4"
              value={embed.color}
              onChange={(value: string) =>
                setEmbed((prev) => ({ ...prev, color: value }))
              }
            />
            <InputForm
              control={{
                id: "embed.thumbnail",
                label: "Thumbnail URL",
                description: "URL for the embed thumbnail image.",
              }}
              placeholder="https://..."
              value={embed.thumbnail}
              onChange={(value: string) =>
                setEmbed((prev) => ({ ...prev, thumbnail: value }))
              }
            />
            <InputForm
              control={{
                id: "embed.image",
                label: "Image URL",
                description: "URL for the embed main image.",
              }}
              placeholder="https://..."
              value={embed.image}
              onChange={(value: string) =>
                setEmbed((prev) => ({ ...prev, image: value }))
              }
            />
          </div>
          <TextAreaWithServerEmoji
            control={{
              id: "embed.description",
              label: "Description",
              description: "Description for the embed.",
            }}
            placeholder="Embed Description"
            enableEmoji
            value={embed.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEmbed((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={embed.timestamp}
              onChange={(e) =>
                setEmbed((prev) => ({ ...prev, timestamp: e.target.checked }))
              }
            />
            <span>Add Timestamp</span>
          </label>
          <EmbedFieldsManager
            fields={embed.fields}
            setFields={(fields) => setEmbed((prev) => ({ ...prev, fields }))}
          />
        </div>
      )}
      <div className="pt-4">
        <Button
          onClick={handleSend}
          disabled={isLoading}
          className="w-full text-lg font-semibold"
        >
          {isLoading ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </div>
  );
}

// Helper component for managing embed fields
function EmbedFieldsManager({
  fields,
  setFields,
}: {
  fields: Array<{ name: string; value: string; inline: boolean }>;
  setFields: (
    fields: Array<{ name: string; value: string; inline: boolean }>
  ) => void;
}) {
  const [field, setField] = useState({ name: "", value: "", inline: false });
  return (
    <div className="mt-4">
      <h4 className="mb-2 font-bold text-primary">Embed Fields</h4>
      <div className="flex flex-wrap gap-2 mb-2">
        <input
          type="text"
          placeholder="Field Name"
          value={field.name}
          onChange={(e) => setField((f) => ({ ...f, name: e.target.value }))}
          className="w-32 px-2 py-1 border rounded"
        />
        <input
          type="text"
          placeholder="Field Value"
          value={field.value}
          onChange={(e) => setField((f) => ({ ...f, value: e.target.value }))}
          className="w-48 px-2 py-1 border rounded"
        />
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={field.inline}
            onChange={(e) =>
              setField((f) => ({ ...f, inline: e.target.checked }))
            }
          />
          Inline
        </label>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            if (field.name && field.value) {
              setFields([...fields, field]);
              setField({ name: "", value: "", inline: false });
            }
          }}
        >
          Add Field
        </Button>
      </div>
      <ul className="space-y-1">
        {fields.map((f, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800"
          >
            <span className="font-semibold text-primary">{f.name}:</span>
            <span>{f.value}</span>
            {f.inline && (
              <span className="text-xs text-gray-500">(inline)</span>
            )}
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => setFields(fields.filter((_, i) => i !== idx))}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
