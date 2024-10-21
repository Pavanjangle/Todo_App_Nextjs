"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { saveTodo } from "@/utils/api";
import useInputRegister from "@/utils/useInputRegister";

const AddTask = () => {
  const router = useRouter();

  // Save the task after trimming spaces
  const saveTask = async (data: { taskName: string }) => {
    const trimmedTaskName = data.taskName.trim();
    
    // Prevent saving empty or space-filled tasks
    if (trimmedTaskName.length === 0) {
      return;
    }

    const response = await saveTodo(trimmedTaskName);
    if (response) {
      router.back();
    }
  };

  const { formObject } = useInputRegister();
  
  const { register, handleSubmit, formState: { errors, isSubmitted } } = formObject;

  return (
    <form 
      onSubmit={handleSubmit(saveTask)} 
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg bg-gray-300"
    >
      <input
        type="text"
        placeholder="Task name"
        className="border p-2 mb-3 w-full border-black border"
        {...register('taskName', {
          validate: (value) => value.trim().length > 0 || "Task name cannot be empty"
        })}
      />
      {errors.taskName && isSubmitted && <p className="text-red-500">{errors.taskName.message}</p>}
      
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
