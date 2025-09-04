// src/middleware.ts
export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/home/:path*",
    "/arquivos/:path*",
    "/filmes/:path*",
    "/notas/:path*",
  ],
};