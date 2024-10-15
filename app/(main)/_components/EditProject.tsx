import { Dispatch, SetStateAction, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CoverImages, getRandomEmoji } from "@/constants";
import Image from "next/image";
import { Loader } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { WorkspaceDocData } from "@/types/type";
import { toast } from "sonner";

const emojiIcons: string[] = getRandomEmoji();
const images = CoverImages.sort(() => Math.random() - 0.5).slice(0, 12);

function EditProject({
  openSetting,
  setOpenSetting,
  document,
}: {
  openSetting: boolean;
  document: WorkspaceDocData;
  setOpenSetting: Dispatch<SetStateAction<boolean>>;
}) {
  const [emoji, setEmoji] = useState(document?.emoji);
  const [selectedImage, setSelectedImage] = useState(document?.coverImage);
  const [projectName, setProjectName] = useState(document?.documentName);
  const [isLoading, setIsLoading] = useState(false);

  const updateSprintProject = async () => {
    if (!document?.id) {
      return;
    }
    setIsLoading(true);

    try {
      const docRef = doc(db, "WorkSpaceDocuments", document?.id);
      await updateDoc(docRef, {
        documentName: projectName,
        emoji: emoji,
        coverImage: selectedImage,
      });
      setIsLoading(false);
    } catch (error: any) {
      toast.error("Error updating document: ", error);
      setIsLoading(false);
    }
    setOpenSetting(false);
  };

  return (
    <Dialog open={openSetting} onOpenChange={() => setOpenSetting(false)}>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-[350px] rounded-lg bg-white pl-5 shadow-lg dark:bg-[#1f1f1f]",
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold capitalize text-gray-900 dark:text-gray-100">
            {document?.projectType} Project
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Edit the details for your project.
          </DialogDescription>
          <div className="">
            {" "}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1f1f1f]"
            >
              <div className="flex flex-col items-center gap-2">
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  id="documentName"
                  type="text"
                  className="mb-2 mt-2 w-full rounded-md border px-3 py-2 text-black/90 outline-none focus:border-[#D2F159]/50 dark:border-2 dark:bg-[#2b2b2b] dark:text-white dark:placeholder:text-[#80868B]"
                  placeholder="Enter project name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-justify text-sm font-semibold text-black dark:text-white">
                  Icons
                </p>

                <div className="mb-2 flex items-center justify-between gap-0.5">
                  {emojiIcons.map((icon: string, index) => (
                    <div
                      key={index}
                      onClick={() => setEmoji(icon)}
                      className={cn(
                        `cursor-pointer rounded-md border border-transparent p-1 transition-all duration-300 hover:border-black dark:hover:border-white`,
                        emoji === icon && "border-black dark:border-white",
                      )}
                    >
                      <span className="text-xl">{icon}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-justify text-sm font-semibold text-black dark:text-white">
                  Background
                </p>

                <div className="mx-auto flex w-full flex-wrap justify-between gap-1">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(image.imageUrl)}
                      className={cn(
                        `w-max cursor-pointer rounded-md border border-transparent p-1 transition-all duration-300 hover:border-black dark:hover:border-white`,
                        selectedImage === image.imageUrl &&
                          "border-black dark:border-white",
                      )}
                    >
                      <Image
                        src={image.imageUrl}
                        alt="cover"
                        width={200}
                        height={200}
                        className="h-[37px] w-[37px] rounded-md object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={updateSprintProject}
                type="submit"
                className={cn(
                  `w-full rounded-md py-2 font-semibold text-slate-200`,
                  document?.projectType === "board" &&
                    "bg-[#c98a0d] dark:bg-[#b07a0b]",
                  document?.projectType === "sprint" &&
                    "bg-[#933030] dark:bg-[#7b2929]",
                  document?.projectType === "page" &&
                    "bg-[#1963ae] dark:bg-[#155a9b]",
                )}
              >
                {isLoading ? (
                  <Loader className="mx-auto animate-spin" size={25} />
                ) : (
                  "Update Project"
                )}
              </button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export default EditProject;
