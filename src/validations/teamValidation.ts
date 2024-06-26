import { z } from "zod";

export const createTeamSchema = z.object({
  team_name: z.string().min(1, "Team name is required"),
});
