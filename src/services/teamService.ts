import { prisma } from "../db";
import { TeamDTO } from "../dtos/teamDTO";
import ValidationError from "../errors/ValidationError";

const checkTeamExistence = async (id: string) => {
  const team = await prisma.team.findUnique({
    where: {
      id,
    },
  });

  if (!team) {
    throw new ValidationError("Team not found");
  }

  return team;
};

export const findAll = async () => {
  return await prisma.team.findMany({
    orderBy: {
      updated_at: "desc",
    },
  });
};

export const findOne = async (id: string) => {
  return await checkTeamExistence(id);
};

export const create = async (data: TeamDTO) => {
  return await prisma.team.create({
    data,
  });
};

export const update = async (id: string, data: TeamDTO) => {
  await checkTeamExistence(id);

  return await prisma.team.update({
    where: {
      id,
    },
    data,
  });
};

export const remove = async (id: string) => {
  await checkTeamExistence(id);

  return await prisma.team.delete({
    where: {
      id,
    },
  });
};
