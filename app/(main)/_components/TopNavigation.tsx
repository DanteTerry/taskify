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
    <div className="w-full px-4 h-12 bg-[#ffffff] dark:bg-[#161616] flex items-center">
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
