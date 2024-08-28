import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import DarkModeToggleBtn from "./DarkModeToggleBtn";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";

function NavBarLinks() {
  return (
    <>
      <div className="hidden items-center gap-x-3 md:flex">
        <SignedOut>
          <DarkModeToggleBtn />
          <Link
            className="rounded-lg border-2 border-[#f8f8f8]/5 bg-black p-2 px-3 text-sm font-semibold text-white dark:bg-[#f8f8f8]/5"
            href={"/sign-in"}
          >
            Log In
          </Link>
        </SignedOut>
      </div>
      <div className="flex items-center gap-x-2 md:hidden">
        {/* <DarkModeToggleBtn /> */}
        <SignedOut>
          <Link
            className="rounded-lg border-2 border-[#f8f8f8]/5 p-2 px-3 text-sm font-semibold dark:bg-[#f8f8f8]/5"
            href={"/sign-in"}
          >
            Log In
          </Link>
        </SignedOut>

        <DropdownMenu>
          <DropdownMenuTrigger className="relative rounded-lg border-2 border-[#f8f8f8]/5 bg-[#f8f8f8]/5 p-2 px-2 outline-none">
            <Menu size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute right-0 top-1">
            <DropdownMenuItem>
              <Link className="font-semibold" href="/">
                Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="font-semibold" href="/">
                Features
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="font-semibold" href="/">
                Reviews
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="font-semibold" href="/">
                Pricing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="font-semibold" href="/">
                About
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default NavBarLinks;
