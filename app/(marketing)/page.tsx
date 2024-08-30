"use client";
import { useUser } from "@clerk/nextjs";
import Features from "./_components/Features";
import HeroSec from "./_components/HeroSec";
import NavBar from "./_components/NavBar";
import { useRouter } from "next/navigation";

export default function Marketing() {
  const { user } = useUser();
  const router = useRouter();

  if (user?.primaryEmailAddress?.emailAddress) {
    router.push("/dashboard");
  }
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
