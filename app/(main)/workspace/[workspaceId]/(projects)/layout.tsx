"use client";
import { useState } from "react";
import SideNavigation from "../../../_components/SideNavigation";
import TopNavigation from "../../../_components/TopNavigation";

function MainLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="relative flex h-full w-full dark:bg-[#0D0D10]">
      <SideNavigation setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="flex h-full w-full flex-col">
        <TopNavigation setIsOpen={setIsOpen} isOpen={isOpen} />
        <main className="h-full flex-1 dark:bg-[#1F1F1F]">{children}</main>
      </div>
    </div>
  );
}
export default MainLayout;