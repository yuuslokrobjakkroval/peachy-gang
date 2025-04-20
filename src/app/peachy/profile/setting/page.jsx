"use client";

import { useGetUserByIdQuery } from "@/redux/api/users";
import { usePeachy } from "@/context/peachy";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingPage } from "@/components/loading/circle";
import Error from "@/components/handler/error";

export default function ProfileSetting() {
  const { userInfoByDiscord } = usePeachy();

  const { data: userInfo, isLoading } = useGetUserByIdQuery(
    userInfoByDiscord?.id,
    {
      skip: !userInfoByDiscord.id,
    }
  );

  if (isLoading) return <LoadingPage />;

  if (!userInfoByDiscord) {
    return (
      <Error
        error="Failed to fetch user data"
        reset={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-background px-4 py-6 md:px-8 overflow-y-auto">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 rounded-lg gap-2">
              <TabsTrigger
                className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md py-2 text-sm font-medium"
                value="general"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md py-2 text-sm font-medium"
                value="password"
              >
                Password
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md py-2 text-sm font-medium"
                value="notifications"
              >
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-first-name">First name</Label>
                  <Input id="profile-first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-last-name">Last name</Label>
                  <Input id="profile-last-name" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  defaultValue="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-bio">Bio</Label>
                <Input
                  id="profile-bio"
                  defaultValue="Product designer with 5+ years of experience."
                />
              </div>
            </TabsContent>
            <TabsContent value="password" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about your account activity.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your mobile device.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
