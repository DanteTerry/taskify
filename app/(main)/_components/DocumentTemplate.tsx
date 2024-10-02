"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { WorkspaceDocData } from "@/types/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { toast } from "sonner";

function DocumentTemplate({ document }: { document: WorkspaceDocData }) {
  const router = useRouter();

  const onDelete = async () => {
    const documentId = document?.id;

    if (!documentId) return;

    try {
      await deleteDoc(doc(db, "WorkSpaceDocuments", documentId));

      if (document.projectType === "page") {
        await deleteDoc(doc(db, "PageDocumentOutput", documentId));
      } else if (document.projectType === "board") {
        await deleteDoc(doc(db, "BoardDocumentOutput", documentId));
      }
      toast("Document deleted successfully");
    } catch (error: any) {
      toast(error.message || "Error deleting document");
    }
  };

  return (
    <div
      onClick={() => {
        router.push(
          `/workspace/${document?.workspaceId}/${document.projectType}/${document?.id}`,
        );
      }}
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

      <div className="mt-5 flex justify-between rounded-b-xl p-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {document?.documentName}
        </h2>
        <Popover>
          <PopoverTrigger
            className="z-50"
            onClick={(e) => e.stopPropagation()} // Stop event propagation here
          >
            <Ellipsis size={20} />
          </PopoverTrigger>
          <PopoverContent
            className="flex w-max flex-col p-1"
            onClick={(e) => e.stopPropagation()} // Stop event propagation here
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(); // Call the delete function
              }}
              className="rounded-sm"
              variant={"ghost"}
              size={"sm"}
            >
              Delete
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <span className="absolute bottom-[60px] left-4 text-4xl">
        {document?.emoji}
      </span>
    </div>
  );
}

export default DocumentTemplate;
