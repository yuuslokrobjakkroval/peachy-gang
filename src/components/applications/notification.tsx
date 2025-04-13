import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function NotificationShowcase() {
  return (
    <div className="space-y-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="archive">Archive</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4 pt-4">
              <div className="flex items-start gap-4 pb-4 border-b">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">2 min ago</p>
                  </div>
                  <p className="text-sm">Mentioned you in a comment</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Hey @user, can you review this design when you get a chance?
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Sarah Davis</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                  <p className="text-sm">Shared a document with you</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Project Requirements.pdf
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Team Meeting</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                  <p className="text-sm">
                    Reminder: Team meeting in 30 minutes
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Weekly Sprint Planning
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="unread" className="pt-4">
              <div className="flex items-center justify-center h-24 text-muted-foreground">
                Unread notifications will appear here
              </div>
            </TabsContent>
            <TabsContent value="archive" className="pt-4">
              <div className="flex items-center justify-center h-24 text-muted-foreground">
                Archived notifications will appear here
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Mark all as read</Button>
          <Button>View all</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
