import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeroSec() {
  return (
    <header className="flex relative flex-col pt-20  pb-10 gap-2 justify-center items-center">
      <div className="flex flex-col gap-1 sm:gap-3   px-6 items-center">
        <div className="flex gap-3">
          <h1 className="font-space font-semibold text-[6.5vw] sm:text-5xl md:text-6xl">
            Manage Your
          </h1>
          <Image
            src={"/appImages/header_user.svg"}
            alt={"users image"}
            width={150}
            className="w-14  mt-0.5  sm:w-16 -rotate-[7.5deg] md:w-20"
            height={150}
          />
          <h1 className="font-space  font-semibold text-[6.5vw] sm:text-5xl  md:text-6xl">
            Team&apos;s
          </h1>
        </div>

        <div className="flex gap-3 md:gap-6 items-center">
          <Image
            src={"/appImages/header_task.svg"}
            alt={"users image"}
            width={150}
            className="w-36 sm:w-40 -rotate-[4deg] md:w-44 lg:w-52"
            height={150}
          />
          <h1 className="font-dancing  font-bold text-[9vw] sm:text-5xl md:text-7xl text-[#FC4F24] ">
            Productivity
          </h1>
        </div>

        <div className="w-full sm:w-3/4 ">
          <p className="dark:text-slate-300  font-space text-black/90 text-sm   sm:text-lg ">
            Plan effectively, track progress, and achieve on-time delivery
            without straining your team.
          </p>
        </div>

        <Link href={"/signup"}>
          <Button
            variant={"secondary"}
            className="bg-green-500  mt-4 text-base sm:text-lg hover:bg-green-600 font-spaces md:text-xl text-white rounded-full sm:px-8 sm:py-6"
          >
            Get Started
          </Button>
        </Link>
      </div>

      <div className="w-full md:w-3/4 rounded-xl  mt-14 md:mt-10">
        <Image
          src={"/appImages/header.png"}
          alt="taskify image"
          width={0}
          height={0}
          className="w-full flex md:hidden rounded-3xl"
          sizes={"100%"}
        />
        <Image
          src={"/appImages/header_product.jpg"}
          alt="taskify image"
          width={0}
          height={0}
          className="w-full hidden md:flex rounded-3xl"
          sizes={"100%"}
        />
      </div>
      <Image
        src={"/appImages/headerSide.svg"}
        alt="hero side image"
        width={120}
        height={80}
        className="absolute hidden lg:flex right-0 top-24"
      />
      {/* <Image
        src={"/appImages/headerSideLeft.svg"}
        alt="hero side image"
        width={120}
        height={80}
        className="absolute hidden lg:flex left-0 top-40"
      /> */}
    </header>
  );
}
