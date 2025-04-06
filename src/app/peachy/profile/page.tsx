"use client";

import { LoadingPage } from "@/components/loading-page";
import { useFetchUserInfoQuery } from "@/redux/api/discord";
import { getCookie } from "cookies-next";

export default function UserProfile() {
  const accessToken = getCookie("ts-token");
  console.log(accessToken);

  const { data: user, isLoading } = useFetchUserInfoQuery({ accessToken });

  if (isLoading) return <LoadingPage />;
  return (
    <div>
      <h1>User Profile</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>ID: {user.id}</p>
        </div>
      )}
    </div>
  );
}
