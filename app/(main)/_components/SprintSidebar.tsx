import { Button } from "@/components/ui/button";
import { Collaborator } from "@/lib/redux/sprintSlice";
import { RootState } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Component, SquarePlus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function SprintSidebar({
  setOpenCreateIssue,
  setOpenCollaborators,
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setOpenCreateIssue: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setOpenCollaborators: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useUser();
  const [isCollaborator, setIsCollaborator] = useState(false);
  const collaborators = useSelector(
    (state: RootState) => state.sprint.collaborators,
  );

  useEffect(() => {
    if (user) {
      setIsCollaborator(
        collaborators.some(
          (collaborator: Collaborator) => collaborator.id === user.id,
        ),
      );
    }
  }, [collaborators, user]);

  return (
    <div
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={cn(
        `transition-width fixed z-50 h-full bg-[#283D3B] px-4 pt-5 duration-300 dark:bg-[#121212]`,
        isOpen ? "w-60" : "w-16",
      )}
    >
      {/* Sidebar Content */}
      <div className="flex flex-col items-center justify-center gap-2">
        {isOpen && (
          <>
            <Button
              className="flex w-full gap-2"
              variant={"secondary"}
              onClick={() => setOpenCreateIssue(true)}
            >
              <SquarePlus size={15} /> {"Create Issue"}
            </Button>

            <Button
              onClick={() => setOpenCollaborators(true)}
              className="flex w-full gap-2"
              variant={"secondary"}
            >
              <Component size={15} /> {"Collaborators"}
            </Button>
          </>
        )}

        {!isOpen && (
          <>
            <Button
              className="flex items-center justify-center"
              variant={"secondary"}
              onClick={() => setOpenCreateIssue(true)}
            >
              <SquarePlus size={15} />
            </Button>

            <Button
              onClick={() => setOpenCollaborators(true)}
              className="flex items-center justify-center"
              variant={"secondary"}
            >
              <Component size={15} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default SprintSidebar;
