"use client";

import { type UseFile } from "@/types";
import { useState } from "react";

export default function useFile(): UseFile {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleSelectedFile = (result: File | undefined): void => {
    setFile(result);
  };

  return { file, handleSelectedFile };
}
