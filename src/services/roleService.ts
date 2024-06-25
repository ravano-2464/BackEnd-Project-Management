import { prisma } from "../db";
import { IRoles } from "../dtos/roleDTO";
import ValidationError from "../errors/ValidationError";

export const findAll = async () => {
  return await prisma.role.findMany();
};

export const findOne = async (id: string) => {
  const isExist = await prisma.role.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ValidationError("Role not found");
  }

  return await prisma.role.findUnique({
    where: {
      id,
    },
  });
};

export const remove = async (id: string) => {
  const isExist = await prisma.role.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ValidationError("Role not found");
  }
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
  const isExist = await prisma.role.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ValidationError("Role not found");
  }
  return await prisma.role.update({
    where: {
      id,
    },
    data,
  });
};
