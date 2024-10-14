"use client";
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { validationSchema } from "@/Utlis/Validation";
import { saveTodo } from "@/Utlis/api";
import { useNavigate, } from "react-router-dom";



const AddTask = () => {
    const navigate = useNavigate();
    const saveTask = async (data: { taskName: string }) => {

        const response = await saveTodo(data.taskName)
        if (response) {
            navigate(-1)
        }


    }
    // Initialize useForm with Yup validation
    const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitted } } = useForm<{ taskName: string }>({
        resolver: yupResolver(validationSchema),
    });
    return (
        <form onSubmit={handleSubmit(saveTask)}>
            <input
                type="text"
                placeholder="Task name"
                className="border p-2 mb-4 w-full"
                {...register('taskName')}
            />
            {errors.taskName && isSubmitted && <p className="text-red-500">{errors.taskName.message}</p>}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
                {"Add Task"}
            </button>
        </form>
    )
}

export default AddTask;