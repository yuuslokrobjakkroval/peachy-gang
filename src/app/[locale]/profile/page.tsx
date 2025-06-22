"use client";

import { useTranslations } from "next-intl";
import { useGetUserByIdQuery } from "@/redux/api/users";
import { usePeachy } from "@/contexts/peachy";
import Information from "./components/Information";
import General from "./components/General";
import Inventory from "./components/Inventory";
import Setting from "./components/Setting";

import AuthError from "@/components/handler/auth-error";
import { AUTH_ERROR_CODES } from "@/utils/auth/handleAuthError";
import Loading from "@/components/loading/circle";

export default function Profile() {
  const t = useTranslations();
  const { userInfoByDiscord }: { userInfoByDiscord: any } = usePeachy();

  const { data: userInfo, isLoading } = useGetUserByIdQuery(
    userInfoByDiscord?.id,
    {
      skip: !userInfoByDiscord.id,
    },
  );

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-sm text-muted-foreground">
            {t("common.loading")}
          </p>
        </div>
      </div>
    );
  }

  if (!userInfoByDiscord) {
    return (
      <AuthError
        error="User not authenticated"
        code={AUTH_ERROR_CODES.NOT_AUTHENTICATED}
        redirectTo="/login"
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-5 px-4 py-2">
      <div className="w-full mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-8 lg:!mb-0">
          <Information
            userInfoByDiscord={userInfoByDiscord}
            userInfo={userInfo}
          />
        </div>

        <div className="col-span-4 lg:col-span-4 lg:mb-0 3xl:!col-span-4">
          <Setting />
        </div>

        <div className="col-span-12 lg:!mb-0">
          <General userInfoByDiscord={userInfoByDiscord} userInfo={userInfo} />
        </div>
      </div>

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12 mb-4">
        <div className="col-span-12 lg:col-span-12 lg:mb-0 3xl:col-span-12">
          <Inventory
            userInfoByDiscord={userInfoByDiscord}
            userInfo={userInfo}
          />
        </div>
      </div>
    </div>
  );
}
