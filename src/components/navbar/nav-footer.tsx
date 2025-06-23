"use client";

import React, { useState, useEffect } from "react";

export function NavFooter() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <nav className="flex justify-end items-center gap-3 rounded-xl py-1 transition-all duration-300 font-handwritten"></nav>
  );
}
