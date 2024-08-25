"use client";
import { Button } from "@/components/ui/button";
import CoverPicker from "./CoverPicker";
import Image from "next/image";
import { useState } from "react";
import EmojiPickerComponent from "@/components/UIComponents/EmojiPickerComponent";
import { Emoji } from "emoji-picker-react";
import { SmilePlus } from "lucide-react";

function PageDocumentInfo() {
  const [emojiIcon, setEmojiIcon] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCover, setSelectedCover] = useState(
    "/coverImages/lakeMountain.jpg",
  );
  return (
    <div className="relative h-full w-full dark:bg-[#1F1F1F]">
      {/* cover image */}
      <div className="group relative flex items-center justify-center overflow-hidden rounded-xl rounded-tl-none rounded-tr-none">
        <Button
          onClick={() => {
            setIsDialogOpen(true);
          }}
          className="absolute hidden h-full w-full items-center border-0 border-none border-transparent bg-transparent p-0 text-lg font-semibold text-white transition-all duration-300 group-hover:flex group-hover:bg-white/20"
        >
          Change cover
        </Button>
        <Image
          src={selectedCover}
          width={400}
          height={400}
          alt="cover image"
          sizes="100%"
          className="h-[200px] w-full object-cover object-center"
        />
      </div>
      <CoverPicker
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        setSelectedCover={setSelectedCover}
      />

      {/* emoji picker */}
      <div className="absolute left-[10%] top-[180px]">
        <EmojiPickerComponent setEmojiIcon={setEmojiIcon}>
          <div className="rounded-md">
            {emojiIcon ? (
              <span className="text-5xl">{emojiIcon}</span>
            ) : (
              <SmilePlus className="h-10 w-10" />
            )}
          </div>
        </EmojiPickerComponent>
      </div>
      {/* file name */}
    </div>
  );
}
export default PageDocumentInfo;
