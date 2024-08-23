"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavBarLinks from "./NavBarLinks";
import DarkModeToggleBtn from "./DarkModeToggleBtn";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/clerk-react";

function NavBar() {
  return (
    <div className="flex w-full items-center justify-between px-5 py-3 sm:px-8 md:px-10 md:py-4 lg:px-20">
      <Link href="/">
        <div className="flex items-center gap-x-2 md:gap-x-2">
          <div className="rounded-md bg-black px-2 py-2 dark:bg-[#1f1f1f]">
            <Image
              src={"/logo/logo.svg"}
              alt="Taskify"
              width={10}
              height={10}
            />
          </div>
          <h1 className="text-lg font-semibold md:text-base">Taskify</h1>
        </div>
      </Link>
      <div className="hidden items-center px-2 font-semibold md:flex md:gap-x-4 lg:gap-x-8">
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Features</Link>
        <Link href={"/"}>Reviews</Link>
        <Link href={"/"}>Pricing</Link>
        <Link href={"/"}>About</Link>
      </div>
      <div className="flex items-center gap-3">
        <SignedIn>
          <DarkModeToggleBtn />
          <UserButton />
        </SignedIn>
        <NavBarLinks />
      </div>
    </div>
  );
}

export default NavBar;
