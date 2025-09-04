import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";

// Schema de validação dos dados de Login
const LoginSchema = z.object({
  login: z.string().min(3, "Email ou usuário é obrigatório."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: "/login", // Página de Login customizada
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      // 👇 ESSA PARTE É OBRIGATÓRIA no TS
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        // 1. Validar dados recebidos
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { login, password } = validatedFields.data;

        // 2. Buscar usuário pelo email OU username
        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: login }, { username: login }],
          },
        });

        // 3. Se não achou usuário ou não tem senha salva
        if (!user || !user.passwordHash) return null;

        // 4. Comparar senha informada com hash salvo
        const passwordsMatch = await compare(password, user.passwordHash);
        if (!passwordsMatch) return null;

        // 5. Login bem-sucedido → retorna o usuário
        return user;
      },
    }),
  ],
};
