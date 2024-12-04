import React from "react";
import { Button as MantineButton } from '@mantine/core';

interface SubmitButtonProps {
  title: string;
  type:"button" | "submit" | "reset"; 
}

const SubmitButton = ({ title, type }: SubmitButtonProps): React.JSX.Element => {
  return (
    
    <MantineButton
      type={type}
      className="mt-4"  
    >
      {title}
    </MantineButton>
    
  );
};

export default SubmitButton;
