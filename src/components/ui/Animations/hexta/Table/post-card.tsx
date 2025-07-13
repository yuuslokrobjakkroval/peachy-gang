"use client";

import {
  FaRegPaperPlane,
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

interface PostCardProps {
  username: string;
  displayName: string;
  avatarUrl: string;
  caption?: string;
  imageUrl?: string;
  timeAgo?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  username,
  displayName,
  avatarUrl,
  caption,
  imageUrl,
  timeAgo = "Just now",
}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => setLiked((prev) => !prev);
  const handleBookmark = () => setBookmarked((prev) => !prev);

  return (
    <div className="m-4 max-w-[30rem] w-full rounded-ele bg-card border border-border p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 card-header">
        <div className="flex items-center gap-4">
          <Image
            src={avatarUrl}
            alt={displayName}
            width={35}
            height={35}
            className="rounded-full"
          />
          <div>
            <h3 className="flex flex-col">
              {displayName}
              <span className="flex items-center gap-2 text-sm opacity-70">
                <small>@{username}</small>
                <span>·</span>
                <small>{timeAgo}</small>
              </span>
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {caption && (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {caption}
          </p>
        )}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Post content"
            width={1920}
            height={1080}
            className="object-cover max-w-full rounded-lg"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2 justify-evenly">
        <button
          onClick={handleLike}
          className="flex items-center justify-center gap-3 px-4 py-2 transition grow rounded-ele hover:bg-accent"
        >
          {liked ? <FaHeart color="red" /> : <FaRegHeart />}
          <span className="inline font-medium opacity-90 text-[14px] transition hover:opacity-100 max-sm:hidden">
            {liked ? "Liked" : "Like"}
          </span>
        </button>

        <button
          onClick={handleBookmark}
          className="flex items-center justify-center gap-3 px-4 py-2 transition grow rounded-ele hover:bg-accent"
        >
          {bookmarked ? <FaBookmark color="#00bfff" /> : <FaRegBookmark />}
          <span className="inline font-medium opacity-90 text-[14px] transition hover:opacity-100 max-sm:hidden">
            {bookmarked ? "Saved" : "Save"}
          </span>
        </button>

        <button className="flex items-center justify-center gap-3 px-4 py-2 transition grow rounded-ele hover:bg-accent">
          <FaRegPaperPlane />
          <span className="inline font-medium opacity-90 text-[14px] transition hover:opacity-100 max-sm:hidden">
            Share
          </span>
        </button>
      </div>
    </div>
  );
};
