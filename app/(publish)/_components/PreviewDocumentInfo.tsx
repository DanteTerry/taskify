"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SmilePlus } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { WorkspaceDocData } from "@/types/type";
import { Skeleton } from "@/components/ui/skeleton";

function PreviewDocumentInfo({
  params,
  emojiIcon,
  documentInfo,
  selectedCover,
}: {
  params: any;
  emojiIcon: string;
  documentInfo: WorkspaceDocData | undefined;
  selectedCover: string;
}) {
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

      {/* Emoji picker */}
      <div className="absolute left-[5%] top-[180px] sm:left-[15%]">
        <div className="rounded-md">
          {emojiIcon ? (
            <span className="text-4xl md:text-5xl">{emojiIcon}</span>
          ) : (
            <SmilePlus className="h-10 w-10" />
          )}
        </div>
      </div>

      {/* Document name input */}
      <div className="mx-auto mt-16 w-full px-5 sm:w-[90%] md:w-[80%] lg:w-3/5 lg:px-10">
        <input
          disabled
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

export default PreviewDocumentInfo;
