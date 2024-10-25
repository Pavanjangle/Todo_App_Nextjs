"use client";
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  taskName: Yup.string().required("Task name is required"),
});

export const emailValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
