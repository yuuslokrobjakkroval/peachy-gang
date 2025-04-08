"use client";

import { useEffect } from "react";
import { Button } from "../ui/button";

interface ErrorProps {
  error: string; // Error object passed by Next.js
  reset: () => void; // Function to reset the error boundary
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service (optional)
    console.error("Error caught and error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-gray-700 mb-4">
          {error || "An unexpected error occurred while fetching data."}
        </p>
        <Button
          variant="destructive"
          size="lg"
          className="text-white px-4 py-2 rounded-2xl transition cursor-pointer"
          onClick={reset}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
