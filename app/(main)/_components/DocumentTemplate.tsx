"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { WorkspaceDocData } from "@/types/type";
import Image from "next/image";
import { useRouter } from "next/navigation";

function DocumentTemplate({ document }: { document: WorkspaceDocData }) {
  const router = useRouter();
  console.log(document);
  return (
    <div
      onClick={() =>
        router.push(
          `/workspace/${document?.workspaceId}/${document.projectType}/${document?.id}`,
        )
      }
      className={cn(
        `relative mt-3 cursor-pointer overflow-hidden rounded-xl border-2 font-space shadow-lg transition-all duration-300 dark:bg-[#1F1F1F]`,
        document?.projectType === "page" && "hover:bg-[#FFB110]",
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
        <h2 className="text-xl font-semibold">{document?.documentName}</h2>
      </div>
      <span className="absolute bottom-[60px] left-4 text-4xl">
        {document?.emoji}
      </span>
    </div>
  );
}
export default DocumentTemplate;
