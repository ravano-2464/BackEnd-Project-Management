import { prisma } from "../db";

export const findAll = async () => {
  return await prisma.user.findMany();
};
