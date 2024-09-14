"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { WorkspaceDocData } from "@/types/type";
import Image from "next/image";
import { useRouter } from "next/navigation";

function DocumentTemplate({ document }: { document: WorkspaceDocData }) {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push(
          `/workspace/${document?.workspaceId}/${document.projectType}/${document?.id}`,
        )
      }
      className={cn(
        `relative mt-3 cursor-pointer overflow-hidden rounded-xl border-2 font-space shadow-lg transition-all duration-300`,
        document?.projectType === "board" &&
          "hover:bg-[#FBEDD6] hover:dark:bg-[#372C1C]",
        document?.projectType === "page" &&
          "hover:bg-[#E0EDFB] hover:dark:bg-[#1A2735]",
        document?.projectType === "sprint" &&
          "hover:bg-[#FDEBEC] hover:dark:bg-[#362422]",
      )}
    >
      {document?.coverImage ? (
        <Image
          src={document?.coverImage || "/coverImages/ocean.jpg"}
          alt="cover image"
          width={400}
          height={200}
          className="h-[100px] object-cover"
        />
      ) : (
        <Skeleton />
      )}

      <div className="mt-5 rounded-b-xl p-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {document?.documentName}
        </h2>
      </div>
      <span className="absolute bottom-[60px] left-4 text-4xl">
        {document?.emoji}
      </span>
    </div>
  );
}
export default DocumentTemplate;
