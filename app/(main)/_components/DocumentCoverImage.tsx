"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { coverImageCategories, coverImageOptions } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

function DocumentCoverImage({
  isDialogOpen,
  setIsDialogOpen,
  setSelectedCover,
  updateDocumentInfo,
  selectedCover,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedCover: Dispatch<SetStateAction<string>>;
  updateDocumentInfo?: (key: string, value: string) => void;
  selectedCover?: string;
}) {
  const params = useParams();
  const [coverLink, setCoverLink] = useState<string>("");
  const [chooseFrom, setChooseFrom] = useState<"gallery" | "upload" | "link">(
    "gallery",
  );

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => {
        setIsDialogOpen(false);
      }}
    >
      <DialogContent
        className={cn(`h-[485px] rounded-xl md:max-w-[540px]`)} // Add padding top equal to the header height
      >
        {/* header of selector  */}
        <DialogHeader className="dark:bg-[#0a0a0a]">
          <div className="flex w-full items-center gap-1">
            {coverImageOptions.map((option) => (
              <Button
                key={option.value}
                className={cn(
                  `text-muted-foreground`,
                  chooseFrom === option.value ? "dark:text-white" : "",
                )}
                variant={"ghost"}
                size={"default"}
                onClick={() => setChooseFrom(option.value as any)}
              >
                {option.label}
              </Button>
            ))}
          </div>
          <hr className="border-t-2" />

          {/* images to render if chooseFrom === upload */}
          {chooseFrom === "upload" && (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <UploadDropzone<OurFileRouter, "imageUploader">
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  updateDocumentInfo &&
                    updateDocumentInfo("coverImage", res[0].url);
                  setSelectedCover(res[0].url);
                  setIsDialogOpen(false);
                }}
                className={cn(
                  "border-2 shadow-none ut-button:bg-black/70 ut-allowed-content:hidden",
                  "ut-label:text-black dark:ut-label:text-white",
                  "border-slate-300 dark:border-slate-400/5",
                  "bg-white dark:bg-[#252525]",
                )}
              />

              <p className="mt-5 text-xs font-medium text-black/30 dark:text-white/30">
                Images wider than 1500 pixels work best.
              </p>

              <p className="mt-1 text-xs text-black/30 dark:text-white/30">
                The maximum size per file is 4 MB
              </p>
            </div>
          )}

          {/* /* images to render if chooseFrom === link */}
          {chooseFrom === "link" && (
            <div className="h-full">
              <input
                id="text"
                type="url"
                onChange={(e) => setCoverLink(e.target.value)}
                className="mt-5 w-full rounded-lg bg-white px-3 py-3 text-black text-black/90 outline-none placeholder:text-gray-500 focus:ring-2 dark:border-none dark:bg-[#17181B] dark:text-white dark:placeholder:text-[#80868B]"
                placeholder="Paste a link to an image"
                value={coverLink}
              />

              <Button
                onClick={() => {
                  updateDocumentInfo &&
                    updateDocumentInfo("coverImage", coverLink);
                  setSelectedCover(coverLink);
                  setCoverLink("");
                  setIsDialogOpen(false);
                }}
                className="mt-3 w-full"
                size={"lg"}
              >
                Submit
              </Button>
            </div>
          )}
        </DialogHeader>

        {/* images to render if chooseFrom === gallery */}
        {chooseFrom === "gallery" && (
          <ScrollArea>
            {coverImageCategories.map((category, index) => (
              <div key={index} className={cn(`mb-5`)}>
                <p className="text-sm font-semibold dark:text-[#7E7E7E]">
                  {category.type}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 pr-4 md:grid-cols-4">
                  {category.images.map((image) => (
                    <div
                      key={image.imageUrl}
                      className="relative h-[64px] w-[105px] cursor-pointer rounded-xl md:w-[110px]"
                      onClick={() => {
                        updateDocumentInfo &&
                          updateDocumentInfo("coverImage", image.imageUrl);
                        setSelectedCover(image.imageUrl);
                        setIsDialogOpen(false);
                      }}
                    >
                      <Image
                        src={image.imageUrl}
                        layout="fill"
                        objectFit="cover"
                        alt="cover image"
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
export default DocumentCoverImage;
