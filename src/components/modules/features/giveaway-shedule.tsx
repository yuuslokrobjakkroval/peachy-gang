"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toCapitalCase } from "@/utils/common";
import {
  useDisableFeatureMutation,
  useDeleteScheduleMutation,
} from "@/redux/api/guild";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateScheduleDialog } from "@/components/layouts/dialogs/create-schedule";
import { FaEdit, FaTrash } from "react-icons/fa";

// Define TypeScript interfaces
interface Schedule {
  _id?: string;
  channel: string;
  isActive: boolean;
  content: string;
  scheduleType: "DAILY" | "WEEKLY" | "MONTHLY";
  scheduleTime: string;
  scheduleDay?: string;
  scheduleDate?: number;
  winners: number;
  prize: number;
}

export function GiveawayScheduleFeature({
  featureConfig,
  featureInfo,
  guild,
  feature,
  refetch,
}: any) {
  const [disableFeature, { isLoading: disableLoading }] =
    useDisableFeatureMutation();
  const [deleteSchedule, { isLoading: deleteLoading }] =
    useDeleteScheduleMutation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteScheduleType, setDeleteScheduleType] = useState<string>("");
  const [editingSchedule, setEditingSchedule] = useState<Schedule | undefined>(
    undefined
  );

  const handleDisableClick = async () => {
    try {
      await disableFeature({ enabled: false, guild, feature }).unwrap();
      toast.success(`Disabled ${toCapitalCase(feature)}`, {
        description: "You have successfully disabled this feature.",
        duration: 1000,
        className: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
      });
      refetch();
    } catch (error) {
      toast.error(`Failed to disable ${toCapitalCase(feature)}`, {
        duration: 1000,
      });
    }
  };

  const handleEditClick = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setDialogOpen(true);
  };

  const handleDeleteClick = (schedule: Schedule) => {
    if (schedule._id) {
      setDeleteId(schedule._id);
      setDeleteScheduleType(schedule.scheduleType);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;
    try {
      const body = {
        guild,
        feature,
        scheduleId: deleteId,
      };
      await deleteSchedule(body).unwrap();
      toast.success(`Deleted ${toCapitalCase(deleteScheduleType)} Schedule`, {
        description: "Schedule deleted successfully.",
        className: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
      });
      refetch();
    } catch (error) {
      toast.error(
        `Failed to delete ${toCapitalCase(deleteScheduleType)} schedule`,
        {
          duration: 1000,
        }
      );
    }
    setDeleteDialogOpen(false);
    setDeleteId(null);
    setDeleteScheduleType("");
  };

  return (
    <motion.div
      className="w-full container mx-auto xl:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col">
          <h1 className="text-primary text-3xl md:text-4xl font-bold">
            {featureConfig.name}
          </h1>
          <p className="text-muted-foreground">{featureConfig.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setEditingSchedule(undefined);
              setDialogOpen(true);
            }}
            aria-label="Add new schedule"
          >
            Add Schedule
          </Button>
          <Button
            variant="destructive"
            aria-label={`Disable ${feature}`}
            disabled={disableLoading}
            onClick={handleDisableClick}
          >
            {disableLoading ? "Disabling..." : "Disable"}
          </Button>
        </div>
      </div>

      <CreateScheduleDialog
        guild={guild}
        feature={feature}
        refetch={refetch}
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingSchedule(undefined);
          }
        }}
        schedule={editingSchedule}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              are you sure you want to delete the{" "}
              {deleteScheduleType.toLowerCase()} schedule?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Channel</TableHead>
            <TableHead>Schedule Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Day/Date</TableHead>
            <TableHead>Winners</TableHead>
            <TableHead>Prize</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {featureInfo?.schedules?.length > 0 ? (
            featureInfo.schedules.map((schedule: Schedule, index: number) => (
              <TableRow key={schedule._id || index}>
                <TableCell>{schedule.channel}</TableCell>
                <TableCell>{schedule.scheduleType}</TableCell>
                <TableCell>{schedule.scheduleTime}</TableCell>
                <TableCell>
                  {schedule.scheduleType === "WEEKLY"
                    ? schedule.scheduleDay
                    : schedule.scheduleType === "MONTHLY"
                      ? schedule.scheduleDate
                      : "-"}
                </TableCell>
                <TableCell>{schedule.winners}</TableCell>
                <TableCell>{schedule.prize}</TableCell>
                <TableCell>{schedule.isActive ? "Yes" : "No"}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(schedule)}
                    aria-label={`Edit schedule ${schedule._id || index}`}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(schedule)}
                    aria-label={`Delete schedule ${schedule._id || index}`}
                    disabled={deleteLoading}
                  >
                    <FaTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No schedules found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
}
