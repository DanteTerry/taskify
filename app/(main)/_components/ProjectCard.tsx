"use client";
import { useState } from "react";
import { coverImages, getRandomEmoji } from "@/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";

const emojiIcons: string[] = getRandomEmoji();

function ProjectCard({ projectType }: { projectType: string }) {
  const [emoji, setEmoji] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  return (
    <div className="flex flex-col gap-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px]">
          {projectType === "board"
            ? "Board"
            : projectType === "document"
              ? "Page"
              : "Sprint"}{" "}
          Project
        </h3>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="project-name"
          type="text"
          className="mb-3 mt-2 w-full rounded-md px-3 py-2 text-black/90 outline-none dark:border-2 dark:border-[#6A7863] dark:bg-[#1f1f1f] dark:text-white dark:placeholder:text-[#80868B]"
          placeholder="Enter project name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm">Icons</p>

        <div className="mb-2 flex items-center gap-1.5">
          {emojiIcons.map((icon: string, index) => (
            <button key={index} onClick={() => setEmoji(icon)}>
              <span className="text-xl">{icon}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm">Background</p>

        <div className="flex w-full flex-wrap">
          {coverImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image.imageUrl)}
              className={cn(
                `w-max rounded-md border border-transparent p-1 transition-all duration-300 hover:border-white`,
                selectedImage === image.imageUrl && "border-white",
              )}
            >
              <Image
                src={image.imageUrl}
                alt="cover"
                width={200}
                height={200}
                className="h-[37px] w-[37px] rounded-md object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      <button
        className={cn(
          `w-full rounded-md py-2 font-semibold text-slate-200`,
          projectType === "board" && "bg-[#9d6c09]",
          projectType === "document" && "bg-[#933030]",
          projectType === "sprint" && "bg-[#1963ae]",
        )}
      >
        Create Project
      </button>
    </div>
  );
}
export default ProjectCard;
