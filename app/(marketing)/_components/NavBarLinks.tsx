"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import DarkModeToggleBtn from "./DarkModeToggleBtn";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function NavBarLinks() {
  const { data: session } = useSession();
  return (
    <>
      <div className="md:flex hidden  items-center gap-x-3">
        <DarkModeToggleBtn />

        {!session?.user && (
          <>
            <Link
              className="border-2 font-semibold border-[#f8f8f8]/5 bg-black text-white  dark:bg-[#f8f8f8]/5 p-2 px-3 rounded-lg text-sm"
              href={"/signup"}
            >
              Get Started
            </Link>
            <Link
              className="border-2 font-semibold border-[#f8f8f8]/5 bg-black text-white  dark:bg-[#f8f8f8]/5 p-2 px-3 rounded-lg text-sm"
              href={"/signin"}
            >
              Log In
            </Link>
          </>
        )}
      </div>
      <div className="flex md:hidden  items-center gap-x-2">
        <DarkModeToggleBtn />

        {!session?.user && (
          <Link
            className="border-2 font-semibold border-[#f8f8f8]/5  dark:bg-[#f8f8f8]/5 p-2 px-3 rounded-lg text-sm"
            href={"/signin"}
          >
            Log In
          </Link>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger
            className="outline-none border-2 border-[#f8f8f8]/5 bg-[#f8f8f8]/5 p-2 px-3 rounded-lg
         relative"
          >
            <Menu size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute  right-0 top-1">
            <DropdownMenuItem>
              <Link className=" font-semibold" href="/">
                Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className=" font-semibold" href="/">
                Features
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className=" font-semibold" href="/">
                Reviews
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className=" font-semibold" href="/">
                Pricing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className=" font-semibold" href="/">
                About
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button className=" font-semibold" onClick={() => signOut()}>
                Log Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default NavBarLinks;
