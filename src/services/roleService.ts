import { prisma } from "../db";
import { IRoles } from "../dtos/roleDTO";
import ValidationError from "../errors/ValidationError";

const checkRoleExistence = async (id: string) => {
  const role = await prisma.role.findUnique({
    where: {
      id,
    },
  });

  if (!role) {
    throw new ValidationError("Role not found");
  }
};

export const findAll = async () => {
  return await prisma.role.findMany();
};

export const findOne = async (id: string) => {
  await checkRoleExistence(id);

  return await prisma.role.findUnique({
    where: {
      id,
    },
  });
};

export const remove = async (id: string) => {
  await checkRoleExistence(id);
  return await prisma.role.delete({
    where: {
      id,
    },
  });
};

export const create = async (data: IRoles) => {
  return await prisma.role.create({
    data,
  });
};

export const update = async (id: string, data: IRoles) => {
  await checkRoleExistence(id);
  return await prisma.role.update({
    where: {
      id,
    },
    data,
  });
};
