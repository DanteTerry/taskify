"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import EmojiPickerComponent from "@/components/UIComponents/EmojiPickerComponent";
import { SmilePlus } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { WorkspaceDocData } from "@/types/type";
import { toast } from "sonner";
import DocumentCoverImage from "./DocumentCoverImage";
import { Skeleton } from "@/components/ui/skeleton";

function PageDocumentInfo({ params }: { params: any }) {
  const [emojiIcon, setEmojiIcon] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [documentInfo, setDocumentInfo] = useState<WorkspaceDocData>();
  const [selectedCover, setSelectedCover] = useState("");

  useEffect(() => {
    params.documentId && getDocumentInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.documentId]);

  const getDocumentInfo = async () => {
    const docRef = doc(db, "WorkSpaceDocuments", params.documentId);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDocumentInfo(docSnap.data() as WorkspaceDocData);
      setEmojiIcon(docSnap.data()?.emoji);
      docSnap.data()?.coverImage &&
        setSelectedCover(docSnap.data()?.coverImage);
    }
  };

  const updateDocumentInfo = async (key: string, value: string) => {
    const docRef = doc(db, "WorkSpaceDocuments", params?.documentId);
    await updateDoc(docRef, {
      [key]: value,
    });
  };

  return (
    <div className="relative">
      {/* cover image */}
      <div className="group relative flex items-center justify-center overflow-hidden rounded-xl rounded-tl-none rounded-tr-none">
        <Button
          variant={"outline"}
          onClick={() => {
            setIsDialogOpen(true);
          }}
          className="absolute bottom-3 right-3 opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          Change cover
        </Button>
        {selectedCover === "" ? (
          <Skeleton className="h-[200px] w-full rounded-xl" />
        ) : (
          <Image
            src={selectedCover}
            width={400}
            height={400}
            alt="cover image"
            sizes="100%"
            className="h-[200px] w-full object-cover object-center font-space"
          />
        )}
      </div>
      <DocumentCoverImage
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        setSelectedCover={setSelectedCover}
        updateDocumentInfo={updateDocumentInfo}
        selectedCover={selectedCover}
      />

      {/* emoji picker */}
      <div className="absolute left-[15%] top-[180px]">
        <EmojiPickerComponent
          setEmojiIcon={setEmojiIcon}
          updateDocumentInfo={updateDocumentInfo}
          emojiIcon={emojiIcon}
        >
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
      <div className="mx-auto mt-16 px-5 md:w-full lg:w-3/5 lg:px-10">
        <input
          type="text"
          placeholder="Untitled document"
          defaultValue={documentInfo?.documentName}
          onBlur={(e) => {
            updateDocumentInfo("documentName", e.target.value);
          }}
          className="bg-transparent text-3xl font-bold outline-none dark:text-white"
        />
      </div>

      {/* description */}
    </div>
  );
}
export default PageDocumentInfo;
