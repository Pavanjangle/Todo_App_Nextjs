import React from "react";
interface ButtonProps {
    title: string;
    onClick: () => void;
  }
  const CustomButton = ({ title, onClick }: ButtonProps): React.JSX.Element => {
    return <button onClick={onClick}  className="bg-blue-600 text-white px-5 py-2 rounded mb-4 w-full">{title}</button>;
  };

export default CustomButton;