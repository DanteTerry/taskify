"use client";
import { Button } from "@/components/ui/button";
import { useAuth, useOrganization, useUser } from "@clerk/nextjs";
import { AlignLeft, LayoutGrid, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import WorkspaceItemList from "./WorkspaceItemList";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

function WorkSpaceList() {
  const { user } = useUser();

  const [workSpacesList, setWorkSpacesList] = useState<DocumentData[]>([]);

  const { orgId } = useAuth();

  const getWorkspace = async () => {
    setWorkSpacesList([]);
    const q = query(
      collection(db, "WorkSpaces"),
      where(
        "orgId",
        "==",
        orgId ? orgId : user?.primaryEmailAddress?.emailAddress,
      ),
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.data()) {
        setWorkSpacesList((prev) => [...prev, doc.data()]);
      }
    });
  };

  useEffect(() => {
    user && getWorkspace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId, user]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-space text-xl font-semibold md:text-2xl">
          Welcome {user?.fullName}
        </h2>
        {workSpacesList.length > 0 && (
          <Button size={"sm"} className="bg-black dark:bg-white">
            <Plus
              size={20}
              strokeWidth={3}
              color="#1f1f1f"
              className="text-white dark:text-[#1f1f1f]"
            />
          </Button>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <h2 className="font-medium">Workspaces</h2>
        </div>
        <div className="flex gap-2">
          <Button variant={"ghost"} size={"icon"}>
            <LayoutGrid />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <AlignLeft />
          </Button>
        </div>
      </div>

      {workSpacesList.length === 0 ? (
        <div className="my-10 flex flex-col items-center justify-center">
          <Image
            src={"/appImages/empty.svg"}
            width={250}
            height={250}
            alt="empty"
          />
          <h2 className="font-space text-xl">Create a new workspace</h2>
          <Link href="/create-workspace">
            <Button variant={"outline"} size={"lg"} className="mt-3 flex gap-2">
              <Plus size={20} />
              New Workspace
            </Button>
          </Link>
        </div>
      ) : (
        <WorkspaceItemList workSpacesList={workSpacesList} />
      )}
    </>
  );
}
export default WorkSpaceList;
