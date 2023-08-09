"use client";

import { useEffect, useState } from "react";

import { Button } from "@components/index";
import { type UploadFileProps } from "@/types";
import styles from "./UploadFile.module.scss";

export default function UploadImage({
  text = "Seleccionar archivo",
  id = "fileUpload",
  file,
  handleSelectedFile = () => {},
}: UploadFileProps): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const result = event.target.files?.[0];
    handleSelectedFile(result);
  };

  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById(id);
    setElement(element);
  }, []);

  return (
    <div className={styles.container}>
      <input type="file" hidden id={id} onChange={handleChange} />
      <Button
        onClick={() => {
          element?.click();
        }}
      >
        {text}
      </Button>
      {file === undefined && (
        <span className={styles.container_text}>
          No hay archivos seleccionados...
        </span>
      )}
    </div>
  );
}
