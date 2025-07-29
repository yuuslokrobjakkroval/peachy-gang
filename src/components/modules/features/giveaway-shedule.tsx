"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { toCapitalCase, toNumber } from "@/utils/common";
import {
  useDisableFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteGiveawayScheduleMutation,
  useGetGuildChannelsQuery,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateScheduleDialog } from "@/components/layouts/dialogs/create-schedule";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useGetUsersQuery } from "@/redux/api/users";

interface Schedule {
  _id?: string;
  channel: string;
  isActive: boolean;
  content: string;
  scheduleType: "DAILY" | "WEEKLY" | "MONTHLY";
  winners: number;
  prize: number;
  autopay: boolean;
  roles: any[];
  image: string;
  createdBy: string;
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
  const { data: channels } = useGetGuildChannelsQuery(guild);
  const {
    data: { items: users = [], meta } = { items: [], meta: {} },
    isSuccess,
  } = useGetUsersQuery(null);
  const [updateFeature, { isSuccess: updateSuccess }] =
    useUpdateFeatureMutation();
  const [disableFeature, { isLoading: disableLoading }] =
    useDisableFeatureMutation();
  const [deleteSchedule, { isLoading: deleteLoading }] =
    useDeleteGiveawayScheduleMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
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
          winners: Yup.number().required("Winners is required"),
          prize: Yup.string().required("Prize is required"),
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
          }
        );
        refetch();
      } catch (error) {
        toast.error(
          tCommon("updateError", { feature: toCapitalCase(feature) })
        );
      }
    },
  });

  useEffect(() => {
    if (featureInfo) {
      formik.setValues(featureInfo, false);
      formik.resetForm({ values: featureInfo });
    }
  }, [featureInfo]);

  useEffect(() => {
    if (updateSuccess) {
      formik.resetForm({ values: formik.values });
    }
  }, [updateSuccess]);

  const filteredSchedules =
    formik.values.schedules?.filter((schedule: Schedule) =>
      `${schedule.content} ${schedule.channel} ${schedule.scheduleType}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) || [];

  const paginatedSchedules = filteredSchedules.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredSchedules.length / rowsPerPage) || 1;

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
        }
      );
      refetch();
    } catch (error) {
      toast.error(tCommon("disableError", { feature: toCapitalCase(feature) }));
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
    }
  };

  const confirmDelete = async (id: any) => {
    if (!id) return;
    try {
      await deleteSchedule({ guild, feature, id }).unwrap();
      toast.success(
        t("deleteSuccess", { type: toCapitalCase(deleteScheduleType) }),
        {
          description: t("deleteSuccessDescription"),
        }
      );
      refetch();
    } catch (error) {
      toast.error(
        t("deleteError", { type: toCapitalCase(deleteScheduleType) })
      );
    }
    setDeleteId(null);
    setDeleteScheduleType("");
  };

  return (
    <motion.div
      className="container w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-3 mb-4 sm:gap-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col space-y-1 sm:space-y-2">
          <h1 className="text-xl font-bold text-primary sm:text-2xl md:text-3xl lg:text-4xl">
            {tFeature("giveaway-schedule")}
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            {tFeature("giveaway-schedule_description")}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setEditingSchedule(undefined);
              setDialogOpen(true);
            }}
            aria-label={t("addButtonLabel")}
            className="w-full sm:w-auto"
          >
            {t("addButton")}
          </Button>
          <Button
            variant="destructive"
            aria-label={tCommon("disableButtonLabel", { feature })}
            disabled={disableLoading}
            onClick={handleDisableClick}
            className="w-full sm:w-auto"
          >
            {disableLoading ? tCommon("disabling") : tCommon("disable")}
          </Button>
        </div>
      </div>

      <Card className="p-2 sm:p-4 lg:p-6">
        <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 lg:mb-6">
          <div className="relative w-full sm:w-[300px] lg:w-[350px]">
            <Search className="absolute w-4 h-4 sm:w-5 sm:h-5 transform -translate-y-1/2 left-2 sm:left-3 top-1/2 text-muted-foreground" />
            <Input
              placeholder={t("table.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-10 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  {t("table.headers.no")}
                </TableHead>
                <TableHead className="min-w-[120px]">
                  {t("table.headers.channel")}
                </TableHead>
                <TableHead className="min-w-[200px]">
                  {t("table.headers.description")}
                </TableHead>
                <TableHead className="min-w-[100px]">
                  {t("table.headers.scheduleType")}
                </TableHead>
                <TableHead className="w-[80px]">
                  {t("table.headers.winners")}
                </TableHead>
                <TableHead className="min-w-[100px]">
                  {t("table.headers.prize")}
                </TableHead>
                <TableHead className="w-[70px]">
                  {t("table.headers.active")}
                </TableHead>
                <TableHead className="min-w-[120px]">
                  {t("table.headers.createdBy")}
                </TableHead>
                <TableHead className="w-[100px]">
                  {t("table.headers.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSchedules.length > 0 ? (
                paginatedSchedules.map((schedule: Schedule, index: number) => (
                  <TableRow key={schedule._id || index}>
                    <TableCell className="font-medium">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      {
                        channels?.find(
                          (channel: any) => channel?.id === schedule.channel
                        )?.name
                      }
                    </TableCell>
                    <TableCell>
                      <div
                        className="max-w-[200px] truncate"
                        title={schedule.content}
                      >
                        {schedule.content}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        {schedule.scheduleType}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {schedule.winners}
                    </TableCell>
                    <TableCell className="font-medium">
                      {toNumber(schedule.prize)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                          schedule.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {schedule.isActive ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {(isSuccess &&
                        users?.find(
                          (user: any) => user.userId === schedule.createdBy
                        )?.username) ??
                        ""}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(schedule)}
                          aria-label={t("table.editLabel", {
                            id: schedule._id || index,
                          })}
                          className="h-8 w-8 p-0"
                        >
                          <FaEdit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(schedule)}
                          aria-label={t("table.deleteLabel", {
                            id: schedule._id || index,
                          })}
                          disabled={deleteLoading}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <FaTrash className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {searchQuery
                      ? t("table.noMatchingSchedules")
                      : t("table.noSchedules")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-3">
          {paginatedSchedules.length > 0 ? (
            paginatedSchedules.map((schedule: Schedule, index: number) => (
              <Card key={schedule._id || index} className="p-3 sm:p-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          #{(currentPage - 1) * rowsPerPage + index + 1}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                            schedule.isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {schedule.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <h3
                        className="font-medium text-sm sm:text-base truncate"
                        title={schedule.content}
                      >
                        {schedule.content}
                      </h3>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(schedule)}
                        aria-label={t("table.editLabel", {
                          id: schedule._id || index,
                        })}
                        className="h-8 w-8 p-0"
                      >
                        <FaEdit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(schedule)}
                        aria-label={t("table.deleteLabel", {
                          id: schedule._id || index,
                        })}
                        disabled={deleteLoading}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <FaTrash className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground text-xs">
                        Channel:
                      </span>
                      <p className="font-medium truncate">
                        {
                          channels?.find(
                            (channel: any) => channel?.id === schedule.channel
                          )?.name
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        Schedule:
                      </span>
                      <p className="font-medium">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          {schedule.scheduleType}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        Winners:
                      </span>
                      <p className="font-medium">{schedule.winners}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        Prize:
                      </span>
                      <p className="font-medium">{toNumber(schedule.prize)}</p>
                    </div>
                  </div>

                  {isSuccess &&
                    users?.find(
                      (user: any) => user.userId === schedule.createdBy
                    )?.username && (
                      <div className="pt-2 border-t">
                        <span className="text-muted-foreground text-xs">
                          Created by:
                        </span>
                        <p className="font-medium text-sm">
                          {
                            users?.find(
                              (user: any) => user.userId === schedule.createdBy
                            )?.username
                          }
                        </p>
                      </div>
                    )}
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8">
              <div className="text-center text-muted-foreground">
                <p className="text-sm sm:text-base">
                  {searchQuery
                    ? t("table.noMatchingSchedules")
                    : t("table.noSchedules")}
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:items-center sm:justify-between lg:mt-6">
          <p className="text-xs text-center text-muted-foreground sm:text-sm sm:text-left">
            {t("table.pagination", { currentPage, totalPages })}
          </p>
          <div className="flex justify-center gap-2 sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="text-xs sm:text-sm"
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
              className="text-xs sm:text-sm"
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
        schedule={editingSchedule}
        onOpenChange={(open: any) => {
          setDialogOpen(open);
          if (!open) setEditingSchedule(undefined);
        }}
      />

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[400px] rounded-lg sm:rounded-2xl p-4 sm:p-6">
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-base sm:text-lg">
              {t("deleteDialog.title")}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("deleteDialog.description", {
              type: toCapitalCase(deleteScheduleType),
            })}
          </p>
          <div className="flex flex-col gap-2 mt-4 sm:flex-row sm:justify-end sm:gap-3 sm:mt-6">
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              {t("deleteDialog.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                confirmDelete(deleteId!);
                setDeleteId(null);
              }}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              {t("deleteDialog.delete")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
