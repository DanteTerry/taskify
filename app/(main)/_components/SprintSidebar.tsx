import { Button } from "@/components/ui/button";
import { Component, Settings, SquarePlus } from "lucide-react";

function SprintSidebar() {
  return (
    <div className="w-60 bg-[#283D3B] px-4 pt-7 dark:bg-[#121212]">
      <div className="flex flex-col items-center justify-center gap-2">
        <Button className="flex w-full gap-2" variant={"secondary"}>
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
