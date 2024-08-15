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
          className="bg-white  mt-4 text-base sm:text-lg hover:bg-gray-300 transition-all duration-300 font-spaces md:text-xl text-black rounded-full sm:px-8 sm:py-6"
        >
          Get Started
        </Button>
      ) : (
        <Button
          onClick={() => router.push("/dashboard")}
          variant={"secondary"}
          className="bg-white  mt-4 text-base sm:text-lg hover:bg-gray-300 transition-all duration-300 font-spaces md:text-xl text-black rounded-full sm:px-8 sm:py-6"
        >
          Get Started
        </Button>
      )}
    </>
  );
}
export default HeroStartButton;
