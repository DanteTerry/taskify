"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function HeroStartButton() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {!session?.user?.name ? (
        <Button
          onClick={() => router.push("/signup")}
          variant={"secondary"}
          className="mt-4 rounded-full bg-white font-space text-base text-black transition-all duration-300 hover:bg-gray-300 sm:px-8 sm:py-6 sm:text-lg md:text-xl"
        >
          Get Started
        </Button>
      ) : (
        <Button
          onClick={() => router.push("/dashboard")}
          variant={"secondary"}
          className="mt-4 rounded-full bg-white font-space text-base text-black transition-all duration-300 hover:bg-gray-300 sm:px-8 sm:py-6 sm:text-lg md:text-xl"
        >
          Get Started
        </Button>
      )}
    </>
  );
}
export default HeroStartButton;
