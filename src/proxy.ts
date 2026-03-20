import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(req: NextRequest) {
    const token = req.cookies?.get("accessToken")?.value;
    // console.log(token);
    const { pathname } = req.nextUrl;

    if(
        (pathname.startsWith("/onboarding/verify-email") || 
        pathname.startsWith("/onboarding/preferences") ||
        pathname.startsWith("/onboarding/success")) &&
        !token
    ) {
        return NextResponse.redirect(new URL("/", req.url));
    }
};

export const config = {
    matcher: [
        "/onboarding/verify-email",
        "/onboarding/preferences",
        "/onboarding/success"
    ]
}