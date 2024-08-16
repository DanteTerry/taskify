import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavBarLinks from "./NavBarLinks";

async function NavBar() {
  return (
    <div className="flex   w-full items-center justify-between px-5 sm:px-8  md:px-10 lg:px-20 py-3 md:py-4">
      <Link href="/">
        <div className="flex items-center gap-x-2 md:gap-x-2">
          <div className="dark:bg-[#1f1f1f] bg-black  px-2 py-2 rounded-md ">
            <Image
              src={"/logo/logo.svg"}
              alt="Taskify"
              width={10}
              height={10}
            />
          </div>
          <h1 className="text-lg md:text-base  font-semibold">Taskify</h1>
        </div>
      </Link>

      <div className="hidden px-2 md:flex font-semibold   items-center md:gap-x-4 lg:gap-x-8 ">
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Features</Link>
        <Link href={"/"}>Reviews</Link>
        <Link href={"/"}>Pricing</Link>
        <Link href={"/"}>About</Link>
      </div>
      <NavBarLinks />
    </div>
  );
}

export default NavBar;
