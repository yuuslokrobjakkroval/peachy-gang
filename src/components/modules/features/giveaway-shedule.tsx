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

interface Schedule {
  _id?: string;
  channel: string;
  isActive: boolean;
  content: string;
  scheduleType: "DAILY" | "WEEKLY" | "MONTHLY";
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
  const { data: channels } = useGetGuildChannelsQuery(guild);
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
      className="container w-full mx-auto xl:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-primary md:text-4xl">
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
        <div className="flex flex-col items-center justify-between gap-4 mb-4 sm:flex-row">
          <div className="relative w-[350px]">
            <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 Tmuted-foreground" />
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
              <TableHead>{t("table.headers.no")}</TableHead>
              <TableHead>{t("table.headers.channel")}</TableHead>
              <TableHead>{t("table.headers.description")}</TableHead>
              <TableHead>{t("table.headers.scheduleType")}</TableHead>
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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {
                      channels?.find(
                        (channel: any) => channel?.id === schedule.channel
                      )?.name
                    }
                  </TableCell>
                  <TableCell>{schedule.content}</TableCell>
                  <TableCell>{schedule.scheduleType}</TableCell>
                  <TableCell>{schedule.winners}</TableCell>
                  <TableCell>{toNumber(schedule.prize)}</TableCell>
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
        <div className="flex items-center justify-between mt-4">
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
        schedule={editingSchedule}
        onOpenChange={(open: any) => {
          setDialogOpen(open);
          if (!open) setEditingSchedule(undefined);
        }}
      />

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="sm:max-w-[400px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>{t("deleteDialog.title")}</DialogTitle>
          </DialogHeader>
          <p>
            {t("deleteDialog.description", {
              type: toCapitalCase(deleteScheduleType),
            })}
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              {t("deleteDialog.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                confirmDelete(deleteId!);
                setDeleteId(null);
              }}
            >
              {t("deleteDialog.delete")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
