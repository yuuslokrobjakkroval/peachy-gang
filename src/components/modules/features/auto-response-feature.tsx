"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePeachy } from "@/contexts/peachy";
import {
  useSendMessageFeatureMutation,
  useDisableFeatureMutation,
  useUpdateFeatureMutation,
  useAddAutoResponseMutation,
  useUpdateAutoResponseMutation,
  useDeleteAutoResponseMutation,
} from "@/redux/api/guild";
import { toCapitalCase } from "@/utils/common";
import { motion } from "framer-motion";
import { SwitchForm } from "@/components/form/switch-form";
import { ChannelSelectForm } from "@/components/form/channel-select-form";
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
import { FaTerminal, FaWandSparkles } from "react-icons/fa6";
import UpdateFeaturePanel from "../update-feature";
import VariableDialog from "@/components/dialogs/variable";
import { styles } from "@/styles";
import { PencilRuler, Trash2 } from "lucide-react";

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
          toast.success("Auto-response updated", { duration: 1500 });
        } else {
          await addAutoResponse({
            guild,
            feature,
            ...values,
            createdBy: userInfoByDiscord.id,
            createdAt: new Date().toISOString(),
          }).unwrap();
          refetch();

          toast.success("Auto-response added", { duration: 1500 });
        }
        setDialogOpen(false);
        setEditingResponse(null);
        dialogFormik.resetForm();
      } catch (error) {
        toast.error(
          `Failed to ${editingResponse ? "update" : "add"} auto-response`,
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

  const handleDelete = async (id: string) => {
    try {
      await deleteAutoResponse({ guild, feature, id }).unwrap();
      toast.success("Auto-response deleted", { duration: 1500 });
      refetch();
    } catch (error) {
      toast.error("Failed to delete auto-response", { duration: 1000 });
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
          <div className="col-span-12">
            <div className="flex flex-row items-center justify-between gap-2 min-w-0">
              <div className="flex-1 min-w-0">
                <SwitchForm
                  control={{
                    id: "isActive",
                    label: "Active",
                    description: "Enable or Disable this feature",
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
                  Auto-Responses
                </h2>
                <Button
                  type="button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setDialogOpen(true)}
                >
                  Add
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Trigger</TableHead>
                    <TableHead>Response</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Action</TableHead>
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
                        No auto-responses found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
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
                    Prev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
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
              {editingResponse ? "Edit Auto-Response" : "Add Auto-Response"}
            </DialogTitle>
            <DialogClose />
          </DialogHeader>
          <form onSubmit={dialogFormik.handleSubmit} className="space-y-4">
            <div>
              <Input
                id="trigger"
                placeholder="Enter trigger text"
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
                placeholder="Enter response text"
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
                {editingResponse ? "Update" : "Add"}
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
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this auto-response?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleDelete(confirmDeleteId!);
                setConfirmDeleteId(null);
              }}
            >
              Delete
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
