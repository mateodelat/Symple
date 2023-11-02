"use client";

import { type UseToggle } from "@/types";
import { useState } from "react";

export default function useToggle(): UseToggle {
  const [value, setValue] = useState(false);

  const toggle = (val?: boolean): void => {
    setValue(() => val ?? !value);
  };

  return { value, toggle };
}
