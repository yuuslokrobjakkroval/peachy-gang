"use client";

import { useState } from "react";
import {
  FaRegPaperPlane,
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import Image from "next/image";
import { avatarUrl } from "@/utils/common";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const PostCard: React.FC<any> = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => setLiked((prev) => !prev);
  const handleBookmark = () => setBookmarked((prev) => !prev);

  return (
    <div className="m-4 max-w-[30rem] w-full rounded-ele bg-card border border-border p-4 flex flex-col gap-4 shadow-md animate-fade-in rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={avatarUrl(data?.user)}
            alt={data?.user?.username}
            width={56}
            height={56}
            unoptimized
            quality={100}
            className="border rounded-full border-muted"
          />
          <div>
            <h3 className="text-base font-ghibi-bold text-foreground">
              {data?.user?.global_name}
            </h3>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <small>@{data?.user?.username}</small>
              <span>·</span>
              <small>
                {data?.createdAt
                  ? moment(data?.createdAt).format("hh:mm A")
                  : "Just now"}
              </small>
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {data?.content && (
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-ghibi text-foreground/80">
            {data.content}
          </p>
        )}
        {data?.imageUrl && (
          <Image
            src={data.imageUrl}
            alt="Post content"
            width={1920}
            height={1080}
            className="object-cover w-full border rounded-lg border-border"
          />
        )}
      </div>
      <Separator />
      {/* Actions */}
      <div className="flex gap-2 text-muted-foreground">
        <Button
          size="sm"
          onClick={handleLike}
          className="gap-2 px-4 py-2 transition rounded-lg"
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
          <span className="text-sm font-medium max-sm:hidden">
            {liked ? "Liked" : "Like"}
          </span>
        </Button>

        <Button
          size="sm"
          onClick={handleBookmark}
          className="gap-2 px-4 py-2 transition rounded-lg"
        >
          {bookmarked ? <FaBookmark color="primary" /> : <FaRegBookmark />}
          <span className="text-sm font-medium max-sm:hidden">
            {bookmarked ? "Saved" : "Save"}
          </span>
        </Button>

        <Button size="sm" className="gap-2 px-4 py-2 transition rounded-lg">
          <FaRegPaperPlane />
          <span className="text-sm font-medium max-sm:hidden">Share</span>
        </Button>
      </div>
    </div>
  );
};
