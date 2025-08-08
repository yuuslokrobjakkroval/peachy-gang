"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePeachy } from "@/contexts/peachy";
import {
  useSendMessageFeatureMutation,
  useDisableFeatureMutation,
  useUpdateFeatureMutation,
} from "@/redux/api/guild";
import { toCapitalCase } from "@/utils/common";
import { motion } from "framer-motion";
import { SwitchForm } from "@/components/form/switch-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { FaTerminal, FaWandSparkles } from "react-icons/fa6";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import UpdateFeaturePanel from "../update-feature";
import VariableDialog from "@/components/layouts/dialogs/variable";
import { useTranslations } from "next-intl";
import { styles } from "@/styles";

export function ReactionRolesFeature({
  featureConfig,
  featureInfo,
  guild,
  feature,
  refetch,
}: any) {
  const tCommon = useTranslations("common");
  const tFeature = useTranslations("features");
  const t = useTranslations("reactionRolesFeature");
  const { userInfoByDiscord, guild: guildInfo } = usePeachy();
  const [open, setOpen] = useState<boolean>(false);
  const [showMessageSelection, setShowMessageSelection] =
    useState<boolean>(false);
  const [sendMessage, { isLoading: sendMessageLoading }] =
    useSendMessageFeatureMutation();
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
      channel: featureInfo.channel ?? "",
      isActive: featureInfo.isActive ?? true,
      content: featureInfo.content ?? "",
      messageId: featureInfo.messageId ?? "",
      roles: featureInfo.roles ?? [],
      _newEmoji: "",
      _newRoleId: "",
    },
    validationSchema: Yup.object({
      isActive: Yup.boolean(),
      channel: Yup.string().required(tCommon("validation.channelRequired")),
      content: Yup.string().when("messageId", {
        is: (messageId: string) => !messageId,
        then: (schema) =>
          schema.required(tCommon("validation.contentRequired")),
        otherwise: (schema) => schema,
      }),
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

  const handleAddMessageClick = () => {
    setShowMessageSelection(true);
  };

  const handleUseExistingMessage = () => {
    formik.setFieldValue("messageId", "existing-message-id");
    setShowMessageSelection(false);
  };

  const handleCreateNewMessage = async () => {
    try {
      await sendMessage({
        test: false,
        guild,
        feature,
        content: formik.values.content,
        userId: userInfoByDiscord.id,
      }).unwrap();
      toast.success(tCommon("sendMessageSuccess"), {
        duration: 2000,
      });
      setShowMessageSelection(false);
    } catch (error) {
      toast.error(tCommon("sendMessageError"), {
        duration: 2000,
      });
    }
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
            {tFeature("reaction-roles")}
          </h1>
          <p className="text-muted-foreground">
            {tFeature("reaction-roles_description")}
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="col-span-12">
            <div className="flex flex-row items-center justify-between min-w-0 gap-2">
              <div className="flex-1 min-w-0">
                <SwitchForm
                  control={{
                    id: "isActive",
                    label: t("switch.activeLabel"),
                    description: t("switch.activeDescription"),
                  }}
                  checked={formik.values.isActive}
                  onChange={(checked) =>
                    formik.setFieldValue("isActive", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button
                  className="rounded-lg cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                  aria-label={tCommon("pickVariableLabel")}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                >
                  <FaTerminal size="20" />
                </Button>
                <Button
                  className="rounded-lg cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                  aria-label={tCommon("testMessageLabel")}
                  disabled={sendMessageLoading}
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      await sendMessage({
                        test: true,
                        guild,
                        feature,
                        userId: userInfoByDiscord.id,
                      }).unwrap();
                      toast.success(tCommon("sendMessageSuccess"), {
                        duration: 2000,
                      });
                    } catch (error) {
                      toast.error(tCommon("sendMessageError"), {
                        duration: 2000,
                      });
                    }
                  }}
                >
                  <FaWandSparkles size="20" />
                </Button>
              </div>
            </div>
          </div>

          <div className="col-span-12">
            <Card className="p-4">
              <h2 className="mb-2 text-lg font-semibold">
                {t("table.header")}
              </h2>
              <div className="flex flex-col gap-2 mb-4 md:flex-row">
                <input
                  type="text"
                  placeholder={t("emojiPlaceholder", {
                    defaultValue: "Emoji (e.g. 😃)",
                  })}
                  className="w-24 px-2 py-1 border rounded"
                  value={formik.values._newEmoji || ""}
                  onChange={(e) =>
                    formik.setFieldValue("_newEmoji", e.target.value)
                  }
                  maxLength={2}
                />
                <input
                  type="text"
                  placeholder={t("roleIdPlaceholder", {
                    defaultValue: "Role ID",
                  })}
                  className="flex-1 px-2 py-1 border rounded"
                  value={formik.values._newRoleId || ""}
                  onChange={(e) =>
                    formik.setFieldValue("_newRoleId", e.target.value)
                  }
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (!formik.values._newEmoji || !formik.values._newRoleId) {
                      toast.error(t("addRoleValidation"));
                      return;
                    }
                    formik.setFieldValue("roles", [
                      ...formik.values.roles,
                      {
                        emoji: formik.values._newEmoji,
                        roleId: formik.values._newRoleId,
                      },
                    ]);
                    formik.setFieldValue("_newEmoji", "");
                    formik.setFieldValue("_newRoleId", "");
                  }}
                  className="text-white bg-green-500 hover:bg-green-600"
                >
                  {t("addRole")}
                </Button>
              </div>
              <Table>
                <TableBody>
                  {formik.values.roles.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center text-muted-foreground"
                      >
                        {t("noReactionRolesFound")}
                      </TableCell>
                    </TableRow>
                  )}
                  {formik.values.roles.map((role: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="text-xl">{role.emoji}</TableCell>
                      <TableCell>{role.roleId}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            formik.setFieldValue(
                              "roles",
                              formik.values.roles.filter(
                                (_: any, i: number) => i !== index
                              )
                            )
                          }
                          aria-label={t("table.removeLabel", { index })}
                        >
                          {t("remove")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {showMessageSelection && (
            <div className="col-span-12">
              <Card className="p-4">
                <h2 className="text-lg font-semibold">
                  {t("newReactionRoles")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t("getStartedDescription")}
                </p>
                <div className="flex gap-4 mt-4">
                  <Button
                    onClick={handleUseExistingMessage}
                    className="text-white bg-blue-500 hover:bg-blue-600"
                  >
                    {t("useExistingMessage")}
                  </Button>
                  <Button
                    onClick={handleCreateNewMessage}
                    className="text-white bg-green-500 hover:bg-green-600"
                    disabled={sendMessageLoading}
                  >
                    {sendMessageLoading
                      ? tCommon("creating")
                      : t("createNewMessage")}
                  </Button>
                </div>
              </Card>
            </div>
          )}

          <div
            className="fixed z-50 mx-auto left-1/2 rounded-2xl"
            style={styles}
          >
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

      <VariableDialog
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </motion.div>
  );
}
