export { auth as middleware } from "@/auth";

// Define quais rotas o middleware deve proteger
export const config = {
  matcher: [
    "/home/:path*",
    "/arquivos/:path*",
    "/filmes/:path*",
    "/notas/:path*",
  ],
};
