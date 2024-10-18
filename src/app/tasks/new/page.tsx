"use client";
import { useSaveTodo } from "@/Utlis/api";
import { useRouter } from 'next/navigation';
import useInputRegister from "@/Utlis/useInputRegister";



const AddTask = () => {
    const router = useRouter();
    const saveTaskMutation = useSaveTodo()
    const saveTask = (data: { taskName: string }) => {
        saveTaskMutation.mutate(data.taskName, {
            onSuccess: () => router.back()
        });
    };
    const { formObject } = useInputRegister();
    // Initialize useForm with Yup validation
    const { register, handleSubmit, formState: { errors, isSubmitted } } = formObject

    return (
        <form
            onSubmit={handleSubmit(saveTask)}
            className="max-w-md mx-auto mt-20 p-6 rounded-lg shadow-lg bg-gray-300 "
        >
            <input
                type="text"
                placeholder="Task name"
                className="border p-2 mb-3 w-full rounded border-black"
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


