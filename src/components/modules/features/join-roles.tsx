"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useDisableFeatureMutation,
  useUpdateFeatureMutation,
} from "@/redux/api/guild";
import { toCapitalCase } from "@/utils/common";
import { motion } from "framer-motion";
import { SwitchForm } from "@/components/form/switch-form";
import { MultiRoleSelectForm } from "@/components/form/multi-role-select-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import UpdateFeaturePanel from "../update-feature";

const validationSchema = Yup.object({
  isActive: Yup.boolean(),
  userRoles: Yup.array()
    .of(Yup.string())
    .min(1, "At least one user role is required"),
  botRoles: Yup.array()
    .of(Yup.string())
    .min(1, "At least one bot role is required"),
});

export function JoinRoleFeature({
  featureConfig,
  featureInfo,
  guild,
  feature,
  refetch,
}: any) {
  const [disableFeature, { isLoading: disableLoading }] =
    useDisableFeatureMutation();
  const [
    updateFeature,
    { isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateFeatureMutation();

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

  const formik = useFormik({
    initialValues: {
      isActive: featureInfo?.isActive ?? true,
      userRoles: featureInfo?.userRoles ?? [],
      botRoles: featureInfo?.botRoles ?? [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const body = {
          guild,
          feature,
          ...values,
        };
        await updateFeature(body).unwrap();
        toast.success(`Updated ${toCapitalCase(feature)}`, {
          description: "Feature settings saved successfully.",
          duration: 2000,
        });
        refetch();
      } catch (error) {
        toast.error(`Failed to update ${toCapitalCase(feature)}`, {
          duration: 1000,
        });
      }
    },
  });

  useEffect(() => {
    if (updateSuccess) {
      formik.resetForm({ values: formik.values });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  useEffect(() => {
    if (featureInfo) {
      formik.setFieldValue("isActive", featureInfo.isActive ?? true);
      formik.setFieldValue("userRoles", featureInfo?.userRoles ?? []);
      formik.setFieldValue("botRoles", featureInfo?.botRoles ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureInfo]);

  // Debug logs to verify state updates
  console.log("User Roles:", formik.values.userRoles);
  console.log("Bot Roles:", formik.values.botRoles);

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
        <Button
          variant="destructive"
          aria-label={`Disable ${feature}`}
          disabled={disableLoading}
          onClick={handleDisableClick}
          className="w-full sm:w-auto"
        >
          {disableLoading ? "Disabling..." : "Disable"}
        </Button>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-8 lg:col-span-6">
            <SwitchForm
              control={{
                id: "isActive",
                label: "Active",
                description: "Enable or Disable this feature",
              }}
              checked={formik.values.isActive}
              onChange={(checked) => formik.setFieldValue("isActive", checked)}
            />
          </div>

          <div className="col-span-12">
            <MultiRoleSelectForm
              className="w-full"
              control={{
                id: "userRoles",
                label: "User Roles",
                error:
                  formik.touched.userRoles && formik.errors.userRoles
                    ? String(formik.errors.userRoles)
                    : null,
              }}
              guild={guild}
              value={formik.values.userRoles}
              onChange={(values) => formik.setFieldValue("userRoles", values)}
              description="Select roles to assign to users"
            />
          </div>

          <div className="col-span-12">
            <MultiRoleSelectForm
              className="w-full"
              control={{
                id: "botRoles",
                label: "Bot Roles",
                error:
                  formik.touched.botRoles && formik.errors.botRoles
                    ? String(formik.errors.botRoles)
                    : null,
              }}
              guild={guild}
              value={formik.values.botRoles}
              onChange={(values) => formik.setFieldValue("botRoles", values)}
              description="Select roles to assign to bots"
            />
          </div>

          <div className="col-span-12 gap-4">
            {formik.dirty && (
              <UpdateFeaturePanel
                onSubmit={formik.handleSubmit}
                onReset={formik.resetForm}
                isLoading={updateLoading}
              />
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
}
