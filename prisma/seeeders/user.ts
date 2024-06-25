import { prisma } from "../../src/db";
import { encryptPass } from "../../src/utils/encrypt";

const seedUsers = async () => {
  await prisma.user.create({
    data: {
      name: "restu",
      email: "restuadmin@mail.com",
      password: await encryptPass("restuadmin"),
      roles: {
        create: [
          {
            role: {
              connectOrCreate: {
                where: {
                  role_name: "admin",
                },
                create: {
                  role_name: "admin",
                },
              },
            },
          },
        ],
      },
    },
  });
};

export default seedUsers;
