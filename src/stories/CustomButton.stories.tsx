import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import CustomButton, { ButtonProps } from "../app/sharedComponent/Button";

export default {
  title: "sharedComponent/CustomButton",
  component: CustomButton,
  argTypes: {
    title: { control: "text" },
    onClick: { action: "clicked" },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => (
    <CustomButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Click Me",
};

export const CustomText = Template.bind({});
CustomText.args = {
  title: "Custom Button Text",
};
