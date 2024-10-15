"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@/Utlis/Validation";
import { useEditTodo, useTodoById } from "@/Utlis/api";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: todo, isLoading } = useTodoById(id!);
  const editTaskMutation = useEditTodo(id!);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<{ taskName: string }>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (todo) {
      setValue("taskName", todo.taskName);
    }
  }, [todo, setValue]);

  const editTask = (data: { taskName: string }) => {
    editTaskMutation.mutate(data.taskName, {
      onSuccess: () => navigate(-1),
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit(editTask)}
      className="max-w-md mx-auto mt-20 p-6 rounded-lg shadow-lg bg-gray-300"
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
        {"Edit Task"}
      </button>
    </form>
  );
};

export default EditTask;
