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
import CreateWorkspace from "../_components/CreateWorkspace";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { cn } from "@/lib/utils";

function Dashboard() {
  const { user } = useUser();
  const { orgId } = useAuth();
  const [workSpacesList, setWorkSpacesList] = useState<DocumentData[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getWorkspace = () => {
    setIsLoading(true);
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
      setIsLoading(false);
    });
  };

  useEffect(() => {
    user && getWorkspace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId, user]);

  return (
    <section
      className={cn(
        `flex w-full flex-col justify-between bg-[#fafafa] px-4 py-2 dark:bg-[#1f1f1f] md:h-screen md:px-2 md:pt-16 lg:px-0`,
        workSpacesList.length < 3 ? "h-screen" : "h-max",
      )}
    >
      <div className="mx-auto h-full w-full px-3 py-6 dark:dark:bg-[#1f1f1f] md:w-full lg:w-3/4 lg:px-0">
        <div className="mx-auto flex h-full w-full flex-col items-center text-black dark:text-white">
          <h2 className="font-space text-xl font-semibold md:text-2xl">
            Welcome {user?.fullName}
          </h2>
          <h2 className="mt-2 font-space text-xl font-semibold md:text-3xl">
            Create Your Ideal Workspace
          </h2>

          {/* Workspace section header */}
          <div className="mt-7 flex items-center gap-1 self-start md:mt-10">
            <TbLayoutDashboardFilled color="#7D7D7D" />
            <h2 className="font-poppins text-sm font-semibold text-[#7D7D7D]">
              Your workspaces
            </h2>
          </div>

          {/* Workspace Grid */}
          <div
            className={cn(
              "mt-6 grid w-full gap-6", // Base grid layout with gaps
              workSpacesList.length === 1
                ? "grid-cols-1"
                : workSpacesList.length === 2
                  ? "grid-cols-2"
                  : workSpacesList.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-4", // Dynamic grid column based on the number of workspaces
              "grid-cols-1",
              "sm:grid-cols-2", // 2 columns for small screens (640px and above)
              "md:grid-cols-3", // 3 columns for medium screens (768px and above)
              "lg:grid-cols-4", // 4 columns for large screens (1024px and above)
            )}
          >
            {/* Loop through the workspaces and display them */}
            {workSpacesList.map((workSpace, index) => (
              <div
                key={index}
                className="relative rounded-xl border shadow-md transition-all duration-300 hover:bg-black/10"
              >
                <Image
                  onClick={() => router.push(`/workspace/${workSpace.id}`)}
                  src={workSpace?.coverImage}
                  width={400}
                  height={200}
                  alt="cover image"
                  className="h-[100px] cursor-pointer rounded-t-2xl object-cover"
                />
                <div className="flex items-center justify-between rounded-b-xl p-4 font-space">
                  <div className="flex gap-3">
                    <span className="text-xl">{workSpace.emoji}</span>
                    <h2 className="flex gap-2 text-lg">
                      {workSpace.workspaceName}
                    </h2>
                  </div>

                  <Popover>
                    <PopoverTrigger>
                      <Ellipsis size={20} />
                    </PopoverTrigger>
                    <PopoverContent className="flex w-max flex-col">
                      <Button className="" variant={"ghost"} size={"sm"}>
                        Edit
                      </Button>
                      <Button className="" variant={"ghost"} size={"sm"}>
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}

            {/* Add Workspace Button as part of the grid */}
            <button
              onClick={() => setIsOpen(true)}
              className="group flex h-auto w-full items-center justify-center rounded-xl border-2 border-slate-300/50 px-5 py-3 shadow-md transition-all duration-300 hover:bg-[#FBEDD6] dark:border-slate-400/5 dark:hover:bg-[#d2f159]/60 hover:dark:text-[#e1e1e1] md:h-[150px] md:w-[150px] lg:h-[165px] lg:w-[165px] lg:px-0"
            >
              <Plus size={50} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
      <CreateWorkspace isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}

export default Dashboard;
