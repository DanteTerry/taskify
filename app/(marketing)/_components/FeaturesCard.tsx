import { cn } from "@/lib/utils";
import { ClipboardCheck } from "lucide-react";
import React from "react";

function FeaturesCard({
  title,
  description,
  className,
  bgColor,
}: {
  title: string;
  description: string;
  className?: string;
  bgColor?: string;
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
    </div>
  );
}

export default FeaturesCard;
