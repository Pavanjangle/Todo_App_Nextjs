"use client";
import React, { useEffect, useState } from "react";
import { editTodo, fetchTodoById, saveTodo } from "@/Utlis/api";
import { useRouter } from 'next/navigation';
import useInputRegister from "@/Utlis/useInputRegister";


const EditTask = ({ params }: { params: { id: string } }) => {
            const router = useRouter();
    
    // Initialize useForm with Yup validation

    const {formObject}= useInputRegister();
    // Initialize useForm with Yup validation
    const { register, handleSubmit, setValue, formState: { errors, isSubmitted } } =formObject

    let { id } = params;
    useEffect(() => {
        fetchTodoById(id).then(data => {
            setValue("taskName", data.taskName)
        });

    }, [setValue]);
    const updateTask = async (data: { taskName: string }) => {

        const response = await editTodo(data.taskName, id)
        if (response) {
            router.back()
        }
    }
    return (
        <form 
        onSubmit={handleSubmit(updateTask)} 
        className="max-w-lg mx-auto mt-20 p-8 bg-white rounded-lg shadow-md bg-gray-400"
      >
          <input
            type="text"
            placeholder="Task name"
            className="border p-2 mb-4 w-full"
            {...register('taskName')}
          />
          {errors.taskName && isSubmitted && <p className="text-red-500">{errors.taskName.message}</p>}
          
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {"Update Task"}
          </button>
      </form>
      
    )
}

export default EditTask;

