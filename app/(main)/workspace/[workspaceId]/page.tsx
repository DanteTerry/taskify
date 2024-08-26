"use client";
import Image from "next/image";
import { FileText, Footprints, Router, Sprout } from "lucide-react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import TemplateCard from "@/components/ui/TemplateCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WorkspaceData } from "@/types/type";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectCard from "../../_components/ProjectCard";
import { cn } from "@/lib/utils";

function WorkSpacePage() {
  const params = useParams();
  const [documents, setDocuments] = useState<WorkspaceData>();
  const [projectType, setProjectType] = useState<string>("");
  const router = useRouter();

  const [open, setOpen] = useState(false);

  // get document data from firebases
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

  // get document data on page load
  useEffect(() => {
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.workspaceId]);

  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#f6f6f7] px-4 py-2 dark:bg-[#1f1f1f] md:px-2 md:pt-16 lg:px-0">
      <div className="mx-auto h-full w-full px-3 py-6 dark:dark:bg-[#1f1f1f] md:w-full lg:w-3/4 lg:px-0">
        <div className="mx-auto flex h-full w-full flex-col items-center">
          <h2 className="font-space text-xl font-semibold md:text-2xl">
            Welcome Arpit
          </h2>
          <h2 className="font-space text-2xl font-semibold md:text-3xl">
            Start with a template
          </h2>

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
                setProjectType("document");
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
              className="absolute -right-2 -top-[113px] hidden md:block"
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
          <div className="mt-2 grid w-full grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            <div
              onClick={() =>
                router.push(
                  `/workspace/${documents?.workspaceId}/${documents?.id}`,
                )
              }
              className="relative mt-3 cursor-pointer rounded-xl border font-space shadow-lg transition-all duration-300 hover:bg-[#1A2735]"
            >
              <Image
                src={documents?.coverImage}
                width={400}
                height={200}
                alt="cover image"
                className="h-[100px] rounded-t-2xl object-cover"
              />
              <div className="mt-5 rounded-b-xl p-4">
                <h2 className="text-2xl font-semibold">
                  {documents?.documentName}
                </h2>
              </div>
              <span className="absolute bottom-16 left-4 text-4xl">
                {" "}
                {documents?.emoji}
              </span>
            </div>
          </div>
          {/* <ProjectCard /> */}
          <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent className={cn(`w-[350px] bg-[#161616]`)}>
              <ProjectCard projectType={projectType} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
export default WorkSpacePage;
