"use client";

import { useEffect, useState } from "react";
import { loadProgress } from "@/src/lib/progress";

export function useProgress() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const read = () => setProgress(loadProgress());
    read();
    window.addEventListener("klarform-progress", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("klarform-progress", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  return progress;
}
