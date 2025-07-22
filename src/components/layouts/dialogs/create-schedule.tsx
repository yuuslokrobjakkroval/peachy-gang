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
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { SwitchForm } from "@/components/form/switch-form";
import { ChannelSelectForm } from "@/components/form/channel-select-form";
import { SelectForm } from "@/components/form/select-form";
import { InputForm } from "@/components/form/input-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { TextAreaWithServerEmoji } from "@/components/form/textarea-with-emoji";
import { CounterForm } from "@/components/form/number-form";

const validationSchema = Yup.object({
  isActive: Yup.boolean(),
  channel: Yup.string().required("Channel is required"),
  content: Yup.string().required("Content is required"),
  scheduleType: Yup.string()
    .oneOf(["DAILY", "WEEKLY", "MONTHLY"], "Invalid schedule type")
    .required("Schedule type is required"),
  winners: Yup.number()
    .min(1, "At least one winner is required")
    .required("Number of winners is required"),
  prize: Yup.string().required("Prize amount is required"),
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
  const [addSchedule, { isLoading: addLoading }] =
    useAddGiveawayScheduleMutation();
  const [
    updateSchedule,
    { isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateGiveawayScheduleMutation();

  const isEditing = !!schedule?._id;

  const formik = useFormik({
    initialValues: {
      channel: "",
      isActive: true,
      content: "",
      scheduleType: "DAILY",
      winners: 1,
      prize: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEditing) {
          await updateSchedule({
            guild,
            feature,
            id: schedule?._id,
            body: { ...values },
            updateSchedule,
          }).unwrap();
          toast.success(t("dialog.updateSuccess"), { duration: 1500 });
        } else {
          await addSchedule({
            guild,
            feature,
            body: { ...values },
            createdBy: userInfoByDiscord.id,
            createdAt: new Date().toISOString(),
          }).unwrap();
          toast.success(t("dialog.addSuccess"), { duration: 1500 });
        }
        refetch();
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
    if (schedule) {
      formik.setValues({
        channel: schedule.channel,
        isActive: schedule.isActive,
        content: schedule.content,
        scheduleType: schedule.scheduleType,
        winners: schedule.winners,
        prize: schedule.prize.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);

  useEffect(() => {
    if (updateSuccess) {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl rounded-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Edit Giveaway Schedule"
              : "Create New Giveaway Schedule"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={formik.handleSubmit}
          className="flex-1 space-y-8 overflow-y-auto"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="col-span-6">
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
              <InputForm
                control={{
                  id: "prize",
                  label: "Prize Amount",
                  description: "The prize amount or value for the giveaway",
                }}
                value={formik.values.prize?.toString()}
                onChange={(value) => formik.setFieldValue("prize", value)}
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
              <CounterForm
                control={{
                  id: "winners",
                  label: "Number of Winners",
                  description: "How many winners for the giveaway",
                }}
                type="number"
                value={formik.values.winners}
                onChange={(value) => formik.setFieldValue("winners", value)}
              />
            </div>
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
              {isEditing ? t("update") : t("add")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
