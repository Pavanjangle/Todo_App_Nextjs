"use client";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import useInputRegister from "@/utils/useInputRegister";
import { editTodo, fetchTodoById } from "@/utils/api";

const EditTask = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  
  const { formObject } = useInputRegister();
  
  const { register, handleSubmit, setValue, formState: { errors, isSubmitted } } = formObject;

  const { id } = params;

  useEffect(() => {
    fetchTodoById(id).then(data => {
      setValue("taskName", data.taskName);
    });
  }, [setValue, id]);

  const updateTask = async (data: { taskName: string }) => {
    const trimmedTaskName = data.taskName.trim();
    
    // Prevent updating with empty or space-filled task name
    if (trimmedTaskName.length === 0) {
      return;
    }

    const response = await editTodo(trimmedTaskName, id);
    if (response) {
      router.back();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(updateTask)} 
      className="max-w-lg mx-auto mt-20 p-8 bg-white rounded-lg shadow-md bg-gray-400"
    >
      <input
        type="text"
        placeholder="Task name"
        className="border p-2 mb-4 w-full border-black border"
        {...register('taskName', {
          validate: (value) => value.trim().length > 0 || "Task name cannot be empty"
        })}
      />
      {errors.taskName && isSubmitted && <p className="text-red-500">{errors.taskName.message}</p>}
      
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
