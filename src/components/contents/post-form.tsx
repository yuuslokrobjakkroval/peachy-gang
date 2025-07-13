// components/post-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTimelineMutation } from "@/redux/api/post";
import { UserInfo } from "@/utils/common";

export default function PostForm({
  user,
  onSuccess,
}: {
  user?: UserInfo;
  onSuccess: () => void;
}) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [create] = useCreateTimelineMutation();

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true);
      try {
        const body = {
          content: content,
          imageUrl: image,
          user: user,
        };
        await create(body).unwrap();
        onSuccess();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      {/* <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      /> */}
      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Posting..." : "Post"}
      </Button>
    </div>
  );
}
