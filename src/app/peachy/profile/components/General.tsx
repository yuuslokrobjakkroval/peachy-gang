import { Card } from "@/components/ui/card";
import { User } from "@/utils/types";

const General = ({
  peachyInfo,
  userInfo,
}: {
  peachyInfo: any;
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
        <div className="flex flex-col rounded-lg bg-card p-4 shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">Education</p>
          <p className="text-sm text-muted-foreground mt-1">
            Stanford University
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">Languages</p>
          <p className="text-sm text-muted-foreground mt-1">
            English, Spanish, Italian
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">Department</p>
          <p className="text-sm text-muted-foreground mt-1">Product Design</p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">Work History</p>
          <p className="text-sm text-muted-foreground mt-1">
            Senior Designer at Simmmple (2018-2023)
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">Organization</p>
          <p className="text-sm text-muted-foreground mt-1">Simmmple Web LLC</p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">Birthday</p>
          <p className="text-sm text-muted-foreground mt-1">20 July 1986</p>
        </div>
      </div>
    </Card>
  );
};

export default General;
