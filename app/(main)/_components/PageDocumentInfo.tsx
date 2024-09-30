"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import EmojiPickerComponent from "@/components/UIComponents/EmojiPickerComponent";
import { SmilePlus } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { WorkspaceDocData } from "@/types/type";
import { Skeleton } from "@/components/ui/skeleton";
import DocumentCoverImage from "./DocumentCoverImage";

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
    <div className="relative w-full">
      {/* Cover image section */}
      <div className="group relative flex w-full items-center justify-center overflow-hidden rounded-none md:rounded-bl-xl md:rounded-br-xl">
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
          className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
            className="h-[200px] w-full object-cover object-center"
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

      {/* Emoji picker */}
      <div className="absolute left-[5%] top-[180px] sm:left-[15%]">
        <EmojiPickerComponent
          setEmojiIcon={setEmojiIcon}
          updateDocumentInfo={updateDocumentInfo}
          emojiIcon={emojiIcon}
        >
          <div className="rounded-md">
            {emojiIcon ? (
              <span className="text-4xl md:text-5xl">{emojiIcon}</span>
            ) : (
              <SmilePlus className="h-10 w-10" />
            )}
          </div>
        </EmojiPickerComponent>
      </div>

      {/* Document name input */}
      <div className="mx-auto mt-16 w-full px-5 sm:w-[90%] md:w-[80%] lg:w-3/5 lg:px-10">
        <input
          type="text"
          placeholder="Untitled document"
          defaultValue={documentInfo?.documentName}
          onBlur={(e) => updateDocumentInfo("documentName", e.target.value)}
          className="w-full bg-transparent text-3xl font-bold outline-none dark:text-white"
        />
      </div>

      {/* Description placeholder or other content can be added here */}
    </div>
  );
}

export default PageDocumentInfo;
