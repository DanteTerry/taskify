import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { PanelsTopLeft } from "lucide-react";

function TopNavigation({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  return (
    <div className="flex h-14 w-full items-center justify-between bg-[#ffffff] px-4 dark:bg-[#161616]">
      {!isOpen && (
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <PanelsTopLeft size={20} className="text-[#f1f1f1]" />
        </Button>
      )}
      <div className="justify-self-center">
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/dashboards"}
          afterLeaveOrganizationUrl={"/dashboards"}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-black dark:bg-[#D2F159]"
        >
          Share
        </Button>
        <Button size={"sm"} className="text-black dark:bg-[#D2F159]">
          Publish
        </Button>
        <UserButton />
      </div>
    </div>
  );
}
export default TopNavigation;
