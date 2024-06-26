import { z } from "zod";

export const createProjectSchema = z.object({
  team_id: z.string().min(1, "Team id is required"),
  project_name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
});

export const updateProjectSchema = z.object({
  team_id: z.string().min(1, "Team id is required").optional(),
  project_name: z.string().min(1, "Project name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
});
