"use client";

import React from "react";
import { Container } from "@/components/home/Container";
import { Button } from "@/components/ui/button";

export const Cta = () => {
  const handleDiscordLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const loginUrl = "/api/auth/login";
    if (typeof window !== "undefined") {
      window.location.href = loginUrl;
    }
  };

  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-primary-foreground bg-primary px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-md shadow-sm border-border dark:bg-primary dark:text-primary-foreground">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-ghibi-bold lg:text-3xl">
            Ready to try out this bot?
          </h2>
          <p className="mt-2 font-ghibi text-primary-foreground text-opacity-90 lg:text-xl dark:text-primary-foreground">
            Don't let your visitors see a poor bot.
          </p>
        </div>
        <Button onClick={handleDiscordLogin}>Get Started</Button>
      </div>
    </Container>
  );
};
