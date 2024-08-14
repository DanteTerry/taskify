import Image from "next/image";
import React from "react";
import FeaturesCard from "./FeaturesCard";

function Features() {
  return (
    <section className="md:px-6 w-full  pb-10">
      <div className="flex w-full gap-5 flex-col items-center">
        <div className="flex gap-3 items-center">
          <Image
            src={"/icons/features.svg"}
            alt="features icons"
            width={24}
            height={24}
          />
          <h3 className="text-3xl text-black/90  dark:text-slate-300 font-space">
            Features
          </h3>
        </div>

        <h2 className="md:text-3xl  text-2xl lg:text-4xl font-space text-black/90  dark:text-slate-300">
          Elevate Productivity - <br className="flex sm:hidden" /> Enhance
          Collaboration.
        </h2>

        <div className="flex flex-wrap gap-5 lg:gap-10 justify-center items-center mx-auto w-3/4  mt-5  ">
          <FeaturesCard
            title={"Task Progress"}
            description={" Track Task Progress and Stay on Target."}
            className="bg-[#199719]/20 border-[#199719]/50"
            src="/appImages/task_progress.svg"
            bgColor="bg-[#199719]/50"
            shade="bg-[#199719]/5"
          />

          <FeaturesCard
            title={"Plan Calender"}
            description={" Seamlessly Plan and Manage Your Calendar."}
            className="bg-[#975BEC]/20 border-[#975BEC]/20"
            src="/appImages/plan_calender.svg"
            bgColor="bg-[#975BEC]/50 "
            shade="bg-[#975BEC]/5"
          />
          <FeaturesCard
            title={"Collaboration"}
            description={" Efficient Collaboration for Maximum Impact."}
            className="bg-[#1ABCFE]/20 border-[#1ABCFE]/20"
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
