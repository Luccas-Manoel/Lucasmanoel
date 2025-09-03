import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Adapter conecta o NextAuth ao banco via Prisma
  adapter: PrismaAdapter(prisma),
  // Estratégia de sessão (jwt é o padrão recomendado)
  session: { strategy: "jwt" },
  // Resto da config (provedores, página de login, etc.)
  ...authConfig,
});
