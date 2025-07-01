"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePeachy } from "@/contexts/peachy";
import {
  useAddGiveawayScheduleMutation,
  useUpdateGiveawayScheduleMutation,
} from "@/redux/api/guild";
import { toCapitalCase } from "@/utils/common";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SwitchForm } from "@/components/form/switch-form";
import { ChannelSelectForm } from "@/components/form/channel-select-form";
import { SelectForm } from "@/components/form/select-form";
import { InputForm } from "@/components/form/input-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { TextAreaWithServerEmoji } from "@/components/form/textarea-with-emoji";

const validationSchema = Yup.object({
  isActive: Yup.boolean(),
  channel: Yup.string().required("Channel is required"),
  content: Yup.string().required("Content is required"),
  scheduleType: Yup.string()
    .oneOf(["DAILY", "WEEKLY", "MONTHLY"], "Invalid schedule type")
    .required("Schedule type is required"),
  scheduleTime: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)")
    .required("Schedule time is required"),
  scheduleDay: Yup.string().when("scheduleType", {
    is: "WEEKLY",
    then: (schema) =>
      schema
        .oneOf(
          [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          "Invalid day"
        )
        .required("Day of the week is required for weekly schedule"),
    otherwise: (schema) => schema.optional(),
  }),
  scheduleDate: Yup.number().when("scheduleType", {
    is: "MONTHLY",
    then: (schema) =>
      schema
        .min(1, "Date must be between 1 and 28")
        .max(28, "Date must be between 1 and 28")
        .required("Date of the month is required for monthly schedule"),
    otherwise: (schema) => schema.optional(),
  }),
  winners: Yup.number()
    .min(1, "At least one winner is required")
    .required("Number of winners is required"),
  prize: Yup.number()
    .min(0, "Prize amount cannot be negative")
    .required("Prize amount is required"),
});

export function CreateScheduleDialog({
  guild,
  feature,
  refetch,
  open,
  onOpenChange,
  schedule,
}: any) {
  const t = useTranslations("common");
  const { userInfoByDiscord } = usePeachy();
  const [editing, setEditing] = useState<any>(null);
  const [addSchedule, { isLoading: addLoading }] =
    useAddGiveawayScheduleMutation();
  const [
    updateSchedule,
    { isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateGiveawayScheduleMutation();

  const isEditing = !!schedule?._id;

  const formik = useFormik({
    initialValues: {
      _id: schedule?._id || undefined,
      channel: schedule?.channel || "",
      isActive: schedule?.isActive ?? true,
      content: schedule?.content || "",
      scheduleType: schedule?.scheduleType || "DAILY",
      scheduleTime: schedule?.scheduleTime || "12:00",
      scheduleDay: schedule?.scheduleDay || "Monday",
      scheduleDate: schedule?.scheduleDate || 1,
      winners: schedule?.winners ?? 1,
      prize: schedule?.prize ?? 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (editing) {
          await updateSchedule({
            guild,
            feature,
            schedules: [{ ...values, id: editing.id }],
            updateSchedule,
          }).unwrap();
          toast.success(t("dialog.updateSuccess"), { duration: 1500 });
        } else {
          await addSchedule({
            guild,
            feature,
            schedules: [{ ...values }],
            createdBy: userInfoByDiscord.id,
            createdAt: new Date().toISOString(),
          }).unwrap();
          toast.success(t("dialog.addSuccess"), { duration: 1500 });
        }
        refetch();
        setEditing(null);
        formik.resetForm();
        onOpenChange(false);
      } catch (error) {
        toast.error(
          `Failed to ${isEditing ? "update" : "create"} ${toCapitalCase(feature)} schedule`,
          {
            duration: 1000,
          }
        );
      }
    },
  });

  useEffect(() => {
    if (updateSuccess) {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl rounded-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Edit Giveaway Schedule"
              : "Create New Giveaway Schedule"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={formik.handleSubmit}
          className="flex-1 overflow-y-auto space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-12">
              <SwitchForm
                control={{
                  id: "isActive",
                  label: "Active",
                  description: "Enable or Disable this schedule",
                }}
                checked={formik.values.isActive}
                onChange={(checked) =>
                  formik.setFieldValue("isActive", checked)
                }
              />
            </div>

            <div className="col-span-12">
              <ChannelSelectForm
                control={{
                  id: "channel",
                  label: "Channel",
                }}
                description="Where to send the giveaway message"
                guild={guild}
                value={formik.values.channel}
                onChange={(value) => formik.setFieldValue("channel", value)}
                type={0}
                className="w-full"
              />
            </div>

            <div className="col-span-12">
              <InputForm
                control={{
                  id: "winners",
                  label: "Number of Winners",
                  description: "How many winners for the giveaway",
                }}
                type="number"
                value={formik.values.winners?.toString()}
                onChange={(value) =>
                  formik.setFieldValue("winners", parseInt(value) || 1)
                }
              />
            </div>

            <div className="col-span-12">
              <InputForm
                control={{
                  id: "prize",
                  label: "Prize Amount",
                  description: "The prize amount or value for the giveaway",
                }}
                type="number"
                value={formik.values.prize?.toString()}
                onChange={(value) =>
                  formik.setFieldValue("prize", parseInt(value) || 0)
                }
              />
            </div>

            <div className="col-span-12">
              <TextAreaWithServerEmoji
                control={{
                  id: "content",
                  label: "Message Content",
                  description: "The content of the giveaway message",
                }}
                placeholder="Type in the main content of the giveaway message"
                enableEmoji
                value={formik.values.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  formik.setFieldValue("content", e.target.value)
                }
              />
            </div>

            <div className="col-span-12">
              <SelectForm
                control={{
                  id: "scheduleType",
                  label: "Schedule Type",
                  description: "Choose how often the giveaway runs",
                }}
                options={[
                  { value: "DAILY", label: "Daily" },
                  { value: "WEEKLY", label: "Weekly" },
                  { value: "MONTHLY", label: "Monthly" },
                ]}
                value={formik.values.scheduleType}
                onChange={(value) =>
                  formik.setFieldValue("scheduleType", value)
                }
              />
            </div>

            <div className="col-span-12">
              <InputForm
                control={{
                  id: "scheduleTime",
                  label: "Time (24h)",
                  description: "Set the time for the giveaway (HH:MM)",
                }}
                placeholder="e.g., 18:00"
                value={formik.values.scheduleTime}
                onChange={(value) =>
                  formik.setFieldValue("scheduleTime", value)
                }
              />
            </div>

            {formik.values.scheduleType === "WEEKLY" && (
              <div className="col-span-12">
                <SelectForm
                  control={{
                    id: "scheduleDay",
                    label: "Day of Week",
                    description: "Choose the day for weekly giveaways",
                  }}
                  options={[
                    { value: "Monday", label: "Monday" },
                    { value: "Tuesday", label: "Tuesday" },
                    { value: "Wednesday", label: "Wednesday" },
                    { value: "Thursday", label: "Thursday" },
                    { value: "Friday", label: "Friday" },
                    { value: "Saturday", label: "Saturday" },
                    { value: "Sunday", label: "Sunday" },
                  ]}
                  value={formik.values.scheduleDay}
                  onChange={(value) =>
                    formik.setFieldValue("scheduleDay", value)
                  }
                />
              </div>
            )}

            {formik.values.scheduleType === "MONTHLY" && (
              <div className="col-span-12">
                <InputForm
                  control={{
                    id: "scheduleDate",
                    label: "Date of Month",
                    description: "Choose the date (1-28) for monthly giveaways",
                  }}
                  type="number"
                  value={formik.values.scheduleDate?.toString()}
                  onChange={(value) =>
                    formik.setFieldValue("scheduleDate", parseInt(value) || 1)
                  }
                />
              </div>
            )}
          </div>

          <div className="flex justify-between mx-4 mb-12">
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                onOpenChange(false);
              }}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={addLoading || updateLoading}
            >
              {editing ? t("update") : t("add")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
