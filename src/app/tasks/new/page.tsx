"use client";
import React from "react";
import { useSaveTodo } from "@/utlis/api";
import { useRouter } from 'next/navigation';
import useInputRegister from "@/utlis/useInputRegister";

const AddTask = () => {
    const router = useRouter();
    const saveTaskMutation = useSaveTodo();

    const saveTask = (data: { taskName: string }) => {
        // Trim the task name to avoid adding empty tasks
        const trimmedTaskName = data.taskName.trim();
        if (trimmedTaskName) {
            saveTaskMutation.mutate(trimmedTaskName, {
                onSuccess: () => router.back(),
            });
        }
    };

    const { formObject } = useInputRegister();
    const { register, handleSubmit, formState: { errors, isSubmitted } } = formObject;

    return (
        <form
            onSubmit={handleSubmit(saveTask)}
            className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg bg-gray-400"
        >
            <input
                type="text"
                placeholder="Task name"
                className="border p-2 mb-3 w-full rounded border-black"
                {...register('taskName', { required: 'Task name is required' })}
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
}

export default AddTask;
