"use client";
import React, { useEffect, useState } from "react";
import { saveTodo } from "@/Utlis/api";
import { useRouter } from 'next/navigation';
import useInputRegister from "@/Utlis/useInputRegister";


const AddTask = () => {
    const router = useRouter();
    const saveTask = async (data: { taskName: string }) => {

        const response = await saveTodo(data.taskName)
        if (response) {
            router.back()
        }
    }
    const {formObject}= useInputRegister();
    // Initialize useForm with Yup validation
    const { register, handleSubmit, formState: { errors, isSubmitted } } =formObject

    return (
        <form 
        onSubmit={handleSubmit(saveTask)} 
        className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg bg-gray-400"
      >
          <input
            type="text"
            placeholder="Task name"
            className="border p-2 mb-3 w-full"
            {...register('taskName')}
          />
          {errors.taskName && isSubmitted && <p className="text-red-500">{errors.taskName.message}</p>}
          
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {"Add Task"}
          </button>
      </form>
      
    )
}

export default AddTask;


{/* <form onSubmit={handleSubmit(saveTask)}>
            <input
                type="text"
                placeholder="Task name"
                className="border p-2 mb-3 w-full mt-20"
                {...register('taskName')}
            />
            {errors.taskName && isSubmitted && <p className="text-red-500">{errors.taskName.message}</p>}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
                {"Add Task"}
            </button>
        </form> */}