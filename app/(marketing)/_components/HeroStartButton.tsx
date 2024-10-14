"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function HeroStartButton() {
  const router = useRouter();
  return (
    <>
      <SignedOut>
        <Button
          onClick={() => router.push("/sign-up")}
          className="mt-4 rounded-full bg-black font-space text-base text-white transition-all duration-300 dark:bg-white dark:text-black sm:px-8 sm:py-6 sm:text-lg md:text-xl"
        >
          Get Started
        </Button>
      </SignedOut>

      <SignedIn>
        <Button
          onClick={() => router.push("/dashboard")}
          className="mt-4 rounded-full bg-black font-space text-base transition-all duration-300 dark:bg-white dark:text-black sm:px-8 sm:py-6 sm:text-lg md:text-xl"
        >
          Get Started
        </Button>
      </SignedIn>
    </>
  );
}
export default HeroStartButton;
