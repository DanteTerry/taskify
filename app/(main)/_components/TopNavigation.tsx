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
      <OrganizationSwitcher
        afterCreateOrganizationUrl={"/dashboards"}
        afterLeaveOrganizationUrl={"/dashboards"}
      />

      <UserButton />
    </div>
  );
}
export default TopNavigation;
