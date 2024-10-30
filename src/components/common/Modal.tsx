"use client";

import { ReactNode, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    // 모달 컴포넌트가 마운트 되면 자동으로 보여지게 함
    // 동시에 스크롤 위치가 최상단으로 고정
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  return createPortal(
    <dialog
      // ESC 눌렀을 시, 뒤로 가기(모달 닫기)
      onClose={() => router.back()}
      // 모달의 바깥 클릭 시, 뒤로 가기(모달 닫기)
      onClick={(e) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className="w-4/5 max-w-lg mt-5 rounded-lg border-none bg-white"
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
