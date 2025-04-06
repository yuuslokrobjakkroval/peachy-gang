"use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Page from "./peachy/page";

import Page from "@/app/login/page";

export default function Home() {
  // const router = useRouter();
  //
  // useEffect(() => {
  //   const isAuthenticated = false;
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //   }
  // }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-4 mx-auto w-full max-w-7xl">
        <Page />
      </main>
    </div>
  );
}
