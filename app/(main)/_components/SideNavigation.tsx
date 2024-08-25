import { Button } from "@/components/ui/button";
import { db } from "@/config/firebaseConfig";
import { WorkspaceData } from "@/types/type";
import { Emoji } from "emoji-picker-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { BellDot, PanelsTopLeft, Plus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function SideNavigation({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const params = useParams();
  const [documents, setDocuments] = useState<WorkspaceData>();

  const getDocument = () => {
    const q = query(
      collection(db, "WorkSpaceDocuments"),
      where("workspaceId", "==", Number(params?.workspaceId)),
    );
    onSnapshot(q, (querySnapShot) => {
      querySnapShot.forEach(async (doc) => {
        if (doc.exists()) {
          setDocuments(doc.data() as WorkspaceData);
        }
      });
    });
  };

  useEffect(() => {
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.workspaceId]);

  return (
    <>
      {isOpen && (
        <aside className="absolute z-50 h-full w-72 bg-slate-200 px-4 py-2 dark:bg-[#121212] md:relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
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
            </div>

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
                <h2 className="text-sm text-black dark:text-white">
                  {documents?.documentName}
                </h2>
                <Button size={"icon"} variant={"ghost"}>
                  <Plus size={20} className="text-black dark:text-white" />
                </Button>
              </div>
              <hr />

              <div className="mt-3 flex flex-col gap-2">
                <Button
                  variant={"secondary"}
                  className="flex items-center justify-start gap-2"
                >
                  <Emoji unified={documents?.emoji} size={20} />
                  {documents?.documentName}
                </Button>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
export default SideNavigation;
