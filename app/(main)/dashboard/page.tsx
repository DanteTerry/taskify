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
  deleteDoc,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

function Dashboard() {
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const { orgId } = useAuth();
  const [workSpacesList, setWorkSpacesList] = useState<DocumentData[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<"add" | "update">("add");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // For delete confirmation dialog
  const [selectedWorkspace, setSelectedWorkspace] = useState<
    DocumentData | undefined
  >();

  const getWorkspace = () => {
    if (!user || !isUserLoaded || !isSignedIn) return; // Check that user data is available and loaded

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

  // Run when the user data is fully loaded and user is signed in
  useEffect(() => {
    if (isUserLoaded && isSignedIn) {
      getWorkspace();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoaded, isSignedIn, user]); // Include dependencies to re-run when user is loaded

  // Helper function to delete all documents in a specified collection based on workspaceId
  const deleteDocumentsByWorkspaceId = async (
    workspaceId: string,
    collectionName: string,
  ) => {
    const docsQuery = query(
      collection(db, collectionName),
      where("workspaceId", "==", workspaceId),
    );
    const docsSnapshot = await getDocs(docsQuery);

    const deletePromises = docsSnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  };

  const onDeleteWorkspace = async (workspaceId: string) => {
    try {
      // Delete all related documents in the specified collections
      await Promise.all([
        deleteDocumentsByWorkspaceId(workspaceId, "WorkSpaceDocuments"),
        deleteDocumentsByWorkspaceId(workspaceId, "PageDocumentOutput"),
        deleteDocumentsByWorkspaceId(workspaceId, "BoardDocumentOutput"),
      ]);

      // Finally, delete the workspace itself
      await deleteDoc(doc(db, "WorkSpaces", workspaceId));

      toast.success("Workspace and documents deleted!");
    } catch (error) {
      toast.error("Error deleting workspace and documents.");
    } finally {
      setIsDeleteDialogOpen(false); // Close the dialog after deletion
    }
  };
  useEffect(() => {
    async function saveUser() {
      if (user) {
        const id = user?.id;
        try {
          await setDoc(doc(db, "Users", id), {
            id: id,
            fullName: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            picture: user.imageUrl,
          });
        } catch (error: any) {
          toast(error.message);
        }
      }
    }

    saveUser();
  }, [user]);

  useEffect(() => {
    async function createTeamWorkspace() {
      try {
        if (user) {
          const id = user?.id;
          await setDoc(doc(db, "WorkSpaces", id), {
            workspaceName: "Team Workspace",
            emoji: "👨‍💻",
            coverImage:
              "https://utfs.io/f/wp7wZZqvVF0Ikwcmq8pMGiXQoJkLxg2rSzqbCA1Nha75wRjU",
            createdBy: user?.primaryEmailAddress?.emailAddress,
            id: id,
            orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress,
            teamWorkspace: true,
          });
        }
      } catch (error: any) {
        toast(error.message);
      }
    }

    createTeamWorkspace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <section
      className={cn(
        `flex w-full flex-col justify-between bg-[#fafafa] px-4 py-2 dark:bg-[#1f1f1f] md:h-screen md:px-2 md:pt-16 lg:px-0`,
        workSpacesList.length < 3 ? "h-screen" : "h-max",
      )}
    >
      <div className="mx-auto h-full w-full px-3 py-6 dark:bg-[#1f1f1f] md:w-full lg:w-3/4 lg:px-0">
        <div className="mx-auto flex h-full w-full flex-col items-center text-black dark:text-white">
          <h2 className="font-space text-xl font-semibold md:text-2xl">
            Welcome {user?.fullName}
          </h2>
          <h2 className="mt-2 font-space text-xl font-semibold md:text-3xl">
            Create Your Ideal Workspace
          </h2>

          <div className="mt-7 flex items-center gap-1 self-start md:mt-10">
            <TbLayoutDashboardFilled color="#7D7D7D" />
            <h2 className="font-poppins text-sm font-semibold text-[#7D7D7D]">
              Your workspaces
            </h2>
          </div>

          <div
            className={cn(
              "mt-6 grid w-full gap-6",
              "grid-cols-1",
              "sm:grid-cols-2",
              "md:grid-cols-3",
              "lg:grid-cols-4",
            )}
          >
            {/* Conditionally render the SkeletonCard when loading */}
            {isLoading ? (
              <div className="relative col-span-1 rounded-xl border shadow-md transition-all duration-300 sm:col-span-1 md:col-span-1 lg:col-span-1">
                <SkeletonCard />
              </div>
            ) : (
              workSpacesList.map((workSpace) => (
                <div
                  onClick={() => router.push(`/workspace/${workSpace.id}`)}
                  key={workSpace.id}
                  className="relative cursor-pointer rounded-xl border shadow-md transition-all duration-300 hover:bg-black/10"
                >
                  <Image
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

                    {workSpace?.id !== user?.id && (
                      <Popover>
                        <PopoverTrigger onClick={(e) => e.stopPropagation()}>
                          <Ellipsis size={20} />
                        </PopoverTrigger>
                        <PopoverContent className="flex w-max flex-col p-1">
                          <Button
                            className="rounded-sm"
                            variant={"ghost"}
                            size={"sm"}
                            onClick={() => {
                              setSelectedWorkspace(workSpace);
                              setAction("update");
                              setIsOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="rounded-sm"
                            variant={"ghost"}
                            size={"sm"}
                            onClick={() => {
                              setSelectedWorkspace(workSpace);
                              setIsDeleteDialogOpen(true); // Open delete confirmation dialog
                            }}
                          >
                            Delete
                          </Button>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </div>
              ))
            )}

            <CreateWorkspace
              selectedWorkspace={selectedWorkspace}
              action={action}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setAction={setAction}
            />

            <button
              onClick={() => {
                setAction("add");
                setIsOpen(true);
              }}
              className="group flex h-auto w-full items-center justify-center rounded-xl border-2 border-slate-300/50 px-5 py-3 shadow-md transition-all duration-300 hover:bg-[#FBEDD6] dark:border-slate-400/5 dark:hover:bg-[#d2f159]/60 hover:dark:text-[#e1e1e1] md:h-[150px] md:w-[150px] lg:h-[165px] lg:w-[165px] lg:px-0"
            >
              <Plus size={50} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md rounded-lg p-6 text-white shadow-xl dark:bg-[#0a0a0a]">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
          </div>
          <p className="mt-2 text-gray-400">
            Are you sure you want to delete this workspace? This will delete all
            documents within it.
          </p>
          <div className="mt-6 flex justify-end">
            <Button
              variant="ghost"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="rounded-md border border-gray-700 px-4 py-2 transition-colors hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              className="ml-2 rounded-md bg-red-600 px-4 py-2 text-white shadow transition-colors hover:bg-red-700"
              onClick={() => {
                if (selectedWorkspace) {
                  onDeleteWorkspace(selectedWorkspace.id);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default Dashboard;
