"use client";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";

function WorkspaceItemList({
  workSpacesList,
}: {
  workSpacesList: DocumentData[];
}) {
  const router = useRouter();
  return (
    <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {workSpacesList.map((workSpace, index) => {
        return (
          <div
            key={index}
            onClick={() => router.push(`/workspace/${workSpace.id}`)}
            className="cursor-pointer rounded-xl border shadow-md transition-all duration-300 hover:bg-black/10"
          >
            <Image
              src={workSpace?.coverImage}
              width={400}
              height={200}
              alt="cover image"
              className="h-[120px] rounded-t-2xl object-cover"
            />
            <div className="rounded-b-xl p-4">
              <h2 className="flex gap-2">
                {workSpace.emoji}
                {workSpace.workspaceName}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default WorkspaceItemList;
