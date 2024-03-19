import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {  
  const { pathname }: { pathname: string } = request.nextUrl;  

  // get the token fom cookies
  const cookies = request.headers.get("cookie");
  const token = cookies.split(";").filter((cookie) => cookie.includes("token"))[0]?.replace("token=", "");

  const Redirect = () => {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    } if (!token) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  };
  const authRoutes = ["/auth"];
  const privateRoutes = ["/favourites", "/account"];

  if (!!token && authRoutes.includes(pathname)) {
    return Redirect();
  }
  if (!token && privateRoutes.includes(pathname)) {
    return Redirect();
  }

  // if (!token) {
  //   if (
  //     pathname.includes("/api/admin") ||
  //     pathname.includes("/api/student") ||
  //     pathname.includes("/api/teacher")
  //   ) {
  //     return Response.json(
  //       { success: false, message: "authentication failed" },
  //       { status: 401 }
  //     );
  //   }
  // } else {
  //   if (
  //     (pathname.startsWith("/api/admin") && user.account_type !== "Admin") ||
  //     (pathname.startsWith("/api/teacher") &&
  //       user.account_type !== "Teacher") ||
  //     (pathname.startsWith("/api/student") && user.account_type !== "Student")
  //   ) {
  //     console.log(pathname, user.account_type);
  //     return Response.json(
  //       { success: false, message: "authentication failed" },
  //       { status: 401 }
  //     );
  //   }
  // }
}

export const config = {
  matcher: [
    "/auth",
    "/favourites",
    "/account",
  ],
};