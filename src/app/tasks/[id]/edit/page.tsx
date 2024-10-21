"use client";
import React, { useEffect } from "react";
import { useEditTodo, useTodoById } from "@/utlis/api";
import { useRouter } from 'next/navigation';
import useInputRegister from "@/utlis/useInputRegister";

const EditTask = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const { data: todo, isLoading } = useTodoById(id!);
  const editTaskMutation = useEditTodo(id!);
  // Initialize useForm with Yup validation

  const { formObject } = useInputRegister();
  // Initialize useForm with Yup validation
  const { register, handleSubmit, setValue, formState: { errors, isSubmitted } } = formObject

  useEffect(() => {
    if (todo) {
      setValue("taskName", todo.taskName);
    }
  }, [todo, setValue]);

  const editTask = (data: { taskName: string }) => {
    editTaskMutation.mutate(data.taskName, {
      onSuccess: () => router.back()
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
        className="border p-2 mb-3 w-full rounded border-black"
        {...register("taskName")}
      />
      {errors.taskName && isSubmitted && (
        <p className="text-red-400">{errors.taskName.message}</p>
      )}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {"Update Task"}
      </button>
    </form>
  );
};

export default EditTask;

