"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUp } from "@/types/auth.types";
import { Loader } from "lucide-react";
import { registerUser } from "@/utils/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const router = useRouter();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<TSignUp>({
    resolver: zodResolver(SignUpSchema),
  });

  const onRegister = async (data: TSignUp) => {
    try {
      const registeredUser = await registerUser(data);
      if (registeredUser) {
        toast("User Created Successfully");
        reset();
        router.push("/signin");
        return;
      }
    } catch (error: any) {
      toast(error.message);
    }
  };

  return (
    <>
      <div className="flex self-start dark:text-slate-300 flex-col">
        <h2 className="text-3xl font-semibold font-space">Create an account</h2>
      </div>

      <form
        onSubmit={handleSubmit(onRegister)}
        className="w-full flex flex-col gap-3"
      >
        <div className="w-full">
          <label htmlFor="name" className="sr-only">
            First name
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-lg px-3 py-3 text-black/90 outline-none focus:ring-4 dark:border-none  dark:bg-[#17181B] dark:text-white dark:placeholder:text-[#80868B]"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />

          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-lg px-3 py-3 text-black/90 outline-none focus:ring-4 dark:border-none dark:bg-[#17181B] dark:text-white dark:placeholder:text-[#80868B]"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-lg px-3 py-3 text-black/90 outline-none focus:ring-4 dark:border-none dark:bg-[#17181B] dark:text-white dark:placeholder:text-[#80868B]"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full rounded-lg px-3 py-3 text-black/90 outline-none focus:ring-4 dark:border-none dark:bg-[#17181B] dark:text-white dark:placeholder:text-[#80868B]"
            placeholder="Confirm your password"
            {...register("confirmPassword", { required: true })}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}

        <Button
          className="text-lg font-space dark:bg-[#D2F159] mt-2"
          size={"lg"}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader className="animate-spin" size={25} />
          ) : (
            "Register"
          )}
        </Button>
      </form>

      <Button className="w-full flex items-center gap-3 text-lg font-space ">
        <FcGoogle /> Register with google
      </Button>
    </>
  );
}

export default RegisterForm;
