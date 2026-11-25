import { prisma } from "./prisma";

export const userData = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  findPublicById: (id: number) => prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, createdAt: true },
  }),
  create: (data: { email: string; passwordHash: string }) => prisma.user.create({
    data,
    select: { id: true, email: true, createdAt: true },
  }),
};
