"use client";
import {TextInput } from "@mantine/core";
import React from "react";
import { InputHTMLAttributes} from 'react';
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeHolder: string;
    label?: string;
    error?: string;
    name: "taskName";
    register: UseFormRegister<{ taskName: string}>;
    validate?: (value: string) => boolean | string;
  }

const CustomInput = ({ placeHolder,label, error, register, name, validate}: InputProps): React.JSX.Element => {
  return (
      <TextInput
        label={label} 
        placeholder={placeHolder}
        {...register(name, {validate})}
        
        error={error} 
      />
  );
};

export default CustomInput;
