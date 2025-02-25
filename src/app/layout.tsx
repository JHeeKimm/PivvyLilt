import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import { PUBLIC_ROUTES } from "@/constants/routes";
import NavigationBar from "@/components/common/nav/NavigationBar";
import SideBar from "@/components/common/nav/SideBar";
import Logo from "@/components/common/Logo";
import QueryProvider from "@/providers/QueryProvider";
import { Toast } from "@/components/common/toast/Toast";

export const metadata: Metadata = {
  title: "PivvyLilt",
  description: "가볍고 즐거운 소통의 공간",
  openGraph: {
    title: "PivvyLilt",
    description: "가볍고 즐거운 소통의 공간",
    images: ["/thumbnail.png"],
  },
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
        <QueryProvider>
          <div className="w-full flex flex-col md:flex-row justify-center">
            {!isPublicRoute && (
              <div className="md:h-full md:fixed top-0 left-0 flex flex-col md:shadow">
                <Logo className="p-4" />
                <div className="md:h-full">
                  <SideBar />
                  <NavigationBar />
                </div>
              </div>
            )}
            <main
              className={`w-full flex justify-center items-center ${
                !isPublicRoute ? "md:ml-64" : ""
              }`}
            >
              <Toast />
              {children}
            </main>
            {modal}
            <div id="modal-root"></div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
