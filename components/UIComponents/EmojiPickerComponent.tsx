"use client";

import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
function EmojiPickerComponent({
  children,
  setEmojiIcon,
  emojiIcon,
  updateDocumentInfo,
}: {
  children: React.ReactNode;
  setEmojiIcon: Dispatch<SetStateAction<string>>;
  emojiIcon?: string;
  updateDocumentInfo?: (key: string, value: string) => void;
}) {
  const [openPicker, setOpenPicker] = useState(false);
  const pathName = usePathname();
  const params = useParams();
  const { workspaceId, documentId } = params;
  return (
    <div className="relative">
      <Button
        onClick={() => setOpenPicker((prev) => !prev)}
        className="w-full bg-transparent hover:bg-transparent"
        size={"icon"}
      >
        {children}
      </Button>
      {openPicker && (
        <div
          className={cn(
            `absolute z-10`,
            pathName === "/dashboard" ? "-left-3 bottom-12" : "left-5 top-14",
          )}
        >
          <EmojiPicker
            height={350}
            width={300}
            theme={Theme.AUTO}
            emojiStyle={EmojiStyle.FACEBOOK}
            onEmojiClick={(e) => {
              setEmojiIcon(e.emoji);
              if (workspaceId || documentId) {
                updateDocumentInfo && updateDocumentInfo("emoji", e.emoji);
              }
              setOpenPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
export default EmojiPickerComponent;
