import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/config/firebaseConfig";
import { cn } from "@/lib/utils";
import { WorkspaceData, WorkspaceDocData } from "@/types/type";
import { DialogOverlayProps } from "@radix-ui/react-dialog";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { BellDot, Plus } from "lucide-react";
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
    // Create a query to get documents where 'workspaceId' matches the passed workspaceId
    const q = query(
      collection(db, "WorkSpaceDocuments"),
      where("workspaceId", "==", workspaceId),
    );

    // Set up a real-time listener
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
      {isOpen && (
        <aside className="absolute z-50 h-full w-72 bg-slate-200 px-4 py-2 dark:bg-[#121212] md:relative">
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
              <h1 className="text-base font-bold dark:text-[#f1f1f1]">
                Taskify
              </h1>
            </Link>

            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <BellDot size={20} className="dark:text-[#f1f1f1]" />
            </Button>
          </div>

          <div className="mt-5">
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-between gap-3 px-2 py-2">
                <h2 className="text-sm font-semibold text-black dark:text-white">
                  {workSpace?.workspaceName}
                </h2>
                <Button
                  onClick={() => {
                    if (workspaceId || documentId) {
                      router.push(`/workspace/${workspaceId}`);
                    }
                  }}
                  size={"icon"}
                  variant={"ghost"}
                >
                  <Plus size={20} className="text-black dark:text-white" />
                </Button>
              </div>
              <hr />

              <div className="mt-3 flex w-full flex-col gap-2">
                {documents?.length === undefined ? (
                  <Skeleton className="h-[40px]" />
                ) : (
                  <div className="flex w-full flex-col gap-3">
                    {documents?.map((doc) => (
                      <Button
                        onClick={() => {
                          router.push(`/workspace/${workspaceId}/${doc?.id}`);
                        }}
                        key={doc.id}
                        variant={
                          params?.documentId === doc?.id
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
      )}
    </>
  );
}
export default SideNavigation;
