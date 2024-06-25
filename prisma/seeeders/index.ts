import seedRoles from "./role";
import seedUsers from "./user";

const seedDatabase = async () => {
  await seedUsers();
  await seedRoles();
};

export default seedDatabase;
