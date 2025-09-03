import { PrismaClient } from "../src/generated/prisma";
import { hash } from "bcryptjs";

// Passo 1: Preparar os Ingredientes
const prisma = new PrismaClient();

// Passo 2: A Lógica Principal
async function main() {
  console.log("Iniciando o script de seed...");

  // --- SEU DESAFIO DE CÓDIGO COMEÇA AQUI ---

  const adminEmail = "admin@lucasmanoel.com";
  const adminUsername = "admin";
  const plainTextPassword = "admin@lucas123"; // Troque por uma senha forte

  // 1. Criptografe a senha que você definiu acima.
  // Dica: use a função `hash(senha, 10)` e não se esqueça do `await`.
  const hashedPassword = await hash(plainTextPassword, 10);

  // 2. Use o comando `upsert` para criar ou atualizar o usuário admin.
  // Dica: a sintaxe é `await prisma.user.upsert({ where: { ... }, update: { ... }, create: { ... } })`
  await prisma.user.upsert({
    where: { email: adminEmail }, // Como vamos procurar o usuário
    update: { passwordHash: hashedPassword }, // Se ele existir, apenas atualize a senha
    create: { // Se ele não existir, crie com todos estes dados
      email: adminEmail,
      username: adminUsername,
      name: "Administrador",
      passwordHash: hashedPassword,
    },
  });

  // --- SEU DESAFIO DE CÓDIGO TERMINA AQUI ---

  console.log("Seed finalizado com sucesso!");
}

// Passo 3: Limpar a Cozinha
main()
  .catch((e) => {
    console.error("Ocorreu um erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Desconectando do banco de dados...");
    await prisma.$disconnect();
  });