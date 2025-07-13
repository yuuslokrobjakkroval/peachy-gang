"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Container from "@/components/layouts/container";
import PostForm from "@/components/contents/post-form";
import { usePeachy } from "@/contexts/peachy";
import { useGetTimelineQuery } from "@/redux/api/post";
import Loading from "@/components/loading/circle";
import { PostCard } from "@/components/ui/Animations/hexta/Table/post-card";

export default function PeachyPage() {
  const t = useTranslations();
  const { userInfoByDiscord } = usePeachy();
  const [open, setOpen] = useState(false);
  const { data: posts, isLoading: isTimelineLoading } =
    useGetTimelineQuery(null);

  const handleNewPost = async () => {
    setOpen(false);
  };

  if (isTimelineLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.2 }}
          className="z-50 flex items-center justify-center w-[140px] ml-auto"
        >
          <div className="w-full max-w-xl p-4 mx-auto mt-8 space-y-4 border shadow-md animate-fade-in rounded-xl bg-card border-border">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full font-ghibi-bold bg-primary text-primary-foreground hover:opacity-90">
                  + Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="border rounded-lg shadow-xl bg-popover text-popover-foreground border-border">
                <DialogHeader>
                  <DialogTitle className="text-xl font-ghibi-bold">
                    Create Post
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Share your thoughts with the world 🌸
                  </DialogDescription>
                </DialogHeader>
                <PostForm user={userInfoByDiscord} onSuccess={handleNewPost} />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.2 }}
          className="flex w-full mx-auto my-3"
        >
          <div className="w-full max-w-xl px-2 pb-10 mx-auto space-y-6 rounded-lg bg-background/50">
            {posts?.length > 0 ? (
              posts.map((post: any) => <PostCard key={post._id} data={post} />)
            ) : (
              <div className="italic text-center text-muted-foreground font-ghibi">
                No posts yet. Be the first to share something! 🌿
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}
