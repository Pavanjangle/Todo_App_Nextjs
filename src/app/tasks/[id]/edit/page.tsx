"use client";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useEditTodo, useTodoById } from "@/utils/api";
import useInputRegister from "@/utils/useInputRegister";

const EditTask = ({ params }: { params: { id: string, onConfirm:Function } }) => {
  const router = useRouter();
  const { id } = params;
  const { data: todo, isLoading } = useTodoById(id!);
  const editTaskMutation = useEditTodo(id!);

  const { formObject } = useInputRegister();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitted } } = formObject;

  useEffect(() => {
    if (todo) {
      setValue("taskName", todo.taskName);
    }
  }, [todo, setValue]);

  const editTask = (data: { taskName: string }) => {
    const trimmedTaskName = data.taskName.trim(); // Trim whitespace from the task name
    if (trimmedTaskName) { // Only mutate if the trimmed task name is not empty
      editTaskMutation.mutate(trimmedTaskName, {
        onSuccess: () => router.back(),
      });
    }
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
        {...register("taskName", { required: 'Task name is required' })} // Adding required validation
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
