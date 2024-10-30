import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import { PUBLIC_ROUTES } from "@/constants/routes";
import NavigationBar from "@/components/common/NavigationBar";
import SideBar from "@/components/common/SideBar";
import Logo from "@/components/common/Logo";
import Providers from "./provider";

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
        <Providers>
          <div className="flex flex-col md:flex-row justify-center">
            {!isPublicRoute && (
              <div className="md:h-screen flex flex-col">
                <Logo className="p-4" />
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
        </Providers>
      </body>
    </html>
  );
}
