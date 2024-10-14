"use client";
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    taskName: Yup.string().required('Task name is required'),
  });

