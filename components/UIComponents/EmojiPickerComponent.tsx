"use client";

import EmojiPicker from "emoji-picker-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
function EmojiPickerComponent({
  children,
  setEmojiIcon,
}: {
  children: React.ReactNode;
  setEmojiIcon: Dispatch<SetStateAction<string>>;
}) {
  const [openPicker, setOpenPicker] = useState(false);
  const pathName = usePathname();
  return (
    <div className="relative">
      <Button
        onClick={() => setOpenPicker((prev) => !prev)}
        size={"icon"}
        variant={"ghost"}
      >
        {children}
      </Button>
      {openPicker && (
        <div
          className={cn(
            `absolute z-10`,
            pathName === "/create-workspace" ? "-left-3 bottom-12" : "",
          )}
        >
          <EmojiPicker
            height={350}
            theme="auto"
            emojiStyle="facebook"
            onEmojiClick={(e) => {
              setEmojiIcon(e.emoji);
              setOpenPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
export default EmojiPickerComponent;
