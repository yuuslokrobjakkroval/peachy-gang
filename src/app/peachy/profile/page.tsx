"use client";

import { LoadingPage } from "@/components/loading-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchUserInfoQuery } from "@/redux/api/discord";

export default function UserProfile() {
  const { data: user, isLoading, error } = useFetchUserInfoQuery(null);

  if (isLoading) return <LoadingPage />;
  if (error) {
    return <div>Failed to load user information. Please try again later.</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-6">
              Welcome to the World of Peach and Goma!
            </h1>
            <h1>User Profile</h1>
            {user ? (
              <div>
                <p>Username: {user.username}</p>
                <p>ID: {user.id}</p>
              </div>
            ) : (
              <p>Failed to load user information.</p>
            )}
          </div>
          <div className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
