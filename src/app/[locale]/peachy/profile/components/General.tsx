import { Card } from "@/components/ui/card";
import { toCapitalCase, toNumber } from "@/utils/common";
import { User } from "@/utils/types";

const General = ({
  userInfoByDiscord,
  userInfo,
}: {
  userInfoByDiscord: any;
  userInfo: User;
}) => {
  return (
    <Card className="w-full p-6 h-full bg-card text-card-foreground shadow-md">
      {/* Header */}
      <div className="w-full">
        <h4 className="text-2xl font-semibold tracking-tight text-primary">
          General Information
        </h4>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col rounded-lg bg-card p-4 border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">Bio</p>
          <p className="text-sm text-muted-foreground mt-1">
            {userInfo?.profile?.bio ?? "Not Set"}
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">Gender</p>
          <p className="text-sm text-muted-foreground mt-1">
            {toCapitalCase(userInfo?.profile?.gender ?? "Not Set")}
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">Birthday</p>
          <p className="text-sm text-muted-foreground mt-1">
            {toCapitalCase(userInfo?.profile?.birthday ?? "Not Set")}
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">Zodiac Sign</p>
          <p className="text-sm text-muted-foreground mt-1">
            {toCapitalCase(userInfo?.profile?.zodiacSign ?? "Not Set")}
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">Level</p>
          <p className="text-sm text-muted-foreground mt-1">
            {toNumber(userInfo?.profile?.level)}
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">Exp</p>
          <p className="text-sm text-muted-foreground mt-1">
            {`${toNumber(userInfo?.profile?.xp)} / ${toNumber(
              userInfo?.profile?.levelXp
            )}`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
