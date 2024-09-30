import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/config/firebaseConfig";
import { cn } from "@/lib/utils";
import { WorkspaceData, WorkspaceDocData } from "@/types/type";
import { Separator } from "@radix-ui/react-separator";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { BellDot, Menu, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SideNavigation({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const params = useParams();
  const [documents, setDocuments] = useState<WorkspaceDocData[]>();
  const { workspaceId, documentId } = params;
  const [workSpace, setWorkSpace] = useState<WorkspaceData | null>(null);

  const router = useRouter();

  useEffect(() => {
    params?.workspaceId && getDocuments();
    params?.workspaceId && getWorkspaceInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.workspaceId]);

  const getWorkspaceInfo = async () => {
    const workspaceRef = doc(db, "WorkSpaces", workspaceId as string);

    try {
      const docSnap = await getDoc(workspaceRef);
      if (docSnap.exists()) {
        setWorkSpace(docSnap.data() as WorkspaceData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching workspace info:", error);
    }
  };

  const getDocuments = () => {
    if (!params?.workspaceId) return;
    const q = query(
      collection(db, "WorkSpaceDocuments"),
      where("workspaceId", "==", workspaceId),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as WorkspaceDocData[];
      setDocuments(docs);
    });
  };

  return (
    <>
      {/* Sidebar with animation */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-[#283D3B] px-4 py-2 transition-transform duration-300 dark:bg-[#121212] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href={"/dashboard"}
            className="flex items-center justify-center gap-2"
          >
            <div className="rounded-lg bg-black px-2 py-2 dark:block dark:bg-[#1f1f1f]">
              <Image
                src={"/logo/logo.svg"}
                alt="Taskify"
                width={10}
                height={10}
              />
            </div>
            <h1 className="text-base font-bold text-[#f1f1f1]">Taskify</h1>
          </Link>

          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Menu size={20} className="text-[#f1f1f1]" />
          </Button>
        </div>

        <div className="mt-5">
          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-between gap-2 px-2 py-2">
              <h2 className="truncate text-sm font-medium text-gray-300 dark:text-gray-200">
                {workSpace?.workspaceName || "Workspace Name"}
              </h2>
              <Button
                onClick={() => {
                  if (workspaceId || documentId) {
                    router.push(`/workspace/${workspaceId}`);
                  }
                }}
                size={"icon"}
                variant={"ghost"}
                className="rounded-md p-1 transition-all duration-150 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:hover:bg-gray-600"
              >
                <Plus size={18} className="text-gray-300 dark:text-gray-200" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-full w-full" />

            <div className="mt-3 flex w-full flex-col gap-2">
              {documents?.length === undefined ? (
                <Skeleton className="h-[40px]" />
              ) : (
                <div className="flex w-full flex-col gap-3">
                  {documents?.map((doc) => (
                    <Button
                      onClick={() => {
                        router.push(
                          `/workspace/${workspaceId}/${doc.projectType}/${doc?.id}`,
                        );
                      }}
                      key={doc.id}
                      variant={
                        params?.documentId === doc?.id ||
                        params?.boardId === doc?.id
                          ? "default"
                          : "secondary"
                      }
                      className="flex w-full items-center justify-start gap-2"
                    >
                      <span
                        className={cn(
                          `flex items-center justify-center rounded-bl-lg rounded-tl-lg text-lg`,
                        )}
                      >
                        {doc?.emoji}
                      </span>
                      {doc?.documentName}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
export default SideNavigation;
