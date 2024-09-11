"use client";
import { db } from "@/config/firebaseConfig";
import { cn } from "@/lib/utils";
import { WorkspaceDocData } from "@/types/type";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DragContext from "../_components/DragContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface Artwork {
  artist: string;
  art: string;
}

function BoardPage({ params }: { params: any }) {
  const [documentInfo, setDocumentInfo] = useState<WorkspaceDocData>();
  const [emojiIcon, setEmojiIcon] = useState("");
  const [selectedCover, setSelectedCover] = useState("");

  useEffect(() => {
    params?.boardId && getDocumentInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.boardId]);

  const getDocumentInfo = async () => {
    const docRef = doc(db, "WorkSpaceDocuments", params?.boardId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDocumentInfo(docSnap.data() as WorkspaceDocData);
      setEmojiIcon(docSnap.data()?.emoji);
      docSnap.data()?.coverImage &&
        setSelectedCover(docSnap.data()?.coverImage);
    }
  };

  return (
    <section
      className={cn(`flex h-full w-full flex-col md:pt-0`)}
      style={{
        backgroundImage: selectedCover ? `url(${selectedCover})` : undefined,
        backgroundSize: "cover",
      }}
    >
      <div className="flex w-full flex-grow flex-col">
        <ScrollArea className="mb-1 flex h-full w-full px-3 py-5 md:px-8">
          {/* added dragDropContext */}
          <DragContext />
          <ScrollBar orientation="horizontal" className="hidden md:flex" />{" "}
        </ScrollArea>
      </div>
    </section>
  );
}
export default BoardPage;
