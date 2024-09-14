"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { Ellipsis, Plus } from "lucide-react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import { db } from "@/config/firebaseConfig";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "@/components/UIComponents/SkeletonCard";
import { Button } from "@/components/ui/button";

import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

function Dashboard() {
  const { user } = useUser();
  const { orgId } = useAuth();
  const [workSpacesList, setWorkSpacesList] = useState<DocumentData[]>([]);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const getWorkspace = () => {
    setWorkSpacesList([]);
    const q = query(
      collection(db, "WorkSpaces"),
      where(
        "orgId",
        "==",
        orgId ? orgId : user?.primaryEmailAddress?.emailAddress,
      ),
    );
    onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWorkSpacesList(docs);
    });
  };

  useEffect(() => {
    user && getWorkspace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId, user]);

  // todo add the condition for skeleton if there is no workspace
  return (
    <section className="flex h-full w-full flex-col justify-between bg-[#fafafa] px-4 py-2 dark:bg-[#1f1f1f] md:px-2 md:pt-16 lg:px-0">
      <div className="mx-auto h-full w-full px-3 py-6 dark:dark:bg-[#1f1f1f] md:w-full lg:w-3/4 lg:px-0">
        <div className="mx-auto flex h-full w-full flex-col items-center text-black dark:text-white">
          <h2 className="font-space text-xl font-semibold md:text-2xl">
            Welcome {user?.fullName}
          </h2>
          <h2 className="mt-2 font-space text-xl font-semibold md:text-3xl">
            Create Your Ideal Workspace
          </h2>

          {/* workspace */}
          <div className="mt-7 flex items-center gap-1 self-start md:mt-10">
            <TbLayoutDashboardFilled color="#7D7D7D" />
            <h2 className="font-poppins text-sm font-semibold text-[#7D7D7D]">
              Your workspaces
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {workSpacesList?.length === 0 ? (
              <SkeletonCard />
            ) : (
              <div className="relative">
                {workSpacesList.map((workSpace, index) => {
                  return (
                    <div
                      key={index}
                      className="relative rounded-xl border shadow-md transition-all duration-300 hover:bg-black/10"
                    >
                      <Image
                        onClick={() =>
                          router.push(`/workspace/${workSpace.id}`)
                        }
                        src={workSpace?.coverImage}
                        width={400}
                        height={200}
                        alt="cover image"
                        className="h-[100px] cursor-pointer rounded-t-2xl object-cover"
                      />
                      <div className="flex items-center justify-between rounded-b-xl p-4 font-space">
                        <div className="flex gap-3">
                          <span className="text-xl"> {workSpace.emoji}</span>
                          <h2 className="flex gap-2 text-lg">
                            {workSpace.workspaceName}
                          </h2>
                        </div>

                        <Button
                          onClick={() => setIsOpen((prev) => !prev)}
                          className="z-50"
                          variant={"ghost"}
                          size={"sm"}
                        >
                          <Ellipsis size={20} />
                        </Button>
                      </div>

                      {isOpen && (
                        <div className="absolute -bottom-16 right-2 z-50 flex flex-col gap-1 rounded-md bg-gray-500/30 px-2 py-1">
                          <Button className="" variant={"ghost"} size={"sm"}>
                            Edit
                          </Button>
                          <Button className="" variant={"ghost"} size={"sm"}>
                            Delete{" "}
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => router.push("/create-workspace")}
              className="group flex w-full items-center justify-center gap-6 rounded-xl border-2 border-slate-300/50 px-5 py-3 shadow-md transition-all duration-300 hover:bg-[#FBEDD6] dark:border-slate-400/5 dark:hover:bg-[#d2f159]/60 hover:dark:text-[#e1e1e1] md:px-3 lg:px-6"
            >
              <Plus size={50} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
