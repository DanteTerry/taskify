"use client";

import { Button } from "@/components/ui/button";
import { SmilePlus } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CoverPicker from "../_components/CoverPicker";

function CreateWorkSpace() {
  const [workSpaceName, setWorkSpaceName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCover, setSelectedCover] = useState(
    "/coverImages/lakeMountain.jpg",
  );

  return (
    <section className="flex h-full w-full flex-col justify-between bg-[#f6f6f7] px-4 py-2 dark:bg-black md:px-2 lg:px-0">
      <div className="mx-auto flex h-full w-full items-center justify-center px-3 py-6 dark:dark:bg-black md:w-full lg:w-3/4 lg:px-0">
        <div className="flex w-[600px] flex-col gap-2 rounded-lg bg-[#1f1f1f]">
          <div className="group relative flex items-center justify-center overflow-hidden rounded-tl-lg rounded-tr-lg">
            <Button
              onClick={() => {
                setIsDialogOpen(true);
              }}
              className="absolute hidden h-full w-full items-center rounded-bl-none rounded-br-none border-0 border-none border-transparent bg-transparent p-0 text-lg font-semibold text-white transition-all duration-300 group-hover:flex group-hover:bg-white/20"
            >
              Change cover
            </Button>
            <Image
              src={selectedCover}
              width={400}
              height={400}
              alt="empty"
              className="h-[160px] w-full object-cover object-center"
            />
          </div>
          {/* input section */}
          <div className="mb-4 mt-6 flex flex-col gap-2 px-3">
            <h2 className="text-xl">Create a new workspace</h2>
            <h3 className="text-sm text-[#7a7a7a]">
              This is a shared workspace for team collaboration. You can adjust
              the workspace settings at any time.
            </h3>
            <div className="mt-2 flex items-center gap-3">
              <Button className="" size={"icon"} variant={"ghost"}>
                <SmilePlus />
              </Button>
              <Input
                placeholder="Workspace Name"
                className="border-2"
                onChange={(e) => setWorkSpaceName(e.target.value)}
              />
            </div>
            <div className="mt-2 flex items-center justify-end gap-3">
              <Button className="" disabled={!workSpaceName.length}>
                Create
              </Button>
              <Button variant={"outline"}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
      <CoverPicker
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedCover={selectedCover}
        setSelectedCover={setSelectedCover}
      />
    </section>
  );
}
export default CreateWorkSpace;
