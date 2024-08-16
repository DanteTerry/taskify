import { Button } from "@/components/ui/button";
import { PanelsTopLeft } from "lucide-react";
import Image from "next/image";

function SideNavigation({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  return (
    <>
      {isOpen && (
        <aside className="px-6 w-64 bg-slate-200 dark:bg-[#121212] py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <div className="dark:bg-[#1f1f1f]  dark:block bg-black  px-2 py-2 rounded-lg">
                <Image
                  src={"/logo/logo.svg"}
                  alt="Taskify"
                  width={10}
                  height={10}
                />
              </div>

              <h1 className=" text-base  font-bold dark:text-[#f1f1f1]">
                Taskify
              </h1>
            </div>

            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <PanelsTopLeft size={20} className="dark:text-[#f1f1f1]" />
            </Button>
          </div>
        </aside>
      )}
    </>
  );
}
export default SideNavigation;
