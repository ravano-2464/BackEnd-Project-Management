import { prisma } from "../../src/db";

const seedRoles = async () => {
  await prisma.role.createMany({
    data: [
      {
        role_name: "user",
      },
    ],
  });
};

export default seedRoles;
