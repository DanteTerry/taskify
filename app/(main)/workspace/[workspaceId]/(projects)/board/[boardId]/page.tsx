"use client";
import CardAdd from "@/app/(main)/_components/CardAdd";
import { db } from "@/config/firebaseConfig";
import { RootState } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { WorkspaceDocData } from "@/types/type";
import { doc, getDoc } from "firebase/firestore";
import { Edit2Icon, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function BoardPage({ params }: { params: any }) {
  const [documentInfo, setDocumentInfo] = useState<WorkspaceDocData>();
  const [emojiIcon, setEmojiIcon] = useState("");
  const [selectedCover, setSelectedCover] = useState("");

  const coverImage = documentInfo?.coverImage;

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
    <section className={cn(`flex h-full w-full flex-col`)}>
      <div className="relative flex w-full flex-grow flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 mb-1 flex overflow-y-hidden p-3 pb-1">
          <div className="mr-3 h-fit w-60 flex-shrink-0 rounded-md bg-black p-2">
            <div className="list-body">
              <div className="flex justify-between p-1">
                <span>To do</span>
                <button>
                  <MoreHorizontal size={20} />
                </button>
              </div>
              {/* list item */}
              <div className="item flex cursor-pointer items-center justify-between rounded-md border-2 border-zinc-900 bg-zinc-700 p-1 hover:border-gray-500">
                <span>Project description</span>
                <span className="flex items-start justify-start">
                  <button className="rounded-sm p-1 hover:bg-gray-600">
                    <Edit2Icon size={16} />
                  </button>
                </span>
              </div>
              <CardAdd />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default BoardPage;
