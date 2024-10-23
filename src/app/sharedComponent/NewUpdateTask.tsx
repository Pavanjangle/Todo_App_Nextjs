"use client";
import useInputRegister from "@/utils/useInputRegister";
import React from "react";

interface TaskProps {
  buttonTitle: string;
  onSubmitTask: (data: { taskName: string }) => Promise<void>;
  value: string;
}

const NewUpdateTask = ({ buttonTitle, onSubmitTask, value }: TaskProps): React.JSX.Element => {

  const { formObject } = useInputRegister();

  const { register, handleSubmit, setValue, formState: { errors, isSubmitted } } = formObject;
   setValue("taskName", value)
  return (
    <form
      onSubmit={handleSubmit(onSubmitTask)}
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
        {buttonTitle}
      </button>
    </form>
  );
};

export default NewUpdateTask;
