"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@/Utlis/Validation";
import { useSaveTodo } from "@/Utlis/api";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const saveTaskMutation = useSaveTodo();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<{ taskName: string }>({
    resolver: yupResolver(validationSchema),
  });

  const saveTask = (data: { taskName: string }) => {
    saveTaskMutation.mutate(data.taskName, {
      onSuccess: () => navigate(-1),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(saveTask)}
      className="max-w-md mx-auto mt-20 p-6 rounded-lg shadow-lg bg-gray-3ss00"
    >
      <input
        type="text"
        placeholder="Task name"
        className="border p-2 mb-3 w-full"
        {...register("taskName")}
      />
      {errors.taskName && isSubmitted && (
        <p className="text-red-400">{errors.taskName.message}</p>
      )}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {"Add Task"}
      </button>
    </form>
  );
};

export default AddTask;
