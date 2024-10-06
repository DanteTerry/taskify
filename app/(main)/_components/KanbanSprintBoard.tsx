"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebaseConfig";
import { listType } from "@/types/type";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SprintDroppableList from "./SprintDroppableList";

function KanbanSprintBoard() {
  const { sprintId } = useParams();

  const [data, setData] = useState<listType[] | undefined>(undefined);
  useEffect(() => {
    if (sprintId) {
      const docRef = doc(db, "SprintDocumentOutput", sprintId as string);

      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            setData(docSnap.data().output);
          } else {
            console.log("No such document!");
          }
        },
        (error) => {
          console.error("Error getting real-time updates:", error);
        },
      );

      return () => unsubscribe();
    }
  }, [sprintId]);

  // Handle dragging and dropping items between lists
  const ondragend = async (result: DropResult) => {};

  return (
    <div className="h-full w-full">
      <DragDropContext onDragEnd={ondragend}>
        <div className="grid grid-cols-4 gap-3">
          {data &&
            data.map((data, index) => (
              <div
                key={data.id}
                className="mr-3 flex-shrink-0 rounded-md bg-gray-100 p-2 pb-10 dark:bg-[#161616] md:max-w-80"
              >
                <div className="list-body">
                  <div className="flex items-center justify-between p-1">
                    <input
                      disabled
                      type="text"
                      placeholder={"Click to edit"}
                      className="w-full border-none bg-transparent text-[#5E6C8F] outline-none placeholder:text-white focus-within:placeholder:hidden dark:bg-[#161616] dark:text-white"
                      defaultValue={data.title}
                    />
                  </div>

                  {/* Render droppable items */}
                  <SprintDroppableList
                    setData={setData}
                    key={data.id}
                    data={data}
                  />
                </div>
              </div>
            ))}
        </div>
      </DragDropContext>
    </div>
  );
}
export default KanbanSprintBoard;
