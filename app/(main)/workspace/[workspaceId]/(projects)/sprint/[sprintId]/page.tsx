"use client";
import MainSprint from "@/app/(main)/_components/MainSprint";
import SprintSidebar from "@/app/(main)/_components/SprintSidebar";
import { useState } from "react";

function SprintPage() {
  const [openCreateIssue, setOpenCreateIssue] = useState(false);
  const [openCollaborators, setOpenCollaborators] = useState(false);
  return (
    <div className="relative flex h-full w-full">
      <SprintSidebar
        setOpenCollaborators={setOpenCollaborators}
        setOpenCreateIssue={setOpenCreateIssue}
      />
      <MainSprint
        openCreateIssue={openCreateIssue}
        setOpenCreateIssue={setOpenCreateIssue}
        openCollaborators={openCollaborators}
        setOpenCollaborators={setOpenCollaborators}
      />
    </div>
  );
}
export default SprintPage;
