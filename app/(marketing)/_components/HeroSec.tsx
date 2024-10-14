import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroStartButton from "./HeroStartButton";

export default function HeroSec() {
  return (
    <header className="relative flex flex-col items-center justify-center gap-2 pb-10 pt-20">
      <div className="flex flex-col items-center gap-1 px-6 sm:gap-3">
        <div className="flex gap-3">
          <h1 className="font-space text-[6.5vw] font-semibold sm:text-5xl md:text-6xl">
            Manage Your
          </h1>
          <Image
            src={"/appImages/header_user.svg"}
            alt={"users image"}
            width={150}
            className="mt-0.5 w-14 -rotate-[7.5deg] sm:w-16 md:w-20"
            height={150}
          />
          <h1 className="font-space text-[6.5vw] font-semibold sm:text-5xl md:text-6xl">
            Team&apos;s
          </h1>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <Image
            src={"/appImages/header_task.svg"}
            alt={"users image"}
            width={150}
            className="w-36 -rotate-[4deg] sm:w-40 md:w-44 lg:w-52"
            height={150}
          />
          <h1 className="font-dancing text-[9vw] font-bold text-[#FC4F24] sm:text-5xl md:text-7xl">
            Productivity
          </h1>
        </div>

        <div className="w-full sm:w-3/4">
          <p className="font-space text-sm text-black/90 dark:text-slate-300 sm:text-lg">
            Plan effectively, track progress, and achieve on-time delivery
            without straining your team.
          </p>
        </div>

        <HeroStartButton />
      </div>

      <div className="mt-14 w-full rounded-xl md:mt-10 md:w-3/4">
        <Image
          src={"/appImages/header.png"}
          alt="taskify image"
          width={0}
          height={0}
          className="flex w-full rounded-3xl md:hidden"
          sizes={"100%"}
        />
        <Image
          src={"/appImages/header_product.jpg"}
          alt="taskify image"
          width={0}
          height={0}
          className="hidden w-full rounded-3xl md:flex"
          sizes={"100%"}
        />
      </div>
    </header>
  );
}
