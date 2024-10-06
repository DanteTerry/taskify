import { Button } from "@/components/ui/button";
import { Component, Settings, SquarePlus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

function SprintSidebar({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed h-full w-60 bg-[#283D3B] px-4 pt-7 dark:bg-[#121212]">
      <div className="flex flex-col items-center justify-center gap-2">
        <Button
          className="flex w-full gap-2"
          variant={"secondary"}
          onClick={() => setOpen(true)}
        >
          <SquarePlus size={15} /> {"Create Issue"}
        </Button>

        <Button className="flex w-full gap-2" variant={"secondary"}>
          <Component size={15} /> {"Collaborators"}
        </Button>
        <Button className="flex w-full gap-2" variant={"secondary"}>
          <Settings size={15} /> {"Project setting"}
        </Button>
      </div>
    </div>
  );
}
export default SprintSidebar;
