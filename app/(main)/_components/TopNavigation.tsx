import { Button } from "@/components/ui/button";
import { PanelsTopLeft } from "lucide-react";

function TopNavigation({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  return (
    <div className="flex h-12 w-full items-center bg-[#ffffff] px-4 dark:bg-[#161616]">
      {!isOpen && (
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <PanelsTopLeft size={20} className="text-[#f1f1f1]" />
        </Button>
      )}
    </div>
  );
}
export default TopNavigation;
