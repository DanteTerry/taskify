"use client";
import MainSprint from "@/app/(main)/_components/MainSprint";
import SprintSidebar from "@/app/(main)/_components/SprintSidebar";
import { useParams } from "next/navigation";
import { useState } from "react";

function SprintPage() {
  const [openCreateIssue, setOpenCreateIssue] = useState(false);
  const [openCollaborators, setOpenCollaborators] = useState(false);
  const { sprintId } = useParams();
  return (
    <div className="relative flex h-full w-full">
      <SprintSidebar
        setOpenCollaborators={setOpenCollaborators}
        setOpenCreateIssue={setOpenCreateIssue}
      />
      <MainSprint
        isTeamProject={false}
        sprintId={sprintId as string}
        openCreateIssue={openCreateIssue}
        setOpenCreateIssue={setOpenCreateIssue}
        openCollaborators={openCollaborators}
        setOpenCollaborators={setOpenCollaborators}
      />
    </div>
  );
}
export default SprintPage;
