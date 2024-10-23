"use client";
import useInputRegister from "@/utils/useInputRegister";
import React from "react";
import CustomInput from "./CustomInput";
import SubmitButton from "./SubmitButton";

interface TaskProps {
  buttonTitle: string;
  onSubmitTask: (data: { taskName: string }) => Promise<void>;
  value: string;
}

const NewUpdateTask = ({ buttonTitle, onSubmitTask, value }: TaskProps): React.JSX.Element => {
  const { formObject } = useInputRegister();
  const { register, handleSubmit, setValue, formState: { errors } } = formObject;

  // Set the initial value for taskName when the component mounts or value changes
  React.useEffect(() => {
    setValue("taskName", value);
  }, [value, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitTask)}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg bg-gray-300"
    >
      <CustomInput
        label="Task Name" 
        placeHolder="Enter task name"
        register={register}
        name="taskName"
        validate={(value: string) => value.length > 0 || "Task name cannot be empty"}
        error={ errors?.taskName?.message} 
      />

      <SubmitButton
        type="submit"
        title={buttonTitle}
      />
     
    </form>
  );
};

export default NewUpdateTask;

