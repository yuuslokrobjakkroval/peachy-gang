"use client";;
import Page from "@/app/login/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-4 mx-auto w-full max-w-7xl">
        <Page />
      </main>
    </div>
  );
}
