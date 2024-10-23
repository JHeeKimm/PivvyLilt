import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-2 gap-y-10 flex flex-col justify-center items-center h-full">
      {children}
    </div>
  );
}
