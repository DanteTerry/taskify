"use client";
import CardAdd from "@/app/(main)/_components/CardAdd";
import { db } from "@/config/firebaseConfig";
import { RootState } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { WorkspaceDocData } from "@/types/type";
import { doc, getDoc } from "firebase/firestore";
import { Edit2Icon, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { setBoard } from "@/lib/redux/boardSlice";

function BoardPage({ params }: { params: any }) {
  const [documentInfo, setDocumentInfo] = useState<WorkspaceDocData>();
  const [emojiIcon, setEmojiIcon] = useState("");
  const [selectedCover, setSelectedCover] = useState("");

  const coverImage = documentInfo?.coverImage;
  const boardData = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

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

  // function to create card and add to the array of items
  const cardData = (title: string, index: number) => {
    // Creating a new list to maintain immutability
    const newList = boardData.list.map((list, i) => {
      if (i === index) {
        return {
          ...list,
          items: [...list.items, { id: new Date().toISOString(), title }],
        };
      }
      return list;
    });

    const updatedBoard = {
      ...boardData,
      list: newList,
    };

    // Dispatching the action to update the state
    dispatch(setBoard(updatedBoard));
  };

  // function to handle dragend on draggable's
  const ondragend = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result);
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newList = [...boardData.list];

    const sourceListIndex = newList.findIndex(
      (list) => list.id.toString() === source.droppableId,
    );

    const destinationListIndex = newList.findIndex(
      (list) => list.id.toString() === destination.droppableId,
    );

    const sourceList = newList[sourceListIndex];
    const destinationList = newList[destinationListIndex];

    const sourceItems = [...sourceList.items];
    const destinationItems = [...destinationList.items];

    const [movedItem] = sourceItems.splice(source.index, 1);

    newList[sourceListIndex] = {
      ...sourceList,
      items: sourceItems,
    };
    newList[destinationListIndex] = {
      ...destinationList,
      items: destinationItems,
    };

    const updatedBoard = {
      ...boardData,
      list: newList,
    };

    dispatch(setBoard(updatedBoard));
  };

  return (
    <section className={cn(`flex h-full w-full flex-col`)}>
      <div className="relative flex w-full flex-grow flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 mb-1 flex overflow-y-hidden p-3 pb-1">
          {/* added dragDropContext */}
          <DragDropContext onDragEnd={ondragend}>
            {boardData.list &&
              boardData.list.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="mr-3 h-fit w-60 flex-shrink-0 rounded-md bg-black p-2"
                  >
                    <div className="list-body">
                      <div className="flex justify-between p-1">
                        <span>{data.title}</span>
                        <button>
                          <MoreHorizontal size={20} />
                        </button>
                      </div>

                      {/* added droppable */}
                      <Droppable droppableId={`${data.id}`}>
                        {(provided, snapshot) => (
                          <div
                            className="py-1"
                            ref={provided.innerRef}
                            style={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "#222"
                                : "transparent",
                            }}
                            {...provided.droppableProps}
                          >
                            {/* list becomes droppable */}
                            {data.items &&
                              data.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={`${item.id}`}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <div
                                          key={index}
                                          className="item flex cursor-pointer items-center justify-between rounded-md border-2 border-zinc-900 bg-zinc-700 p-1 hover:border-gray-500"
                                        >
                                          <span>{item.title}</span>
                                          <span className="flex items-start justify-start">
                                            <button className="rounded-sm p-1 hover:bg-gray-600">
                                              <Edit2Icon size={16} />
                                            </button>
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <CardAdd getCard={(e) => cardData(e, index)} />
                    </div>
                  </div>
                );
              })}
          </DragDropContext>
        </div>
      </div>
    </section>
  );
}
export default BoardPage;
