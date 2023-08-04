"use client";

import { useRef } from "react";

import { Button } from "@components/index";

export default function UploadFile(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input type="file" hidden ref={ref} />
      <Button
        onClick={() => {
          ref.current?.click();
        }}
      >
        Subir archivo
      </Button>
    </div>
  );
}
