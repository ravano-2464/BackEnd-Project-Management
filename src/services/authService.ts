import { prisma } from "../db";
import { IAuth } from "../dtos/authDTO";
import ValidationError from "../errors/ValidationError";
import { comparePass, generateToken } from "../utils/encrypt";

export const login = async (payload: IAuth) => {
  const { email, password } = payload;

  const user = await prisma.user
    .findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
        roles: {
          select: {
            role: {
              select: {
                role_name: true,
              },
            },
          },
        },
      },
    })
    .then((user) => ({
      ...user,
      roles: user?.roles.map((userRole) => ({
        role_name: userRole.role.role_name,
      })),
    }));

  if (!user) {
    throw new ValidationError("Email or password is wrong");
  }

  const isMatch = await comparePass(password, user.password as string);

  if (!isMatch) {
    throw new ValidationError("Email or password is wrong");
  }

  const token = generateToken({ id: user.id, roles: user.roles });

  return token;
};

export const me = async (id: string) => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ValidationError("User not found");
  }
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
                team_name: true,
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
        team_name: userTeam.team.team_name,
      })),
    }));
};
