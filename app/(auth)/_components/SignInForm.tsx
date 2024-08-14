import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function SignInForm() {
  return (
    <>
      <div className="flex self-start dark:text-slate-300 flex-col">
        <h2 className="text-2xl font-semibold font-space">
          Log in into your account
        </h2>
      </div>

      <form action={""} className="w-full flex flex-col gap-3">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-lg px-3 py-3 text-black/90 outline-none focus:ring-4 dark:border-none dark:bg-[#17181B] dark:text-white dark:placeholder:text-[#80868B]"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-lg px-3 py-3 text-black/90 outline-none focus:ring-4 dark:border-none dark:bg-[#17181B] dark:text-white dark:placeholder:text-[#80868B]"
            placeholder="Enter your password"
          />
        </div>

        <Button
          className="text-lg font-space dark:bg-[#D2F159] mt-2"
          size={"lg"}
        >
          Sign in
        </Button>
      </form>

      <Button className="w-full flex items-center gap-3 text-lg font-space ">
        <FcGoogle /> Sign in with google
      </Button>
    </>
  );
}

export default SignInForm;
