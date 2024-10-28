import React from "react";
import { Button as MantineButton } from "@mantine/core";

export interface ButtonProps {
  title: string;
  onClick: () => void;
}

const CustomButton = ({ title, onClick }: ButtonProps): React.JSX.Element => {
  return (
    <MantineButton onClick={onClick} className="mt-4 mb-3">
      {title}
    </MantineButton>
  );
};

export default CustomButton;
