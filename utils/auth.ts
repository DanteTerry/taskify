import { TSignUp } from "@/types/auth.types";

export const registerUser = async (data: TSignUp) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
