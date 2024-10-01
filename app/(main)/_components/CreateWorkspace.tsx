"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import DocumentCoverImage from "./DocumentCoverImage";
import EmojiPickerComponent from "@/components/UIComponents/EmojiPickerComponent";
import { Loader, SmilePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { doc, DocumentData, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function CreateWorkspace({
  setIsOpen,
  isOpen,
  action,
  selectedWorkspace,
  setAction,
}: {
  isOpen: boolean;
  selectedWorkspace: DocumentData | undefined;
  action: "add" | "update";
  setAction: Dispatch<SetStateAction<"add" | "update">>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCover, setSelectedCover] = useState("");
  const [emojiIcon, setEmojiIcon] = useState("");
  const [workSpaceName, setWorkSpaceName] = useState("");
  const [loading, setLoading] = useState(false);
  const { orgId } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  // Set initial workspace data if updating
  useEffect(() => {
    if (action === "update" && selectedWorkspace) {
      setWorkSpaceName(selectedWorkspace.workspaceName || "");
      setEmojiIcon(selectedWorkspace.emoji || "");
      setSelectedCover(selectedWorkspace.coverImage || "");
    } else {
      // Reset states when switching to 'add' action
      setWorkSpaceName("");
      setEmojiIcon("");
      setSelectedCover("");
    }
  }, [action, selectedWorkspace]);

  // Function to create a workspace in Firestore
  const onCreateWorkSpace = async () => {
    try {
      setLoading(true);
      const workSpaceId = uuidv4().slice(0, 8);
      await setDoc(doc(db, "WorkSpaces", workSpaceId.toString()), {
        workspaceName: workSpaceName,
        emoji: emojiIcon,
        coverImage: selectedCover,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        id: workSpaceId,
        orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress,
      });

      setLoading(false);
      router.replace(`/workspace/${workSpaceId}`);
    } catch (error: any) {
      toast(error.message);
      setLoading(false);
    }
  };

  // Function to update the workspace in Firestore
  const onUpdateWorkSpace = async () => {
    if (!selectedWorkspace || !workSpaceName) return;

    try {
      setLoading(true);
      await updateDoc(doc(db, "WorkSpaces", selectedWorkspace.id), {
        workspaceName: workSpaceName,
        emoji: emojiIcon || selectedWorkspace.emoji,
        coverImage: selectedCover || selectedWorkspace.coverImage,
      });

      setLoading(false);
      toast.success("Workspace updated successfully!");
      setIsOpen(false);
      setAction("add"); // Reset action after successful update
    } catch (error: any) {
      toast.error("Failed to update workspace.");
      setLoading(false);
      setIsOpen(false);
      setAction("add"); // Reset action on failure
    }
  };

  // Determine if the update button should be disabled
  const isUpdateDisabled =
    action === "update" &&
    selectedWorkspace &&
    workSpaceName === selectedWorkspace.workspaceName &&
    emojiIcon === selectedWorkspace.emoji &&
    selectedCover === selectedWorkspace.coverImage;

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="max-w-[600px] rounded-lg shadow-lg">
        <DialogHeader className="bg-gradient-to-r rounded-t-lg from-indigo-500 to-purple-600 p-3 text-center text-white">
          <DialogTitle className="text-2xl font-bold">
            {action === "add" ? "Create Workspace" : "Update Workspace"}
          </DialogTitle>
        </DialogHeader>

        {/* Cover Section */}
        <div className="group relative mx-auto mt-2 flex w-full items-center justify-center overflow-hidden rounded-lg shadow-md">
          <Button
            variant="ghost"
            onClick={() => setIsDialogOpen(true)}
            className="absolute bottom-2 right-2 bg-gray-900/70 px-3 py-1 text-xs text-white opacity-0 transition-opacity duration-300 hover:bg-gray-800 group-hover:opacity-100"
          >
            Change cover
          </Button>

          <Image
            src={
              selectedCover ||
              (action === "update" && selectedWorkspace?.coverImage) ||
              "https://utfs.io/f/219d3908-fe3a-4f9d-8d75-6d2e465a1fa8-3oxaqs.jpg"
            }
            width={500}
            height={300}
            alt="cover image"
            sizes="100%"
            className="h-[180px] w-full rounded-lg object-cover"
          />

          <DocumentCoverImage
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            setSelectedCover={setSelectedCover}
            selectedCover={selectedCover}
          />
        </div>

        {/* Input & Emoji Picker Section */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            <EmojiPickerComponent setEmojiIcon={setEmojiIcon}>
              <span className="text-3xl">
                {emojiIcon ||
                  (action === "update" ? (
                    selectedWorkspace?.emoji
                  ) : (
                    <SmilePlus
                      className="text-gray-500 dark:text-white"
                      size={28}
                    />
                  ))}
              </span>
            </EmojiPickerComponent>

            <Input
              value={workSpaceName} // Always bind this to workSpaceName
              placeholder="Workspace Name"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-transparent"
              onChange={(e) => setWorkSpaceName(e.target.value)} // Update workSpaceName regardless of action
            />
          </div>

          {/* Buttons */}
          <div className="mt-3 flex justify-end gap-2">
            {action === "add" ? (
              <Button
                className="rounded-md bg-indigo-500 px-4 py-2 text-white shadow-md transition-colors hover:bg-indigo-600"
                disabled={!workSpaceName.length || loading}
                onClick={onCreateWorkSpace}
              >
                {loading ? <Loader className="animate-spin" /> : "Create"}
              </Button>
            ) : (
              <Button
                className="rounded-md bg-indigo-500 px-4 py-2 text-white shadow-md transition-colors hover:bg-indigo-600"
                disabled={isUpdateDisabled || loading}
                onClick={onUpdateWorkSpace}
              >
                {loading ? <Loader className="animate-spin" /> : "Update"}
              </Button>
            )}
            <Button
              onClick={() => {
                setAction("add"); // Reset action to 'add'
                setIsOpen(false);
              }}
              variant={"ghost"}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-600 transition-all hover:bg-gray-200 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkspace;
