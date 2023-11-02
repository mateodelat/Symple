"use client";

import { type UseWindowResize } from "@/types";
import { useCallback, useEffect, useState } from "react";

export default function useWindowResize(): UseWindowResize {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleWindowResize = useCallback(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return { windowSize };
}
