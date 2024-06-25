import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  role_ids: z.array(z.string().min(1, "Role is required")),
});

export const updateUserSchema = z.object({
  role_ids: z.array(z.string().min(1, "Role is required")).optional(),
  team_ids: z.array(z.string().min(1, "Team is required")).optional(),
  name: z.string().min(1, "Name is required").optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});
