import { Button } from "@/components/ui/button";
import { db } from "@/config/firebaseConfig";
import { cn } from "@/lib/utils";
import { WorkspaceData } from "@/types/type";
import { collection, onSnapshot, query, where } from "firebase/firestore";
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
  const [documents, setDocuments] = useState<WorkspaceData[]>();
  const { workspaceId } = params;

  const router = useRouter();

  useEffect(() => {
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
      })) as WorkspaceData[];
      setDocuments(docs);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [params?.workspaceId]);

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
                  {"Testing Team"}
                </h2>
                <Button size={"icon"} variant={"ghost"}>
                  <Plus size={20} className="text-black dark:text-white" />
                </Button>
              </div>
              <hr />

              <div className="mt-3 flex flex-col gap-2">
                {documents?.map((doc) => (
                  <Button
                    onClick={() => {
                      router.push(`/workspace/${workspaceId}/${doc?.id}`);
                    }}
                    key={doc.id}
                    variant={
                      params?.documentId === doc?.id ? "default" : "secondary"
                    }
                    className="flex items-center justify-start gap-2"
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
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
export default SideNavigation;
