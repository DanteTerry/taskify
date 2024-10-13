"use client";

import { setDarkMode } from "@/lib/redux/darkModeSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Sun, SunMoon } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function DarkModeToggleBtn() {
  const dispatch = useDispatch<AppDispatch>();
  const { darkMode } = useSelector((state: RootState) => state.darkMode);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      dispatch(setDarkMode(false));
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      dispatch(setDarkMode(true));
    }
  };

  return (
    <button className="hover:bg-transparent" onClick={toggleDarkMode}>
      {darkMode ? (
        <SunMoon className="text-white" size={25} />
      ) : (
        <Sun size={25} className="text-white" />
      )}
    </button>
  );
}

export default DarkModeToggleBtn;
