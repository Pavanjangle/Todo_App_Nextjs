"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { saveTodo } from "@/utils/api";
import NewUpdateTask from "@/app/sharedComponent/NewUpdateTask";

const AddTask = () => {
  const router = useRouter();

  // Save the task after trimming spaces
  const saveTask = async (data: { taskName: string }) => {
    const trimmedTaskName = data.taskName.trim();

    // Prevent saving empty or space-filled tasks
    if (trimmedTaskName.length === 0) {
      return;
    }

    const response = await saveTodo(trimmedTaskName);
    if (response) {
      router.back();
    }
  };

  return (
    <div>
      <NewUpdateTask buttonTitle="Add Task" onSubmitTask={saveTask} value={""} />
    </div>
  );
};

export default AddTask;
