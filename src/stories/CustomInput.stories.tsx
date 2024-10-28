import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import CustomInput, { InputProps } from "../app/sharedComponent/CustomInput";
import { UseFormRegister } from "react-hook-form";

export default {
  title: "Components/CustomInput",
  component: CustomInput,
  argTypes: {
    error: { control: "text" },
    label: { control: "text" },
    placeHolder: { control: "text" },
  },
} as Meta;

const Template: StoryFn<InputProps> = (args) => (
    <CustomInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  placeHolder: "Enter task name",
  label: "Task Name",
  error: "",
  name: "taskName",
  register: (() => ({
    onChange: () => Promise.resolve(),
    onBlur: () => Promise.resolve(),
    name: "taskName",
    ref: () => {},
  })) as UseFormRegister<{ taskName: string }>,
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: "This field is required",
};
