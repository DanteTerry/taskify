import { SignInSchema, SignUpSchema } from "@/lib/validation";
import { z } from "zod";

export type TSignUp = z.infer<typeof SignUpSchema>;

export type TSignIn = z.infer<typeof SignInSchema>;
