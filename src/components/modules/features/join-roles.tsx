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
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { usePeachy } from "@/contexts/peachy";

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
  // Use two translation hooks: one for global and one for feature-specific
  const tCommon = useTranslations("common");
  const tFeature = useTranslations("features");
  const t = useTranslations("joinRoleFeature");
  const { userInfoByDiscord, guild: guildInfo } = usePeachy();
  const router = useRouter();
  const [disableFeature, { isLoading: disableLoading }] =
    useDisableFeatureMutation();
  const [
    updateFeature,
    { isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateFeatureMutation();

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

  const formik = useFormik({
    initialValues: {
      isActive: featureInfo?.isActive ?? true,
      userRoles: featureInfo?.userRoles ?? [],
      botRoles: featureInfo?.botRoles ?? [],
    },
    validationSchema: Yup.object({
      isActive: Yup.boolean(),
      userRoles: Yup.array()
        .of(Yup.string())
        .min(1, tCommon("validation.userRolesRequired")),
      botRoles: Yup.array()
        .of(Yup.string())
        .min(1, tCommon("validation.botRolesRequired")),
    }),
    onSubmit: async (values) => {
      try {
        const body = {
          guild,
          feature,
          ...values,
        };
        await updateFeature(body).unwrap();
        toast.success(
          tCommon("updateSuccess", { feature: toCapitalCase(feature) }),
          {
            description: tCommon("updateSuccessDescription"),
            duration: 2000,
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

  return (
    <motion.div
      className="w-full container mx-auto xl:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <CircleArrowLeft
              className="size-8 text-xl sm:text-2xl font-semibold tracking-tight text-[var(--primary)] cursor-pointer hover:text-[var(--primary)]/80 transition-colors"
              onClick={() => router.back()}
            />
            <h4 className="pt-2 text-primary text-3xl md:text-4xl font-bold font-ghibi-bold tracking-tight text-[var(--primary)]">
              {toCapitalCase(guildInfo?.name)}
            </h4>
          </div>

          <div className="mt-2 sm:mt-3 mb-4 sm:mb-6">
            <Separator className="text-[var(--card-foreground)]" />
          </div>

          <h1 className="text-primary text-3xl md:text-4xl font-bold">
            {tFeature("join-roles")}
          </h1>
          <p className="text-muted-foreground">
            {tFeature("join-roles_description")}
          </p>
        </div>
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

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-8 lg:col-span-6">
            <SwitchForm
              control={{
                id: "isActive",
                label: t("switch.activeLabel"),
                description: t("switch.activeDescription"),
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
                label: t("userRoles.label"),
                error:
                  formik.touched.userRoles && formik.errors.userRoles
                    ? String(formik.errors.userRoles)
                    : null,
              }}
              guild={guild}
              value={formik.values.userRoles}
              onChange={(values) => formik.setFieldValue("userRoles", values)}
              description={t("userRoles.description")}
            />
          </div>

          <div className="col-span-12">
            <MultiRoleSelectForm
              className="w-full"
              control={{
                id: "botRoles",
                label: t("botRoles.label"),
                error:
                  formik.touched.botRoles && formik.errors.botRoles
                    ? String(formik.errors.botRoles)
                    : null,
              }}
              guild={guild}
              value={formik.values.botRoles}
              onChange={(values) => formik.setFieldValue("botRoles", values)}
              description={t("botRoles.description")}
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
