"use client";

import { Button } from "@/components/ui/button";
import { SignInSchema } from "@/lib/validation";
import { TSignIn } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

function SignInForm() {
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = useForm<TSignIn>({
    resolver: zodResolver(SignInSchema),
  });

  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center justify-center">
        <h2 className="text-3xl text-primary">You are already signed in</h2>
      </div>
    );
  }

  const onLogin = async (data: TSignIn) => {
    const user = {
      email: data.email,
      password: data.password,
    };

    const res = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
    });

    if (res?.ok) {
      reset();
      router.push("/dashboard");
    }

    if (res?.error) {
      toast("Invalid Email or Password");
    }
  };

  return (
    <>
      <div className="flex self-start dark:text-slate-300 flex-col">
        <h2 className="text-2xl font-semibold font-space">
          Log in into your account
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onLogin)}
        className="w-full flex flex-col gap-3"
      >
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
          <p className="text-red-500 text-sm">{errors.email.message}</p>
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
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <Button
          className="text-lg font-space dark:bg-[#D2F159] mt-2"
          size={"lg"}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader className="animate-spin" size={25} />
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <Button
        onClick={async () => {
          const res = await signIn("google");
          if (res) {
            
            router.push("/dashboard");
          }
        }}
        className="w-full flex items-center gap-3 text-lg font-space "
      >
        <FcGoogle /> Sign in with google
      </Button>
    </>
  );
}

export default SignInForm;
