import { AUTH_ROUTES, BASE_URL, PUBLIC_ROUTES } from "@/constants/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const accessToken = request.cookies.get("accessToken")?.value;

  // AccessToken 없는 경우: 로그인 페이지로 리다이렉트
  if (!isPublicRoute && !accessToken) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
  }

  // 로그인 했는데 퍼블릭 경로인 경우: 메인 페이지로 리다이렉트
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL(BASE_URL, request.nextUrl));
  }

  // 그 외의 경우 요청 진행 (요청 경로를 헤더에 저장)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  return  NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}

export const config = {
  matcher: ["/", "/profile/:path*", "/chat/:path*", "/login", "/signup"],
};
