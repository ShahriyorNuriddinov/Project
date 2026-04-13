import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get("token")?.value;
  if (!tokenCookie) {
    if (pathname === "/login") return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }
  let role = "customer";
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(tokenCookie, secret);
    role = (payload.role as string) || "customer";
  } catch {
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("token");
    return res;
  }
  if (pathname === "/login") {
    if (role === "admin") return NextResponse.redirect(new URL("/admin", request.url));
    if (role === "seller") return NextResponse.redirect(new URL("/seller", request.url));
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname.startsWith("/seller") && role !== "seller" && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
