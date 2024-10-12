"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import KanbanSpritBoard from "./KanbanSprintBoard";
import { Dispatch, SetStateAction, useEffect } from "react";
import CreateIssue, { Collaborator } from "./CreateIssue";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchDocumentInfo,
  fetchSprintDocumentOutput,
} from "@/lib/redux/sprintSlice";
import SprintCollaborators from "./SprintCollaborators";
import { cn } from "@/lib/utils";

function MainSprint({
  openCreateIssue,
  setOpenCreateIssue,
  openCollaborators,
  setOpenCollaborators,
  sprintId,
  isTeamProject,
  isOpen,
}: {
  isOpen?: boolean;
  openCreateIssue: boolean;
  setOpenCreateIssue: Dispatch<SetStateAction<boolean>>;
  openCollaborators: boolean;
  setOpenCollaborators: Dispatch<SetStateAction<boolean>>;
  sprintId: string;
  isTeamProject?: boolean;
}) {
  const dispatch = useDispatch<AppDispatch>();
  console.log(sprintId);
  const collaborators = useSelector(
    (state: RootState) => state.sprint.collaborators,
  );

  useEffect(() => {
    dispatch(fetchSprintDocumentOutput(sprintId as string));
  }, [dispatch, sprintId]);

  return (
    <section
      className={cn(
        `flex h-full w-full flex-grow flex-col gap-6 px-4 py-4 sm:px-6 md:px-8 md:py-6 lg:px-14 lg:py-8 xl:px-16`,

        isOpen ? "ml-60" : "ml-16",
        isTeamProject ? "ml-0" : "",
      )}
    >
      <div className="text-lg font-medium sm:text-xl">
        <h2>Kanban Board</h2>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row md:items-center md:gap-5">
        {/* input for search */}
        <div className="relative flex w-full items-center justify-between sm:w-auto">
          <Search
            className="absolute left-3 text-slate-700 dark:text-gray-400"
            size={18}
          />
          <input
            id="documentName"
            type="text"
            className="w-full rounded-md bg-gray-200 px-3 py-2 pl-10 text-sm text-black/90 outline-none focus:border-[#D2F159]/50 dark:border-2 dark:bg-[#1f1f1f] dark:text-white dark:placeholder:text-[#80868B] sm:w-64"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* collaborators */}
          <div className="flex items-center gap-2">
            {collaborators?.map((collaborator: Collaborator, index) => (
              <div
                key={index}
                className={`h-[30px] w-[30px] overflow-hidden rounded-full border-2 border-white ${index !== 0 ? "ml-[-16px]" : ""}`}
              >
                <Image
                  src={collaborator.picture}
                  width={34}
                  height={34}
                  alt={collaborator.fullName}
                />
              </div>
            ))}
          </div>

          {/* only my issues */}
          <div className="flex items-center gap-2 sm:mt-0">
            <Button variant={"ghost"} className="px-1 md:px-2.5" size={"sm"}>
              Only My Issues
            </Button>
            <Button variant={"ghost"} className="px-1 md:px-2.5" size={"sm"}>
              Recently Updated
            </Button>

            <div className="hidden h-5 w-[1.5px] bg-gray-400"></div>

            <button className="hidden text-xs font-medium">Clear All</button>
          </div>
        </div>
      </div>

      <KanbanSpritBoard sprintId={sprintId} />
      <CreateIssue
        openCreateIssue={openCreateIssue}
        setOpenCreateIssue={setOpenCreateIssue}
      />
      <SprintCollaborators
        setOpenCollaborators={setOpenCollaborators}
        openCollaborators={openCollaborators}
      />
    </section>
  );
}
export default MainSprint;
