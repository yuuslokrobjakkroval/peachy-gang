import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, X } from "lucide-react"

export function NotificationShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">Notification</h2>
        <p className="text-muted-foreground mb-4">
          Notification components for displaying alerts and messages to users.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-card-foreground">Toast Notifications</h3>
        <div className="flex flex-col gap-4">
          <Card className="w-[380px] mx-auto">
            <CardContent className="p-4 flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Success</h3>
                <p className="text-sm text-muted-foreground">Your changes have been saved successfully.</p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="w-[380px] mx-auto">
            <CardContent className="p-4 flex items-start gap-4">
              <div className="bg-destructive/10 p-2 rounded-full">
                <X className="h-4 w-4 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Error</h3>
                <p className="text-sm text-muted-foreground">There was an error processing your request.</p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="w-[380px] mx-auto">
            <CardContent className="p-4 flex items-start gap-4">
              <div className="bg-muted p-2 rounded-full">
                <Bell className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Information</h3>
                <p className="text-sm text-muted-foreground">
                  You have a new message from John Doe. Check your inbox to view it.
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-card-foreground">Notification Center</h3>
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
                    <p className="text-sm text-muted-foreground mt-1">Project Requirements.pdf</p>
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
                    <p className="text-sm">Reminder: Team meeting in 30 minutes</p>
                    <p className="text-sm text-muted-foreground mt-1">Weekly Sprint Planning</p>
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
    </div>
  )
}

