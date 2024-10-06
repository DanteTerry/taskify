"use client";
import MainSprint from "@/app/(main)/_components/MainSprint";
import SprintSidebar from "@/app/(main)/_components/SprintSidebar";
import { useState } from "react";

function SprintPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex h-full w-full">
      <SprintSidebar setOpen={setOpen} />
      <MainSprint open={open} setOpen={setOpen} />
    </div>
  );
}
export default SprintPage;
