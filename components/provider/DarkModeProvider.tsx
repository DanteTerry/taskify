"use client";
import { setDarkMode } from "@/lib/redux/darkModeSlice";
import { AppDispatch } from "@/lib/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      dispatch(setDarkMode(true));
    }
  }, [dispatch]);
  return <div className="h-full w-full">{children}</div>;
}
export default DarkModeProvider;
