import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ArchiveNotification() {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-border">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/placeholder.svg" alt="User" />
        <AvatarFallback className="text-sm">JD</AvatarFallback>
      </Avatar>
      <div className="flex-1 pr-3">
        <div className="flex items-center justify-between">
          <p className="font-medium text-foreground">Peng Yong</p>
          <p className="text-xs text-muted-foreground">2 min ago</p>
        </div>
        <p className="text-sm text-foreground mt-1">
          Mentioned you in a comment
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Hey @user, can you review this design when you get a chance?
        </p>
      </div>
    </div>
  );
}
