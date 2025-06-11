"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePeachy } from "@/contexts/peachy";
import {
  useDisableFeatureMutation,
  useUpdateFeatureMutation,
  useAddAutoResponseMutation,
  useUpdateAutoResponseMutation,
  useDeleteAutoResponseMutation,
} from "@/redux/api/guild";
import { toCapitalCase } from "@/utils/common";
import { motion } from "framer-motion";
import { SwitchForm } from "@/components/form/switch-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FaTerminal } from "react-icons/fa6";
import UpdateFeaturePanel from "../update-feature";
import VariableDialog from "@/components/layouts/dialogs/variable";
import { styles } from "@/styles";
import { PencilRuler, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

const validationSchema = Yup.object({
  responses: Yup.array().of(
    Yup.object({
      trigger: Yup.string().required("Trigger is required"),
      response: Yup.string().required("Response is required"),
    })
  ),
  isActive: Yup.boolean(),
});

const dialogValidationSchema = Yup.object({
  trigger: Yup.string().required("Trigger is required"),
  response: Yup.string().required("Response is required"),
});

export function AutoResponseFeature({
  featureConfig,
  featureInfo,
  guild,
  feature,
  refetch,
}: any) {
  // Use two translation hooks: one for global and one for feature-specific
  const tCommon = useTranslations("common");
  const tFeature = useTranslations("features");
  const t = useTranslations("autoResponseFeature");

  const { userInfoByDiscord } = usePeachy();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [variableDialogOpen, setVariableDialogOpen] = useState(false);
  const [editingResponse, setEditingResponse] = useState<any>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [disableFeature, { isLoading: disableLoading }] =
    useDisableFeatureMutation();
  const [
    updateFeature,
    { isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateFeatureMutation();
  const [addAutoResponse, { isLoading: addLoading }] =
    useAddAutoResponseMutation();
  const [updateAutoResponse, { isLoading: updateResponseLoading }] =
    useUpdateAutoResponseMutation();
  const [deleteAutoResponse, { isLoading: deleteLoading }] =
    useDeleteAutoResponseMutation();

  const formik = useFormik({
    initialValues: {
      isActive: featureInfo.isActive ?? true,
      autoresponse: featureInfo.autoresponse ?? [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateFeature({ guild, feature, ...values }).unwrap();
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

  const dialogFormik = useFormik({
    initialValues: {
      trigger: editingResponse?.trigger ?? "",
      response: editingResponse?.response ?? "",
    },
    validationSchema: dialogValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (editingResponse) {
          await updateAutoResponse({
            guild,
            feature,
            id: editingResponse.id,
            ...values,
          }).unwrap();
          refetch();
          toast.success(t("dialog.updateSuccess"), { duration: 1500 });
        } else {
          await addAutoResponse({
            guild,
            feature,
            ...values,
            createdBy: userInfoByDiscord.id,
            createdAt: new Date().toISOString(),
          }).unwrap();
          refetch();
          toast.success(t("dialog.addSuccess"), { duration: 1500 });
        }
        setDialogOpen(false);
        setEditingResponse(null);
        dialogFormik.resetForm();
      } catch (error) {
        toast.error(
          t("dialog.error", { action: editingResponse ? "update" : "add" }),
          {
            duration: 1000,
          }
        );
      }
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const paginatedResponses = formik.values.autoresponse.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages =
    Math.ceil(formik.values.autoresponse.length / rowsPerPage) || 1;

  useEffect(() => {
    if (updateSuccess) {
      formik.resetForm({ values: formik.values });
    }
  }, [updateSuccess]);

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

  const handleDelete = async (id: string) => {
    try {
      await deleteAutoResponse({ guild, feature, id }).unwrap();
      toast.success(t("deleteSuccess"), { duration: 1500 });
      refetch();
    } catch (error) {
      toast.error(t("deleteError"), { duration: 1000 });
    }
  };

  const handleEdit = (response: any) => {
    setEditingResponse(response);
    setDialogOpen(true);
  };

  useEffect(() => {
    if (featureInfo) {
      formik.setValues({ ...featureInfo });
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
          <h1 className="text-primary text-3xl md:text-4xl font-bold">
            {tFeature("auto-response")}
          </h1>
          <p className="text-muted-foreground">
            {tFeature("auto-response_description")}
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
          <div className="col-span-12">
            <div className="flex flex-row items-center justify-between gap-2 min-w-0">
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
            </div>
          </div>

          <div className="col-span-12">
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-primary">
                  {t("table.title")}
                </h2>
                <Button
                  type="button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setDialogOpen(true)}
                >
                  {t("table.addButton")}
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("table.headers.no")}</TableHead>
                    <TableHead>{t("table.headers.trigger")}</TableHead>
                    <TableHead>{t("table.headers.response")}</TableHead>
                    <TableHead>{t("table.headers.createdBy")}</TableHead>
                    <TableHead>{t("table.headers.createdAt")}</TableHead>
                    <TableHead>{t("table.headers.action")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedResponses.length > 0 ? (
                    paginatedResponses.map((response: any, index: number) => (
                      <TableRow key={response.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{response.trigger}</TableCell>
                        <TableCell>{response.response}</TableCell>
                        <TableCell>{response.createdBy}</TableCell>
                        <TableCell>
                          {new Date(response.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                handleEdit(response);
                              }}
                              disabled={updateResponseLoading || deleteLoading}
                            >
                              <PencilRuler className="h-6 w-6 text-foreground" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                setConfirmDeleteId(response.id);
                              }}
                              disabled={deleteLoading || updateResponseLoading}
                            >
                              <Trash2 className="h-6 w-6 text-foreground" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        {t("table.noResponses")}
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
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
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
          </div>

          <div
            style={styles}
            className="fixed left-1/2 z-50 mx-auto rounded-2xl"
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

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingResponse(null);
            dialogFormik.resetForm();
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingResponse ? t("dialog.editTitle") : t("dialog.addTitle")}
            </DialogTitle>
            <DialogClose />
          </DialogHeader>
          <form onSubmit={dialogFormik.handleSubmit} className="space-y-4">
            <div>
              <Input
                id="trigger"
                placeholder={t("dialog.triggerPlaceholder")}
                value={dialogFormik.values.trigger}
                onChange={dialogFormik.handleChange}
                className={dialogFormik.errors.trigger ? "border-red-500" : ""}
              />
              {/* {dialogFormik.errors.trigger && (
                <p className="text-sm text-red-500 mt-1">
                  {dialogFormik.errors.trigger}
                </p>
              )} */}
            </div>
            <div>
              <Textarea
                id="response"
                placeholder={t("dialog.responsePlaceholder")}
                value={dialogFormik.values.response}
                onChange={dialogFormik.handleChange}
                className={dialogFormik.errors.response ? "border-red-500" : ""}
              />
              {/* {dialogFormik.errors.response && (
                <p className="text-sm text-red-500 mt-1">
                  {dialogFormik.errors.response}
                </p>
              )} */}
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setVariableDialogOpen(true)}
              >
                <FaTerminal size="20" />
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={addLoading || updateResponseLoading}
              >
                {editingResponse
                  ? t("dialog.updateButton")
                  : t("dialog.addButton")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!confirmDeleteId}
        onOpenChange={() => setConfirmDeleteId(null)}
      >
        <DialogContent className="sm:max-w-[400px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>{t("deleteDialog.title")}</DialogTitle>
          </DialogHeader>
          <p>{t("deleteDialog.message")}</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
              {t("deleteDialog.cancelButton")}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleDelete(confirmDeleteId!);
                setConfirmDeleteId(null);
              }}
            >
              {t("deleteDialog.deleteButton")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <VariableDialog
        isOpen={variableDialogOpen}
        onClose={() => setVariableDialogOpen(false)}
      />
    </motion.div>
  );
}
