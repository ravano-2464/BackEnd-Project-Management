import { prisma } from "../db";
import { IProject, ProjectUpdateDTO } from "../dtos/projectDTO";
import ValidationError from "../errors/ValidationError";

const checkProjectExistence = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    throw new ValidationError("Project not found");
  }
};

export const findAll = async () => {
  return await prisma.project.findMany();
};

export const create = async (payload: IProject) => {
  return await prisma.project.create({
    data: payload,
  });
};

export const findAllByUser = async (userId: string) => {
  const userWithTeams = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      TeamMembers: {
        include: {
          team: {
            include: {
              projects: true,
            },
          },
        },
      },
    },
  });

  if (!userWithTeams) {
    throw new ValidationError("User not found");
  }

  const projects = userWithTeams.TeamMembers.flatMap(
    (member) => member.team.projects
  );

  return projects;
};

export const findOneByUser = async (userId: string, projectId: string) => {
  const userWithTeams = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      TeamMembers: {
        include: {
          team: {
            include: {
              projects: true,
            },
          },
        },
      },
    },
  });

  if (!userWithTeams) {
    throw new ValidationError("User not found");
  }

  const project = userWithTeams.TeamMembers.flatMap(
    (member) => member.team.projects
  ).find((project) => project.id === projectId);

  if (!project) {
    throw new ValidationError("Project not found");
  }

  return project;
};

export const findOne = async (id: string) => {
  await checkProjectExistence(id);
  return await prisma.project.findUnique({
    where: {
      id,
    },
  });
};

export const update = async (id: string, payload: ProjectUpdateDTO) => {
  await checkProjectExistence(id);
  return await prisma.project.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const remove = async (id: string) => {
  await checkProjectExistence(id);
  return await prisma.project.delete({
    where: {
      id,
    },
  });
};
