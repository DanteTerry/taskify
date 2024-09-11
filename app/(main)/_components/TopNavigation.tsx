"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationSwitcher, UserButton, useUser } from "@clerk/nextjs";
import { PanelsTopLeft } from "lucide-react";

function TopNavigation({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const { user } = useUser();
  return (
    <div className="flex h-14 w-full items-center justify-between bg-[#ffffff] px-4 py-3 dark:bg-[#161616]">
      <div className="flex items-center gap-2">
        {" "}
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
      <div className="hidden justify-self-center md:block">
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/dashboard"}
          afterLeaveOrganizationUrl={"/dashboard"}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-[#283D3B] text-white hover:bg-[#203432]"
        >
          Share
        </Button>
        <Button
          size={"sm"}
          variant={"default"}
          className="bg-[#283D3B] text-white hover:bg-[#203432]"
        >
          Publish
        </Button>
        {user?.primaryEmailAddress?.emailAddress ? (
          <UserButton />
        ) : (
          <Skeleton className="size-7 rounded-full" />
        )}
      </div>
    </div>
  );
}
export default TopNavigation;
