"use client";
import type React from "react";
import { useState } from "react";
import { type Field, type FieldProps } from "@/types";

export default function useField({
  type,
  placeholder,
  name,
  required,
  props,
  options,
}: FieldProps): Field {
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return { type, placeholder, name, required, value, onChange, props, options };
}
