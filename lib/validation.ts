import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z.string().min(3, "Name must be more than 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be more than 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be more than 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be more than 8 characters"),
});

export const CreateProjectSchema = z.object({
  documentName: z.string().min(3, "Name must be more than 3 characters"),
});
