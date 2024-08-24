"use client";

import EmojiPicker from "emoji-picker-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
function EmojiPickerComponent({
  children,
  setEmojiIcon,
}: {
  children: React.ReactNode;
  setEmojiIcon: Dispatch<SetStateAction<string>>;
}) {
  const [openPicker, setOpenPicker] = useState(false);
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
        <div className="absolute -left-3 bottom-12 z-10">
          <EmojiPicker
            height={350}
            theme="auto"
            emojiStyle="facebook"
            onEmojiClick={(e) => {
              setEmojiIcon(e.unified);
              setOpenPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
export default EmojiPickerComponent;
