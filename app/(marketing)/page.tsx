"use client";
import { useUser } from "@clerk/nextjs";
import Features from "./_components/Features";
import HeroSec from "./_components/HeroSec";
import NavBar from "./_components/NavBar";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Marketing() {
  const { user, isLoaded } = useUser();

  const router = useRouter();

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
    <div className="flex h-full flex-col">
      <ScrollArea className="h-full w-full">
        <NavBar />
        <div className="flex flex-1 flex-col items-center justify-center gap-y-8 text-center md:justify-center">
          <HeroSec />
          <Features />
        </div>
      </ScrollArea>
    </div>
  );
}
