import { z } from "zod";

export const createRoleSchema = z.object({
  role_name: z.string().min(1, "Role name is required"),
});
