import React, { forwardRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useDropzone } from "react-dropzone";

export type FileUploadFormProps = {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: string;
  };
  accept?: string; // e.g., "image/*" or ".pdf"
  maxSize?: number; // in bytes
  multiple?: boolean;
  value?: File[];
  onChange?: (files: File[]) => void;
};

export const FileUploadForm = forwardRef<HTMLInputElement, FileUploadFormProps>(
  (
    {
      control,
      accept,
      maxSize,
      multiple = false,
      value = [],
      onChange,
      ...props
    },
    ref
  ) => {
    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        if (multiple) {
          onChange?.([...value, ...acceptedFiles]);
        } else {
          onChange?.(acceptedFiles);
        }
      },
      [value, onChange, multiple]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: accept ? { [accept]: [] } : undefined,
      maxSize,
      multiple,
    });

    return (
      <Card className="p-4">
        <div className="space-y-2">
          <Label
            htmlFor={control.id}
            className="text-lg font-semibold text-primary"
          >
            {control.label}
          </Label>
          {control.description && (
            <p className="text-sm text-muted-foreground">
              {control.description}
            </p>
          )}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-md p-4 text-center ${
              isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} id={control.id} ref={ref} {...props} />
            <p className="text-sm text-gray-600">
              {isDragActive
                ? "Drop the files here..."
                : "Drag & drop files here, or click to select files"}
            </p>
            {accept && (
              <p className="text-xs text-gray-500">(Accepted: {accept})</p>
            )}
          </div>
          {value.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">Selected Files:</p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {value.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          {control.error && (
            <p className="pl-1 text-sm text-red-500">{control.error}</p>
          )}
        </div>
      </Card>
    );
  }
);

FileUploadForm.displayName = "FileUploadForm";
