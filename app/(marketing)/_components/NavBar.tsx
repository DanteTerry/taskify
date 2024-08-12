import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Sun, SunMoon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DarkModeToggleBtn from "./DarkModeToggleBtn";

function NavBar() {
  return (
    <div className="flex   w-full items-center justify-between px-5 sm:px-8  md:px-10 lg:px-20 py-3 md:py-4">
      <Link href="/">
        <div className="flex items-center gap-x-2 md:gap-x-4">
          <div className="dark:bg-white/10 bg-black  px-3 py-2 rounded-md ">
            <Image
              src={"/logo/logo.svg"}
              alt="Taskify"
              className=" w-auto"
              width={150}
              height={150}
            />
          </div>
          <h1 className="text-lg md:text-2xl font-semibold">Taskify</h1>
        </div>
      </Link>

      <div className="hidden px-2 md:flex font-semibold   items-center md:gap-x-4 lg:gap-x-8 ">
        <Link href={"/"}>Home</Link>

        <Link href={"/"}>Features</Link>

        <Link href={"/"}>Reviews</Link>

        <Link href={"/"}>Pricing</Link>

        <Link href={"/"}>About</Link>
      </div>

      <div className="md:flex hidden  items-center gap-x-3">
        <DarkModeToggleBtn />

        <Link
          className="border-2 font-semibold border-[#f8f8f8]/5 bg-black text-white  dark:bg-[#f8f8f8]/5 p-2 px-3 rounded-lg text-sm"
          href={"/signup"}
        >
          Get Started
        </Link>
        <Link
          className="border-2 font-semibold border-[#f8f8f8]/5 bg-black text-white  dark:bg-[#f8f8f8]/5 p-2 px-3 rounded-lg text-sm"
          href={"/signup"}
        >
          Log In
        </Link>
      </div>
      <div className="flex md:hidden  items-center gap-x-2">
        <DarkModeToggleBtn />

        <Link
          className="border-2 font-semibold border-[#f8f8f8]/5 bg-[#f8f8f8]/5 p-2 px-3 rounded-lg text-sm"
          href={"/signup"}
        >
          Log In
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="outline-none border-2 border-[#f8f8f8]/5 bg-[#f8f8f8]/5 p-2 px-3 rounded-lg
         relative"
          >
            <Menu size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute text-4xl right-0 top-1">
            <DropdownMenuItem>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/">Features</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/">Reviews</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/">Pricing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/">About</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default NavBar;
