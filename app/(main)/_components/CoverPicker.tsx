"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { coverImages } from "@/constants";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

function CoverPicker({
  isDialogOpen,
  setIsDialogOpen,
  setSelectedCover,
  updateDocumentInfo,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedCover: Dispatch<SetStateAction<string>>;
  updateDocumentInfo?: (key: string, value: string) => void;
}) {
  const [selectedImage, setSelectedImage] = useState("");
  const params = useParams();
  const { workspaceId, documentId } = params;

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => {
        setIsDialogOpen(false);
      }}
    >
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle className="mb-3">Update Cover</DialogTitle>
          <div className="grid grid-cols-2 gap-1.5 md:grid-cols-3 lg:grid-cols-4">
            {coverImages.map((image, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image.imageUrl)}
                  className={cn(
                    `rounded-md border-2 border-transparent p-1 transition-all duration-300 hover:border-white`,
                    selectedImage === image.imageUrl && "border-white",
                  )}
                >
                  <Image
                    src={image.imageUrl}
                    alt="cover"
                    width={200}
                    height={200}
                    className="h-[70px] w-full rounded-md object-cover"
                  />
                </button>
              );
            })}
          </div>
        </DialogHeader>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              onClick={() => {
                setSelectedCover(selectedImage);
                if (workspaceId || documentId) {
                  updateDocumentInfo &&
                    updateDocumentInfo("coverImage", selectedImage);
                }
              }}
            >
              Update
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedCover((prev) => prev)}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default CoverPicker;
