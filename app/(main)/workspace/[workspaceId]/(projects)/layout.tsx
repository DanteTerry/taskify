"use client";
import { useState } from "react";
import SideNavigation from "../../../_components/SideNavigation";
import TopNavigation from "../../../_components/TopNavigation";

function MainLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative flex h-screen w-full overflow-hidden dark:bg-[#0D0D10]">
      <SideNavigation setIsOpen={setIsOpen} isOpen={isOpen} />

      <div
        className={`relative flex h-full flex-1 flex-col overflow-auto transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`}
      >
        <TopNavigation setIsOpen={setIsOpen} isOpen={isOpen} />
        <main className="relative flex-1 overflow-y-auto dark:bg-[#1F1F1F]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
