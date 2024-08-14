import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
function AuthComponent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(`w-full h-full flex justify-end `, className)}>
      <div className="w-[500px]  h-full md:rounded-tl-3xl gap-4 bg-slate-200 dark:bg-[#0D0D10] flex flex-col rounded-none items-center justify-center p-5 md:p-10 md:rounded-bl-3xl">
        <div className="p-2 self-start">
          <Link href={"/"} className="flex gap-3 items-center">
            <Image
              src={"/logo/logo.svg"}
              alt="logo"
              width={30}
              height={30}
              className="dark:flex hidden"
            />
            <Image
              src={"/logo/logo-dark.svg"}
              alt="logo"
              width={30}
              height={30}
              className="flex dark:hidden"
            />
            <h1 className="text-3xl font-space font-semibold">Taskify</h1>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AuthComponent;
