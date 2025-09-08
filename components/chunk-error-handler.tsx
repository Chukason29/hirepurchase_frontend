"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function ChunkErrorHandler() {
  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      if (event?.message?.includes("ChunkLoadError")) {
        console.warn("ChunkLoadError detected. Reloading...");
        toast.warning("Refreshing app to load latest updates…");

        // give toast a second to show before reload
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    };

    window.addEventListener("error", handler);

    return () => {
      window.removeEventListener("error", handler);
    };
  }, []);

  return null; // doesn't render anything
}
