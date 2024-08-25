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
          variant={"secondary"}
          className="mt-4 rounded-full bg-white font-space text-base text-black transition-all duration-300 hover:bg-gray-300 sm:px-8 sm:py-6 sm:text-lg md:text-xl"
        >
          Get Started
        </Button>
      </SignedOut>

      <SignedIn>
        <Button
          onClick={() => router.push("/dashboards")}
          variant={"secondary"}
          className="mt-4 rounded-full bg-white font-space text-base text-black transition-all duration-300 hover:bg-gray-300 sm:px-8 sm:py-6 sm:text-lg md:text-xl"
        >
          Get Started
        </Button>
      </SignedIn>
    </>
  );
}
export default HeroStartButton;
