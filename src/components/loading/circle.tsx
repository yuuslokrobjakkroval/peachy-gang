import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background overflow-hidden">
      {/* Texture Overlay */}
      <div className="texture" />

      {/* Starry Sky Background */}
      <div className="absolute inset-0 z-0 bg-background animate-[shimmer_6s_ease-in-out_infinite]" />

      {/* Moon Glow Effect */}
      <div
        className="absolute z-5 w-64 h-64 rounded-full bg-background animate-[pulse_4s_ease-in-out_infinite]"
        style={{
          filter: "blur(50px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Twinkling Stars and Comets */}
      <div className="absolute inset-0 z-10">
        <div className="w-2 h-2 rounded-full bg-primary animate-[twinkle_2.5s_ease-in-out_infinite] absolute top-1/5 left-1/4" />
        <div className="w-3 h-3 rounded-full bg-secondary animate-[twinkle_3s_ease-in-out_infinite] absolute top-3/5 left-2/3 delay-200" />
        <div className="w-2 h-2 rounded-full bg-primary/80 animate-[twinkle_2.8s_ease-in-out_infinite] absolute top-2/4 right-1/5 delay-400" />
        <div className="w-4 h-4 rounded-full bg-accent animate-[twinkle_3.2s_ease-in-out_infinite] absolute top-1/3 left-1/3 delay-600" />
        <div className="w-2 h-2 rounded-full bg-secondary/90 animate-[twinkle_2.7s_ease-in-out_infinite] absolute top-4/5 right-1/3 delay-800" />
        <div className="w-3 h-3 rounded-full bg-primary/90 animate-[twinkle_3.5s_ease-in-out_infinite] absolute top-2/5 left-1/6 delay-1000" />
        <div className="w-4 h-1 rounded-full bg-secondary/80 animate-[comet_4s_ease-in-out_infinite] absolute top-1/3 right-1/4 delay-600" />
        <div className="w-3 h-1 rounded-full bg-primary/70 animate-[comet_5s_ease-in-out_infinite] absolute top-4/5 left-1/3 delay-800" />
        <div className="w-5 h-1 rounded-full bg-accent/80 animate-[comet_4.5s_ease-in-out_infinite] absolute top-1/4 right-1/6 delay-1000" />
        <div className="w-3 h-1 rounded-full bg-primary/80 animate-[comet_5.5s_ease-in-out_infinite] absolute top-3/4 left-1/5 delay-1200" />
      </div>

      {/* Main Scene */}
      <div className="relative z-20 w-full max-w-sm p-12 mx-4 rounded-xl text-card-foreground">
        <div className="flex flex-col items-center gap-10">
          {/* Starry Elements */}
          <div className="flex gap-8 relative">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-secondary/60 animate-gentlePulse" />
              <div className="w-10 h-10 rounded-full bg-primary/90 absolute top-0 left-0 animate-eclipse delay-300" />
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-secondary/60 animate-gentlePulse" />
              <div className="w-12 h-12 rounded-full bg-primary/90 absolute top-0 left-0 animate-eclipse delay-400" />
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-secondary/60 animate-gentlePulse" />
              <div className="w-10 h-10 rounded-full bg-primary/90 absolute top-0 left-0 animate-eclipse delay-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation Keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.95;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
        @keyframes comet {
          0%,
          100% {
            transform: translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateX(60px);
            opacity: 1;
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.12);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
