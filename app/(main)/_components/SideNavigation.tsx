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
        <aside className="absolute z-50 h-full w-full bg-slate-200 px-6 py-2 dark:bg-[#121212] md:relative md:w-64">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <div className="rounded-lg bg-black px-2 py-2 dark:block dark:bg-[#1f1f1f]">
                <Image
                  src={"/logo/logo.svg"}
                  alt="Taskify"
                  width={10}
                  height={10}
                />
              </div>

              <h1 className="text-base font-bold dark:text-[#f1f1f1]">
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
