"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import TemplateCard from "@/components/ui/TemplateCard";
import { Plus } from "lucide-react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Dashboard() {
  const { user } = useUser();
  const { orgId } = useAuth();
  const [workSpacesList, setWorkSpacesList] = useState<DocumentData[]>([]);
  const router = useRouter();

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

  return (
    <section className="flex h-full w-full flex-col justify-between bg-[#f6f6f7] px-4 py-2 dark:bg-[#1f1f1f] md:px-2 md:pt-16 lg:px-0">
      <div className="mx-auto h-full w-full px-3 py-6 dark:dark:bg-[#1f1f1f] md:w-full lg:w-3/4 lg:px-0">
        <div className="mx-auto flex h-full w-full flex-col items-center">
          <h2 className="font-space text-xl font-semibold md:text-2xl">
            Welcome {user?.fullName}
          </h2>
          <h2 className="mt-2 font-space text-xl font-semibold md:text-3xl">
            Create Your Ideal Workspace
          </h2>

          {/* <div className="relative mt-10 flex w-full flex-col items-center justify-center gap-3 md:mt-5 md:flex-row md:gap-5">
            <TemplateCard
              onclick={() => router.push("/create-workspace")}
              className="flex items-center justify-center gap-2 hover:bg-[#FBEDD6] dark:hover:bg-[#d2f159]/60 md:w-2/4"
            >
              <Plus
                size={25}
                strokeWidth={3}
                className="text-white transition-all duration-300"
              />

              <div className="flex flex-col items-start justify-center font-inter dark:text-[#E1E1E1]">
                <h3 className="font-space text-xl font-bold">
                  Create Workspace
                </h3>
              </div>
            </TemplateCard>
          </div> */}

          {/* workspace */}
          <div className="mt-7 flex items-center gap-1 self-start md:mt-10">
            <TbLayoutDashboardFilled color="#7D7D7D" />
            <h2 className="font-poppins text-sm font-semibold text-[#7D7D7D]">
              Your workspaces
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                    className="h-[100px] rounded-t-2xl object-cover"
                  />
                  <div className="flex items-center gap-3 rounded-b-xl p-4 font-space">
                    <span className="text-xl"> {workSpace.emoji}</span>
                    <h2 className="flex gap-2 text-lg">
                      {workSpace.workspaceName}
                    </h2>
                  </div>
                </div>
              );
            })}

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
