"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { editTodo, fetchTodoById } from "@/utils/api";
import NewUpdateTask from "@/app/sharedComponent/NewUpdateTask";

const EditTask = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { id } = params;

  useEffect(() => {
    fetchTodoById(id).then(data => {
      setValue(data.taskName);
    });
  }, [setValue, id]);

  const updateTask = async (data: { taskName: string }) => {
    const trimmedTaskName = data.taskName.trim();
    
    // Prevent updating with empty or space-filled task name
    if (trimmedTaskName.length === 0) {
      return;
    }

    const response = await editTodo(trimmedTaskName, id);
    if (response) {
      router.back();
    }
  };

  return (
    <div>
    <NewUpdateTask buttonTitle="Update Task" onSubmitTask={updateTask} value={value}/>
   </div>
  );
};

export default EditTask;
