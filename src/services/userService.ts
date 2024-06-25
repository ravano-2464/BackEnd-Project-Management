import { prisma } from "../db";
import { UserCreateDTO, UserUpdateDTO } from "../dtos/userDTO";
import ValidationError from "../errors/ValidationError";
import { encryptPass } from "../utils/encrypt";

export const findAll = async () => {
  return await prisma.user
    .findMany({
      select: {
        id: true,
        name: true,
        email: true,
        roles: {
          select: {
            role: {
              select: {
                role_name: true,
              },
            },
          },
        },
        TeamMembers: {
          select: {
            team: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    })
    .then((users) =>
      users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles.map((userRole) => ({
          role_name: userRole.role.role_name,
        })),
        teams: user.TeamMembers.map((userTeam) => ({
          team_name: userTeam.team.name,
        })),
      }))
    );
};

export const create = async (payload: UserCreateDTO) => {
  const { role_ids, password, ...data } = payload;
  const hashedPassword = await encryptPass(password);
  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      roles: {
        create: role_ids.map((role_id) => ({
          role: {
            connect: {
              id: role_id,
            },
          },
        })),
      },
    },
  });
};

export const findOne = async (id: string) => {
  return await prisma.user
    .findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        roles: {
          select: {
            role: {
              select: {
                role_name: true,
              },
            },
          },
        },
        TeamMembers: {
          select: {
            team: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
    .then((user) => ({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      roles: user?.roles.map((userRole) => ({
        role_name: userRole.role.role_name,
      })),
      teams: user?.TeamMembers.map((userTeam) => ({
        team_name: userTeam.team.name,
      })),
    }));
};

export const update = async (id: string, payload: UserUpdateDTO) => {
  const { role_ids, team_ids, password, ...data } = payload;

  let hashedPassword;
  if (password) {
    hashedPassword = await encryptPass(password);
  }

  const updateData: any = {
    ...data,
  };

  if (hashedPassword) {
    updateData.password = hashedPassword;
  }

  if (role_ids) {
    updateData.roles = {
      deleteMany: {},
      create: role_ids.map((role_id) => ({
        role: {
          connect: {
            id: role_id,
          },
        },
      })),
    };
  }

  if (team_ids) {
    updateData.TeamMembers = {
      deleteMany: {},
      create: team_ids.map((team_id) => ({
        team: {
          connect: {
            id: team_id,
          },
        },
      })),
    };
  }

  return await prisma.user
    .update({
      where: {
        id,
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        roles: {
          select: {
            role: {
              select: {
                role_name: true,
              },
            },
          },
        },
        TeamMembers: {
          select: {
            team: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
    .then((user) => ({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      roles: user?.roles.map((userRole) => ({
        role_name: userRole.role.role_name,
      })),
      teams: user?.TeamMembers.map((userTeam) => ({
        team_name: userTeam.team.name,
      })),
    }));
};

export const remove = async (id: string) => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ValidationError("User not found", "id");
  }
  return await prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};
