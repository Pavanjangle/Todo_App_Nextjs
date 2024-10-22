"use client";
import { useSaveTodo } from '@/utils/api';
import useInputRegister from '@/utils/useInputRegister';
import { useRouter } from 'next/navigation';

const AddTask = () => {
    const router = useRouter();
    const saveTaskMutation = useSaveTodo();

    const saveTask = (data: { taskName: string }) => {
        const trimmedTaskName = data.taskName.trim(); // Trim whitespace from the task name
        if (trimmedTaskName) { // Only mutate if the trimmed task name is not empty
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
            className="max-w-md mx-auto mt-20 p-6 rounded-lg shadow-lg bg-gray-300"
        >
            <input
                type="text"
                placeholder="Task name"
                className="border p-2 mb-3 w-full rounded border-black"
                {...register('taskName', { required: 'Task name is required' })} // Adding required validation
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
