"use client";

import RTLNavbar from "@/components/navbar/RTL";
import Information from "./components/Information";
import General from "./components/General";
import Inventory from "./components/Inventory";
import Setting from "./components/Setting";

import Storage from "./components/Storage";
import Upload from "./components/Upload";
import { useGetUserByIdQuery } from "@/redux/api/users";
import { usePeachy } from "@/context/peachy";

import { LoadingPage } from "@/components/loading/circle";
import Error from "@/components/handler/error";

export default function UserProfile() {
  const { peachyInfo }: { peachyInfo: any } = usePeachy();

  const { data: userInfo, isLoading } = useGetUserByIdQuery(peachyInfo.id, {
    skip: !peachyInfo.id,
  });
  console.log(userInfo);

  if (isLoading) return <LoadingPage />;

  if (!peachyInfo) {
    return (
      <Error
        error="Failed to fetch user data"
        reset={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-5">
      {/* <RTLNavbar /> */}

      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-12 lg:!mb-0">
          <Information peachyInfo={peachyInfo} userInfo={userInfo} />
        </div>

        <div className="col-span-12 lg:!mb-0">
          <General />
        </div>

        {/* <div className="col-span-3 lg:!mb-0">
          <Storage />
        </div>

        <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div> */}
      </div>

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-12 lg:col-span-12 lg:mb-0 3xl:col-span-12">
          <Inventory peachyInfo={peachyInfo} userInfo={userInfo} />
        </div>

        <div className="col-span-4 lg:col-span-4 lg:mb-0 3xl:!col-span-4">
          <Setting />
        </div>
      </div>
    </div>
  );
}
