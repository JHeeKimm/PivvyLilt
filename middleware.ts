import { AUTH_ROUTES, BASE_URL, PUBLIC_ROUTES } from "@/constants/routes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshAccessToken } from "@/lib/auth/tokenService";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

  // 퍼블릭 경로가 아니고, AccessToken이 없고 RefreshToken이 있는 경우: 갱신 시도
  if (!isPublicRoute && !accessToken && refreshToken) {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      const response = NextResponse.next();
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
      return response;
    } catch (error) {
      return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
    }
  }

  // 퍼블릭 경로가 아니고 모든 토큰이 없을 때: 로그인 페이지로 리다이렉트
  if (!isPublicRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
  }

  // 퍼블릭 경로인데 accessToken이 있을 때: main 페이지로 리다이렉트
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL(BASE_URL, request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
