import { cn } from "@/lib/utils";
import { CheckCheckIcon, ClipboardCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

function FeaturesCard({
  title,
  description,
  className,
  src,
  bgColor,
  shade,
}: {
  title: string;
  description: string;
  className?: string;
  src: string;
  bgColor?: string;
  shade?: string;
}) {
  return (
    <div
      className={cn(
        `bg-green-500/25 relative flex  flex-col z-50 gap-4 w-full  md:w-3/4 lg:w-[300px] border-2 border-green-500/30  p-1 rounded-2xl`,
        className
      )}
    >
      <div className="px-3 py-3">
        <div className="flex items-start gap-5 ">
          <div className={cn(`p-2 bg-green-500/50 rounded-full`, bgColor)}>
            <ClipboardCheck color="white" size={25} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-1 text-black/90 items-start ">
            <h3 className="text-2xl  font-semibold font-space dark:text-slate-300 text-black/90">
              {title}
            </h3>
            <p className=" text-left dark:text-slate-300  pr-6 font-inter">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex bg-transparent">
        <Image
          src={src}
          alt={"task progress image"}
          width={250}
          height={100}
          className="rounded-tl-xl w-5/6 sm:w-4/6  md:w-5/6 rounded-bl-xl"
        />
      </div>

      <div
        className={cn(
          `bg-gray-300/10 dark:bg-black/5 absolute -left-3 -rotate-6 -z-50 -bottom-3   h-full flex  flex-col gap-4 w-[150px]  p-1 rounded-2xl`
        )}
      ></div>
    </div>
  );
}

export default FeaturesCard;
