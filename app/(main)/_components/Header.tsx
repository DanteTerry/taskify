"use client";
import { OrganizationSwitcher, useAuth, UserButton } from "@clerk/nextjs";
import { PanelsTopLeft } from "lucide-react";

function Header() {
  const { orgId } = useAuth();

  return (
    <div className="flex h-16 w-full items-center justify-between bg-[#ffffff] px-4 shadow-sm dark:bg-[#161616]">
      <PanelsTopLeft size={20} className="text-[#f1f1f1]" />

      <OrganizationSwitcher />

      <UserButton />
    </div>
  );
}
export default Header;
