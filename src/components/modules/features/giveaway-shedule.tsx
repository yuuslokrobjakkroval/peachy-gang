"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { toCapitalCase } from "@/utils/common";
import {
  useDisableFeatureMutation,
  useDeleteScheduleMutation,
  useUpdateFeatureMutation,
} from "@/redux/api/guild";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateScheduleDialog } from "@/components/layouts/dialogs/create-schedule";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

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
  const tCommon = useTranslations("common");
  const tFeature = useTranslations("features");
  const t = useTranslations("giveawayScheduleFeature");

  const [disableFeature, { isLoading: disableLoading }] =
    useDisableFeatureMutation();
  const [deleteSchedule, { isLoading: deleteLoading }] =
    useDeleteScheduleMutation();
  const [
    updateFeature,
    { isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateFeatureMutation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteScheduleType, setDeleteScheduleType] = useState<string>("");
  const [editingSchedule, setEditingSchedule] = useState<Schedule | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const formik = useFormik({
    initialValues: {
      isActive: featureInfo.isActive ?? true,
      schedules: featureInfo.schedules ?? [],
    },
    validationSchema: Yup.object({
      isActive: Yup.boolean(),
      schedules: Yup.array().of(
        Yup.object({
          channel: Yup.string().required("Channel is required"),
          isActive: Yup.boolean(),
          content: Yup.string().required("Content is required"),
          scheduleType: Yup.string()
            .oneOf(["DAILY", "WEEKLY", "MONTHLY"])
            .required("Schedule type is required"),
          scheduleTime: Yup.string().required("Schedule time is required"),
          winners: Yup.number().required("Winners is required"),
          prize: Yup.number().required("Prize is required"),
        })
      ),
    }),
    onSubmit: async (values) => {
      try {
        await updateFeature({ guild, feature, ...values }).unwrap();
        toast.success(
          tCommon("updateSuccess", { feature: toCapitalCase(feature) }),
          {
            description: tCommon("updateSuccessDescription"),
            duration: 2000,
            className:
              "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
          }
        );
        refetch();
      } catch (error) {
        toast.error(
          tCommon("updateError", { feature: toCapitalCase(feature) }),
          {
            duration: 1000,
          }
        );
      }
    },
  });

  // Sync form initialValues after refetch or successful update
  useEffect(() => {
    if (featureInfo) {
      formik.setValues(featureInfo, false);
      formik.resetForm({ values: featureInfo });
    }
  }, [featureInfo]);

  // Handle successful update to reset dirty state
  useEffect(() => {
    if (updateSuccess) {
      formik.resetForm({ values: formik.values });
    }
  }, [updateSuccess]);

  // Filter schedules based on search query
  const filteredSchedules =
    formik.values.schedules?.filter((schedule: Schedule) =>
      `${schedule.content} ${schedule.channel} ${schedule.scheduleType}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) || [];

  // Paginate filtered schedules
  const paginatedSchedules = filteredSchedules.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredSchedules.length / rowsPerPage) || 1;

  // Reset currentPage when searchQuery changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleDisableClick = async () => {
    try {
      await disableFeature({ enabled: false, guild, feature }).unwrap();
      toast.success(
        tCommon("disableSuccess", { feature: toCapitalCase(feature) }),
        {
          description: tCommon("disableSuccessDescription"),
          duration: 1000,
          className: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
        }
      );
      refetch();
    } catch (error) {
      toast.error(
        tCommon("disableError", { feature: toCapitalCase(feature) }),
        {
          duration: 1000,
        }
      );
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
      toast.success(
        t("deleteSuccess", { type: toCapitalCase(deleteScheduleType) }),
        {
          description: t("deleteSuccessDescription"),
          className: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
        }
      );
      refetch();
    } catch (error) {
      toast.error(
        t("deleteError", { type: toCapitalCase(deleteScheduleType) }),
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
            {tFeature("giveaway-schedule")}
          </h1>
          <p className="text-muted-foreground">
            {tFeature("giveaway-schedule_description")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setEditingSchedule(undefined);
              setDialogOpen(true);
            }}
            aria-label={t("addButtonLabel")}
          >
            {t("addButton")}
          </Button>
          <Button
            variant="destructive"
            aria-label={tCommon("disableButtonLabel", { feature })}
            disabled={disableLoading}
            onClick={handleDisableClick}
          >
            {disableLoading ? tCommon("disabling") : tCommon("disable")}
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-lg font-semibold text-primary">
            {t("table.title")}
          </h2>
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 Tmuted-foreground" />
            <Input
              placeholder={t("table.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.headers.channel")}</TableHead>
              <TableHead>{t("table.headers.scheduleType")}</TableHead>
              <TableHead>{t("table.headers.time")}</TableHead>
              <TableHead>{t("table.headers.dayDate")}</TableHead>
              <TableHead>{t("table.headers.winners")}</TableHead>
              <TableHead>{t("table.headers.prize")}</TableHead>
              <TableHead>{t("table.headers.active")}</TableHead>
              <TableHead>{t("table.headers.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSchedules.length > 0 ? (
              paginatedSchedules.map((schedule: Schedule, index: number) => (
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
                      aria-label={t("table.editLabel", {
                        id: schedule._id || index,
                      })}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(schedule)}
                      aria-label={t("table.deleteLabel", {
                        id: schedule._id || index,
                      })}
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
                  {searchQuery
                    ? t("table.noMatchingSchedules")
                    : t("table.noSchedules")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-muted-foreground">
            {t("table.pagination", { currentPage, totalPages })}
          </p>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              {t("table.prevButton")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              {t("table.nextButton")}
            </Button>
          </div>
        </div>
      </Card>

      <CreateScheduleDialog
        guild={guild}
        feature={feature}
        refetch={refetch}
        open={dialogOpen}
        onOpenChange={(open: any) => {
          setDialogOpen(open);
          if (!open) {
            setEditingSchedule(undefined);
          }
        }}
        schedule={editingSchedule}
      />
    </motion.div>
  );
}
