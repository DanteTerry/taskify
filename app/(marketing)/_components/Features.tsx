import Image from "next/image";
import React from "react";
import FeaturesCard from "./FeaturesCard";

function Features() {
  return (
    <section className="w-full pb-10 md:px-6">
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          <Image
            src={"/icons/features.svg"}
            alt="features icons"
            width={24}
            height={24}
          />
          <h3 className="font-space text-3xl text-black/90 dark:text-slate-300">
            Features
          </h3>
        </div>

        <h2 className="font-space text-2xl text-black/90 dark:text-slate-300 md:text-3xl lg:text-4xl">
          Elevate Productivity - <br className="flex sm:hidden" /> Enhance
          Collaboration.
        </h2>

        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-5 px-8 sm:w-3/4 md:px-0 lg:gap-10">
          <FeaturesCard
            title={"Task Progress"}
            description={" Track Task Progress and Stay on Target."}
            className="border-[#199719]/50 bg-[#199719]/20"
            src="/appImages/task_progress.svg"
            bgColor="bg-[#199719]/50"
            shade="bg-[#199719]/5"
          />

          <FeaturesCard
            title={"Plan Calender"}
            description={" Seamlessly Plan and Manage Your Calendar."}
            className="border-[#975BEC]/20 bg-[#975BEC]/20"
            src="/appImages/plan_calender.svg"
            bgColor="bg-[#975BEC]/50 "
            shade="bg-[#975BEC]/5"
          />
          <FeaturesCard
            title={"Collaboration"}
            description={" Efficient Collaboration for Maximum Impact."}
            className="border-[#1ABCFE]/20 bg-[#1ABCFE]/20"
            src="/appImages/collaboration.svg"
            bgColor="bg-[#1ABCFE]/50"
            shade="bg-[#1ABCFE]/5"
          />
        </div>
      </div>
    </section>
  );
}

export default Features;
