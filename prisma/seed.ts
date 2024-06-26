import { prisma } from "../src/db";
import seedDatabase from "./seeders";

const main = async () => {
  await seedDatabase();
};

main()
  .then(async () => {
    console.log("Seeding successful");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
