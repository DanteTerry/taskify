"use client";

import { WorkspaceData } from "@/types/type";
import Image from "next/image";
import { useRouter } from "next/navigation";

function DocumentTemplate({ document }: { document: WorkspaceData }) {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push(`/workspace/${document?.workspaceId}/${document?.id}`)
      }
      className="relative mt-3 cursor-pointer overflow-hidden rounded-xl border-2 font-space shadow-lg transition-all duration-300 hover:bg-[#1A2735] dark:bg-[#1F1F1F]"
    >
      <Image
        src={document?.coverImage || "/coverImages/ocean.jpg"}
        alt="cover image"
        width={400}
        height={200}
        className="h-[100px] object-cover"
      />
      <div className="mt-5 rounded-b-xl p-4">
        <h2 className="text-xl font-semibold">{document?.documentName}</h2>
      </div>
      <span className="absolute bottom-16 left-4 text-4xl">
        {document?.emoji}
      </span>
    </div>
  );
}
export default DocumentTemplate;
