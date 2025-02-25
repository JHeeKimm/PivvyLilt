"use client";

import { ReactNode, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handleClose]);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60"
      onClick={handleClose}
    >
      <div
        className="w-4/5 max-w-md rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
