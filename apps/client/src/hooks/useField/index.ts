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
  initialValue = "",
}: FieldProps): Field {
  const [value, setValue] = useState(initialValue);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
  ): void => {
    setValue(() => {
      if (typeof e === "string") return e;
      return e.target.value;
    });
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
    initialValue,
  };
}
