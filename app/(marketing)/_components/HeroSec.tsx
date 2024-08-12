import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function HeroSec() {
  return (
    <header className="flex flex-col gap-3 justify-center items-center">
      <div className="flex gap-3 items-center">
        <h1 className="font-space font-semibold text-4xl">Manage Your</h1>
        <Image
          src={"/appImages/header_user.svg"}
          alt={"users image"}
          width={150}
          className="w-16"
          height={150}
        />
        <h1 className="font-space font-semibold text-4xl">Team&apos;s</h1>
      </div>

      <div className="flex gap-3 items-center">
        <Image
          src={"/appImages/header_task.svg"}
          alt={"users image"}
          width={150}
          className="w-36"
          height={150}
        />
        <h1 className="font-space font-bold text-3xl text-[#FC4F24] ">
          Productivity
        </h1>
      </div>

      <p className="text-slate-300 text-lg font-semibold">
        Plan effectively, track progress, and achieve on-time delivery without
        straining your team.
      </p>

      <Button
        variant={"secondary"}
        className="bg-green-500 mt-2 hover:bg-green-600 font-spaces text-xl text-white rounded-full px-8 py-6"
        size={"lg"}
      >
        Try Now - Free{" "}
      </Button>
    </header>
  );
}
