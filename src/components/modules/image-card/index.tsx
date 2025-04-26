"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export function CustomImagePage({ parentFormik }: any) {
  const formik = useFormik({
    initialValues: {
      image: {
        layout: "",
        feature: "WELCOME",
        avatarShape: "Circle",
        circleColor: "#77CDFF",
        featureColor: "#77CDFF",
        textColor: "#FFFFFF",
        backgroundColor: "#FFFFFF",
      },
    },
    validationSchema: Yup.object({
      image: Yup.object().shape({
        layout: Yup.string().required("Layout is required"),
        feature: Yup.string().required("Feature is required"),
        avatarShape: Yup.string().required("Avatar shape is required"),
        circleColor: Yup.string().required("Circle color is required"),
        featureColor: Yup.string().required("Feature color is required"),
        textColor: Yup.string().required("Text color is required"),
        backgroundColor: Yup.string().required("Background color is required"),
      }),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return <form onSubmit={formik.handleSubmit}>Hello</form>;
}
