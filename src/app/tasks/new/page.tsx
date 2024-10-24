"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSaveTodo } from "@/utils/api";
import NewUpdateTask from "@/app/sharedComponent/NewUpdateTask";

const AddTask = () => {
  const router = useRouter();
  const saveTaskMutation = useSaveTodo();

  const saveTask = async (data: { taskName: string }) => {
    const trimmedTaskName = data.taskName.trim();
    if (trimmedTaskName) {
      saveTaskMutation.mutate(trimmedTaskName, {
        onSuccess: () => router.back(),
      });
    }
  };
  return (
    <div>
      <NewUpdateTask
        buttonTitle="Add Task"
        onSubmitTask={saveTask}
        value={""}
      />
    </div>
  );
};

export default AddTask;
