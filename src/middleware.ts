import { AUTH_ROUTES } from "@/constants/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  // AccessToken 없는 경우: 로그인 필요
  if (!accessToken) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
  }

  // 요청 진행
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*", "/chat/:path*"],
};
