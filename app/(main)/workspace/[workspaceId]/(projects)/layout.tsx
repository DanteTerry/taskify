"use client";
import { useEffect, useState } from "react";
import SideNavigation from "../../../_components/SideNavigation";
import TopNavigation from "../../../_components/TopNavigation";
import { setDarkMode } from "@/lib/redux/darkModeSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";

function MainLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      dispatch(setDarkMode(true));
    }
  }, [dispatch]);

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
