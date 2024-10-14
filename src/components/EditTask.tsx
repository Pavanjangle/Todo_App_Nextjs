"use client";
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { validationSchema } from "@/Utlis/Validation";
import { editTodo, fetchTodoById, saveTodo } from "@/Utlis/api";
import { useParams } from "react-router-dom";
import { useNavigate, } from "react-router-dom";

const EditTask = () => {

    // Initialize useForm with Yup validation
    const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitted } } = useForm<{ taskName: string }>({
        resolver: yupResolver(validationSchema),
    });

    const navigate = useNavigate();
    let { id } = useParams();
    useEffect(() => {
        fetchTodoById(id).then(data => {
            setValue("taskName", data.taskName)
        });

    }, [setValue]);
    const updateTask = async (data: { taskName: string }) => {

        const response = await editTodo(data.taskName, id)
        if (response) {
            navigate(-1)
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

