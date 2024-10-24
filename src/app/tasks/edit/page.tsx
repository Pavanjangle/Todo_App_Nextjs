"use client";
import React, { useEffect, useState } from "react";
import { useEditTodo } from "@/utils/api";
import NewUpdateTask from "@/app/sharedComponent/NewUpdateTask";
import { Modal } from "@mantine/core";

interface EditTaskProps {
  opened: boolean;
  onClose: () => void;
  id: string;
  taskName: string;
}

const EditTask: React.FC<EditTaskProps> = ({
  opened,
  onClose,
  id,
  taskName,
}) => {
  const [value, setValue] = useState("");
  const editTaskMutation = useEditTodo(id!);

  useEffect(() => {
    setValue(taskName);
  }, [taskName, setValue]);

  const updateTask = async (data: { taskName: string }) => {
    const trimmedTaskName = data.taskName.trim();
    if (trimmedTaskName) {
      editTaskMutation.mutate(trimmedTaskName, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Task">
      <div>
        <NewUpdateTask
          buttonTitle="Update Task"
          onSubmitTask={updateTask}
          value={value}
        />
      </div>
    </Modal>
  );
};

export default EditTask;
