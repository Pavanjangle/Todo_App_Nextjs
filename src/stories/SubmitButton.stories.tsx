import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SubmitButton from "../app/sharedComponent/SubmitButton"; 

export default {
  title: "sharedComponent/SubmitButton",
  component: SubmitButton,
  argTypes: {
    title: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
  },
} as Meta;

const Template: StoryFn<{ title: string; type: "button" | "submit" | "reset" }> = (args) => (
    <SubmitButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Submit",
  type: "submit",
};

export const ResetButton = Template.bind({});
ResetButton.args = {
  title: "Reset",
  type: "reset",
};

export const RegularButton = Template.bind({});
RegularButton.args = {
  title: "Click Me",
  type: "button",
};
