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
        `relative z-50 flex w-full flex-col gap-4 rounded-2xl border-2 border-green-500/30 bg-green-500/25 p-1 md:w-3/4 lg:w-[300px]`,
        className,
      )}
    >
      <div className="px-3 py-3">
        <div className="flex items-start gap-5">
          <div className={cn(`rounded-full bg-green-500/50 p-2`, bgColor)}>
            <ClipboardCheck color="white" size={25} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col items-start gap-1 text-black/90">
            <h3 className="font-space text-2xl font-semibold text-black/90 dark:text-slate-300">
              {title}
            </h3>
            <p className="pr-6 text-left font-inter dark:text-slate-300">
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
          className="w-5/6 rounded-bl-xl rounded-tl-xl sm:w-4/6 md:w-5/6"
        />
      </div>

      <div
        className={cn(
          `absolute -bottom-3 -left-3 -z-50 flex h-full w-[150px] -rotate-6 flex-col gap-4 rounded-2xl bg-gray-300/10 p-1 dark:bg-black/5`,
        )}
      ></div>
    </div>
  );
}

export default FeaturesCard;
