"use client";
import { useUser } from "@clerk/nextjs";
import Features from "./_components/Features";
import HeroSec from "./_components/HeroSec";
import NavBar from "./_components/NavBar";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useEffect } from "react";
import { setDarkMode } from "@/lib/redux/darkModeSlice";

export default function Marketing() {
  const { user, isLoaded } = useUser();

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { darkMode } = useSelector((state: RootState) => state.darkMode);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      dispatch(setDarkMode(true));
    }
  }, [dispatch]);

  if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
    router.push("/dashboard");
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-[#1F1F1F]">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Loader className="h-16 w-16 animate-spin rounded-full" />
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-[#1F1F1F]">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Loader className="h-16 w-16 animate-spin rounded-full" />
        </div>
      </div>
    );
  }

  // Render your marketing page if user is not logged in
  return (
    <div className="flex flex-col selection:min-h-full">
      <NavBar />
      <div className="flex flex-1 flex-col items-center justify-center gap-y-8 text-center md:justify-center">
        <HeroSec />
        <Features />
      </div>
    </div>
  );
}
