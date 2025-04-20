"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePeachy } from "@/context/peachy";

export default function NotFound() {
  const router = useRouter();
  const { userInfoByDiscord } = usePeachy();

  return (
    // <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-6 md:p-10 bg-background">
    //   {/* Background Image */}
    //   <Image
    //     src="/images/notfound.png"
    //     alt="Not Found"
    //     fill
    //     style={{ objectFit: "cover", opacity: 0.5 }}
    //     className="absolute inset-0 z-0 brightness-75"
    //   />

    //   {/* Overlay for better readability */}
    //   <div className="absolute inset-0 bg-background/40 z-0" />

    //   {/* Content Container */}
    //   <div className="relative z-10 text-center max-w-lg">
    //     <h3
    //       className="text-4xl md:text-6xl font-extrabold text-primary mb-4 shadow-md animate-pulse"
    //       style={{ textShadow: "2px 2px 4px var(--shadow)" }}
    //     >
    //       Oops! <br /> Page Not Found
    //     </h3>
    //     <p className="text-lg md:text-xl text-muted-foreground mb-8">
    //       Looks like you’ve wandered into the void. You should be redirected
    //       automatically. If not, head back home.
    //     </p>
    //     {/* Back to Home Button */}
    //     <Button
    //       onClick={handleGoBack}
    //       variant="default"
    //       className="px-6 py-3 bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 border border-primary shadow-md transform hover:scale-105 transition-all duration-300 rounded-[var(--radius)]"
    //     >
    //       Go Back
    //     </Button>
    //   </div>
    // </div>
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-6 md:p-10 bg-background">
      <div className="absolute top-1/2 left-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
        <span className="from-foreground bg-linear-to-b to-transparent bg-clip-text text-[10rem] leading-none font-extrabold text-transparent">
          404
        </span>
        <h2 className="font-heading my-2 text-2xl font-bold">
          Something&apos;s missing
        </h2>
        <p>
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="mt-8 flex justify-center gap-2">
          <Button onClick={() => router.back()} variant="secondary" size="lg">
            Go back
          </Button>
          <Button
            onClick={() =>
              router.push(`${!!userInfoByDiscord ? "/peachy" : "/login"}`)
            }
            variant="default"
            size="lg"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
