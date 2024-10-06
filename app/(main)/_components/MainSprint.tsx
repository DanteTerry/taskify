import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import KanbanSpritBoard from "./KanbanSprintBoard";
import { Dispatch, SetStateAction } from "react";
import CreateIssue from "./CreateIssue";

function MainSprint({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <section className="ml-60 flex h-full w-full flex-grow flex-col gap-6 px-8 py-6">
      <div className="text-xl font-medium">
        <h2>Kanban Board</h2>
      </div>

      <div className="flex items-center gap-5">
        {/* input for search */}
        <div className="relative flex items-center justify-between">
          <Search
            className="absolute left-3 text-slate-700 dark:text-gray-400"
            size={18}
          />
          <input
            id="documentName"
            type="text"
            className="w-full rounded-md bg-gray-200 px-3 py-2 pl-10 text-sm text-black/90 outline-none focus:border-[#D2F159]/50 dark:border-2 dark:bg-[#1f1f1f] dark:text-white dark:placeholder:text-[#80868B]"
          />
        </div>

        {/* collaborators */}
        <div className="flex items-center">
          <div className="h-[30px] w-[30px] overflow-hidden rounded-full border-2 border-white">
            <Image
              src={
                "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100221.jpg?t=st=1728226717~exp=1728230317~hmac=5dd08cd2edd78cb6c4c62b2a20d99b65dbac5e8cd34458400ba17be07ab43a3a&w=740"
              }
              width={30}
              height={30}
              alt="user avatar"
            />
          </div>

          <div className="-ml-1.5 h-[30px] w-[30px] overflow-hidden rounded-full border-2 border-white">
            <Image
              src={
                "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100259.jpg?t=st=1728226738~exp=1728230338~hmac=64e266e595f08f4a90b8451a545d8064d3906e705e77cedfeb771fdd84909f62&w=740"
              }
              width={30}
              height={30}
              alt="user avatar"
            />
          </div>
          <div className="-ml-1.5 h-[30px] w-[30px] overflow-hidden rounded-full border-2 border-white">
            <Image
              src={
                "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100278.jpg?t=st=1728226753~exp=1728230353~hmac=8d7b0bf2092a4ea9ad61543577f4801206bc55f85c1a2b49095b9227d1e59f74&w=740"
              }
              width={30}
              height={30}
              alt="user avatar"
            />
          </div>
          <div className="-ml-1.5 h-[30px] w-[30px] overflow-hidden rounded-full border-2 border-white">
            <Image
              src={
                "https://img.freepik.com/free-photo/view-three-dimensional-cartoon-animated-bird_23-2150946553.jpg?t=st=1728226863~exp=1728230463~hmac=91330683503be23192daed58a25bfae4649c2b7e5b9ae242e98e791d49d0890e&w=740"
              }
              width={30}
              className="object-contain"
              height={30}
              alt="user avatar"
            />
          </div>
        </div>

        {/* only my issues */}
        <div className="flex items-center gap-2">
          <Button variant={"ghost"} className="px-2.5" size={"sm"}>
            Only My Issues
          </Button>
          <Button variant={"ghost"} className="px-2.5" size={"sm"}>
            Recently Updated
          </Button>

          <div className="h-5 w-[1.5px] bg-gray-400"></div>

          <button className="text-xs font-medium">Clear All</button>
        </div>
      </div>

      <KanbanSpritBoard />
      <CreateIssue open={open} setOpen={setOpen} />
    </section>
  );
}
export default MainSprint;
