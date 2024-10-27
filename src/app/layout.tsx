import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import { PUBLIC_ROUTES } from "@/constants/routes";
import NavigationBar from "@/components/common/NavigationBar";
import SideBar from "@/components/common/SideBar";
import Logo from "@/components/common/Logo";

export const metadata: Metadata = {
  title: "PivviLilt",
  description: "PivviLilt SNS",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const headerList = headers();
  const currentPath = headerList.get("x-pathname") || "";
  const isPublicRoute = PUBLIC_ROUTES.includes(currentPath);

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col md:flex-row justify-between">
          {!isPublicRoute && (
            <div className="md:h-screen flex flex-col">
              <Logo />
              <div>
                <SideBar />
                <NavigationBar />
              </div>
            </div>
          )}
          <main className="flex justify-center items-center">{children}</main>
          {modal}
          <div id="modal-root"></div>
        </div>
      </body>
    </html>
  );
}
