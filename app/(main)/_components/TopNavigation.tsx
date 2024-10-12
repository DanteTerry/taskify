"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationSwitcher, UserButton, useUser } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { useParams } from "next/navigation";
import Publish from "./Publish";
import { useEffect, useState } from "react";
import { WorkspaceDocData } from "@/types/type";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { toast } from "sonner";

function TopNavigation({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const { user } = useUser();
  const params = useParams();
  const [documentInfo, setDocumentInfo] = useState<
    WorkspaceDocData | undefined
  >();

  useEffect(() => {
    if (params.documentId) {
      const docRef = doc(db, "WorkSpaceDocuments", params.documentId as string);

      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setDocumentInfo(docSnap.data() as WorkspaceDocData);
        } else {
          toast.error("No such document!");
        }
      });

      return () => unsubscribe();
    }
  }, [params?.documentId]);

  return (
    <div className="flex h-14 w-full items-center justify-between bg-[#283D3B] px-4 py-3 dark:bg-[#161616]">
      <div className="flex items-center gap-2">
        {" "}
        {!isOpen && (
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-gray-600/50"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Menu size={20} className="text-[#f1f1f1]" />
          </Button>
        )}
        <p className="text-white">{documentInfo?.documentName}</p>
      </div>
      <div className="hidden justify-self-center md:block">
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/dashboard"}
          afterLeaveOrganizationUrl={"/dashboard"}
        />
      </div>
      <div className="flex items-center gap-3">
        {documentInfo?.projectType === "page" && (
          <Publish
            documentId={params.documentId as string}
            documentInfo={documentInfo}
          />
        )}

        {user?.primaryEmailAddress?.emailAddress ? (
          <UserButton />
        ) : (
          <Skeleton className="size-7 rounded-full" />
        )}
      </div>
    </div>
  );
}
export default TopNavigation;
