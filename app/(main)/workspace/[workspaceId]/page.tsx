"use client";
import Image from "next/image";
import { FileText, Footprints, MoveLeft, Sprout } from "lucide-react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import TemplateCard from "@/components/ui/TemplateCard";
import { useEffect, useState } from "react";
import { WorkspaceDocData } from "@/types/type";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProjectCard from "../../_components/ProjectCard";
import { cn } from "@/lib/utils";
import DocumentTemplate from "../../_components/DocumentTemplate";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "@/components/UIComponents/SkeletonCard";

function WorkSpacePage({ params }: { params: any }) {
  const [documents, setDocuments] = useState<WorkspaceDocData[]>();
  const [projectType, setProjectType] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { workspaceId } = params;
  const router = useRouter();

  useEffect(() => {
    // Create a query to get documents where 'workspaceId' matches the passed workspaceId
    const q = query(
      collection(db, "WorkSpaceDocuments"),
      where("workspaceId", "==", workspaceId),
    );

    // Set up a real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as WorkspaceDocData,
      );
      setDocuments(docs);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [workspaceId]);

  return (
    <div className="flex h-max w-full flex-col justify-between bg-[#f6f6f7] px-4 py-2 dark:bg-[#1f1f1f] sm:h-full md:px-2 md:pt-16 lg:px-0">
      <div className="mx-auto h-full w-full px-3 py-6 dark:dark:bg-[#1f1f1f] md:w-full lg:w-3/4 lg:px-0">
        <div className="mx-auto flex h-full w-full flex-col items-center">
          <div className="relative flex w-full items-center justify-center py-4">
            <Button
              onClick={() => router.push("/dashboard")}
              className="absolute left-0 md:left-0"
              variant="ghost"
              size="icon"
            >
              <MoveLeft />
            </Button>

            <h2 className="font-space text-xl font-semibold md:text-4xl">
              Start with a template
            </h2>
          </div>

          {/* templates */}
          <div className="relative mt-5 flex w-full flex-col items-center justify-center gap-3 md:mt-10 md:flex-row md:gap-5">
            {/* board */}
            <TemplateCard
              onclick={() => {
                setOpen(true);
                setProjectType("board");
              }}
              className="hover:bg-[#FBEDD6] dark:hover:bg-[#372C1C] md:w-2/4"
            >
              <Sprout
                size={35}
                className="text-[#6a6a6a] group-hover:text-[#FFB110]"
              />
              <div className="flex flex-col items-start justify-center font-inter dark:text-[#E1E1E1]">
                <h3 className="font-space font-bold">Board</h3>
                <p className="text-sm text-[#6A6A6A] transition-all duration-200 group-hover:text-[#fabc41] group-hover:dark:text-[#e1e1e1]">
                  Create a board project
                </p>
              </div>
            </TemplateCard>

            {/* document */}
            <TemplateCard
              onclick={() => {
                setOpen(true);
                setProjectType("page");
              }}
              className="hover:bg-[#E0EDFB] hover:dark:bg-[#1A2735] md:w-2/4"
            >
              <FileText
                size={30}
                className="text-[#6a6a6a] group-hover:text-[#2383E2]"
              />
              <div className="flex flex-col items-start justify-center font-inter text-black dark:text-[#E1E1E1]">
                <h3 className="font-space font-bold">Page</h3>
                <p className="text-sm text-[#6A6A6A] transition-all duration-200 group-hover:text-[#2C88E3] group-hover:dark:text-[#E1E1E1]">
                  Create a page project
                </p>
              </div>
            </TemplateCard>

            {/* sprint */}
            <TemplateCard
              onclick={() => {
                setOpen(true);
                setProjectType("sprint");
              }}
              className="hover:bg-[#FDEBEC] dark:hover:bg-[#362422] md:w-2/4"
            >
              <Footprints
                size={30}
                className="text-[#6a6a6a] group-hover:text-[#DE5550]"
              />
              <div className="flex flex-col items-start justify-center font-inter dark:text-[#E1E1E1]">
                <h3 className="font-space font-bold">Sprint</h3>
                <p className="text-sm text-[#6A6A6A] transition-all duration-300 group-hover:text-[#d54f4b] group-hover:dark:text-[#e1e1e1]">
                  Create a sprint project
                </p>
              </div>
            </TemplateCard>

            <Image
              src="/appImages/dashboard_illustration.png"
              alt="dashboard illustration"
              width={250}
              height={250}
              className="absolute -right-2 -top-[113px] hidden h-auto w-auto md:block"
            />
          </div>

          {/* projects */}
          <div className="mt-7 flex items-center gap-1 self-start md:mt-10">
            <TbLayoutDashboardFilled color="#7D7D7D" />
            <h2 className="font-poppins text-sm font-semibold text-[#7D7D7D]">
              Your Projects
            </h2>
          </div>

          {/* project cards */}
          <div className="mt-2 flex w-full justify-start">
            {documents?.length === undefined ? (
              <div className="grid grid-cols-1 place-items-start">
                <SkeletonCard />
              </div>
            ) : (
              <div className="grid w-full grid-cols-1 gap-6 pb-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {documents?.map((document) => (
                  <DocumentTemplate key={document.id} document={document} />
                ))}
              </div>
            )}
          </div>

          {/* <ProjectCard /> */}
          <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent className={cn(`w-[350px] rounded-lg bg-[#161616]`)}>
              <DialogHeader>
                <DialogTitle>
                  {projectType === "board"
                    ? "Board"
                    : projectType === "document"
                      ? "Page"
                      : "Sprint"}{" "}
                  Project
                </DialogTitle>
                <ProjectCard params={params} projectType={projectType} />
                <DialogDescription></DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
export default WorkSpacePage;
