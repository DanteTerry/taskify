"use client";
import { db } from "@/config/firebaseConfig";
import { cn } from "@/lib/utils";
import { WorkspaceDocData } from "@/types/type";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DragContext from "../_components/DragContext";

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
      className={cn(`flex h-full w-full flex-col`)}
      style={{
        backgroundImage: selectedCover ? `url(${selectedCover})` : undefined,
        backgroundSize: "cover",
      }}
    >
      <div className="relative flex w-full flex-grow flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 mb-1 flex px-8 py-5">
          {/* added dragDropContext */}
          <DragContext />
        </div>
      </div>
    </section>
  );
}
export default BoardPage;
