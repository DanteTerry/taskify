import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function RegisterForm() {
  return (
    <>
      <div className="flex self-start dark:text-slate-300 flex-col">
        <h2 className="text-3xl font-semibold font-space">Create an account</h2>
      </div>

      <form action={""} className="w-full flex flex-col gap-3">
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <label htmlFor="firstName" className="sr-only">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full rounded-lg px-3 py-3 text-black/90 outline-none focus:ring-4 dark:border-none  dark:bg-[#17181B] dark:text-white dark:placeholder:text-[#80868B]"
              placeholder="First name"
            />
          </div>
          <div className="w-full">
            <label htmlFor="lastName" className="sr-only">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full rounded-lg px-3 py-3 text-black/90 outline-none focus:ring-4 dark:border-none dark:bg-[#17181B] dark:text-white dark:placeholder:text-[#80868B]"
              placeholder="Last name"
            />
          </div>
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
        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full rounded-lg px-3 py-3 text-black/90 outline-none focus:ring-4 dark:border-none dark:bg-[#17181B] dark:text-white dark:placeholder:text-[#80868B]"
            placeholder="Confirm your password"
          />
        </div>

        <Button
          className="text-lg font-space dark:bg-[#D2F159] mt-2"
          size={"lg"}
        >
          Register
        </Button>
      </form>

      <Button className="w-full flex items-center gap-3 text-lg font-space ">
        <FcGoogle /> Register with google
      </Button>
    </>
  );
}

export default RegisterForm;
