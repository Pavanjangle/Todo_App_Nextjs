"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditTodo, useTodoById } from "@/utils/api";
import NewUpdateTask from "@/app/sharedComponent/NewUpdateTask";

const EditTask = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { id } = params;
  const { data: todo, isLoading } = useTodoById(id!);
  const editTaskMutation = useEditTodo(id!);

  useEffect(() => {
    if (todo) {
      setValue(todo.taskName);
    }
  }, [todo, setValue]);

  const updateTask = async (data: { taskName: string }) => {
    const trimmedTaskName = data.taskName.trim();
    if (trimmedTaskName) {
      editTaskMutation.mutate(trimmedTaskName, {
        onSuccess: () => router.back(),
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <NewUpdateTask
        buttonTitle="Update Task"
        onSubmitTask={updateTask}
        value={value}
      />
    </div>
  );
};

export default EditTask;
