import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match every path except:
     *  - _next/static, _next/image
     *  - favicons & icons
     *  - the public api/health endpoint
     *
     * We still want middleware on most routes so the auth cookie stays fresh.
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)",
  ],
};
