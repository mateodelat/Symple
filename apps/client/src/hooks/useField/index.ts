"use client";
import type React from "react";
import { useState } from "react";
import { type Field, type FieldProps } from "@/types";

export default function useField({
  type,
  placeholder,
  name,
  required,
  fileProps,
  props,
  options,
}: FieldProps): Field {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    setValue(e.target.value);
  };

  const handleErrors = (errors: string[]): void => {
    setErrors(errors);
  };

  const clearErrors = (): void => {
    setErrors([]);
  };

  return {
    type,
    placeholder,
    name,
    required,
    fileProps,
    value,
    onChange,
    props,
    options,
    errors,
    handleErrors,
    clearErrors,
  };
}
