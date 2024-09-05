import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/config/firebaseConfig";
import { setBoard, createNewList } from "@/lib/redux/boardSlice";
import DroppableList from "./DroppableList";
import CardAdd from "@/app/(main)/_components/CardAdd";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { listType } from "@/types/type";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { RootState } from "@/lib/redux/store";

function DragContext() {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const boardData = useSelector((state: RootState) => state.board);
  const { boardId } = useParams();

  const [data, setData] = useState<listType[]>();

  useEffect(() => {
    if (boardId) {
      const docRef = doc(db, "BoardDocumentOutput", boardId as string);

      // Listen for real-time updates
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            dispatch(setBoard(docSnap.data().output));
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
  }, [boardId, dispatch]);

  // Function to delete a specific list
  const deleteList = async (listId: string) => {
    try {
      const docRef = doc(db, "BoardDocumentOutput", boardId as string);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const currentData = docSnapshot.data();
        const existingOutput = currentData?.output || [];

        // Filter out the list that matches the `listId`
        const updatedOutput = existingOutput.filter(
          (list: listType) => list.id !== listId,
        );

        // Update Firestore with the new data
        await updateDoc(docRef, {
          output: updatedOutput,
        });

        // Update Redux store
        dispatch(setBoard(updatedOutput));
        setData(updatedOutput);
      } else {
        console.error("Document does not exist!");
      }
    } catch (error) {
      console.error("Error deleting list from Firestore:", error);
    }
  };

  // Function to add a new card to a specific list
  const cardData = (title: string, index: number) => {
    const newList = boardData.map((list, i: number) => {
      if (i === index) {
        return {
          ...list,
          items: [...list.items, { id: uuidv4(), title }],
        };
      }
      return list;
    });

    dispatch(setBoard(newList));
  };

  // Handle dragging and dropping items between lists
  const ondragend = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newList = [...boardData];

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

    destinationItems.splice(destination.index, 0, movedItem);

    newList[sourceListIndex] = {
      ...sourceList,
      items: sourceItems,
    };
    newList[destinationListIndex] = {
      ...destinationList,
      items: destinationItems,
    };

    dispatch(setBoard(newList));
  };

  // Function to create a new list
  const createList = async () => {
    const newList: listType = {
      id: uuidv4().slice(0, 8),
      title: "",
      items: [],
    };

    try {
      const docRef = doc(db, "BoardDocumentOutput", boardId as string);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const currentData = docSnapshot.data();
        const existingOutput = currentData?.output || [];
        const updatedOutput = [...existingOutput, newList];
        await updateDoc(docRef, {
          output: updatedOutput,
        });
        dispatch(createNewList(newList));
      } else {
        console.error("Document does not exist!");
      }
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };

  // function to update title of list
  const updateListTitle = async (listId: string, newTitle: string) => {
    const docRef = doc(db, "BoardDocumentOutput", boardId as string);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const currentData = docSnapshot.data();
        const existingOutput = currentData?.output || [];

        // Update the title of the specific list
        const updatedOutput = existingOutput.map((list: listType) => {
          if (list.id === listId) {
            return { ...list, title: newTitle }; // Update the title
          }
          return list;
        });

        // Save the updated list back to Firestore
        await updateDoc(docRef, { output: updatedOutput });

        // Update the Redux store and local state
        dispatch(setBoard(updatedOutput));
        setData(updatedOutput);
      } else {
        console.error("Document does not exist!");
      }
    } catch (error) {
      console.error("Error updating list title:", error);
    }
  };

  return (
    <div className="flex w-full gap-5">
      <DragDropContext onDragEnd={ondragend}>
        {data &&
          data.map((data, index) => (
            <div
              key={data.id}
              className="mr-3 h-fit w-80 flex-shrink-0 rounded-md p-2 dark:bg-[#161616]"
            >
              <div className="list-body">
                <div className="flex items-center justify-between p-1">
                  <input
                    type="text"
                    placeholder={isFocused ? "" : "Click to edit"}
                    className="border-none text-white outline-none placeholder:text-white focus-within:placeholder:hidden dark:bg-[#161616]"
                    onFocus={() => setIsFocused(true)}
                    defaultValue={data.title}
                    onBlur={(e) => {
                      setIsFocused(false);
                      if (e.target.value && e.target.value !== data.title) {
                        updateListTitle(data.id, e.target.value); // Save the new title
                      }
                    }}
                  />

                  <button onClick={() => deleteList(data.id)}>
                    <Trash size={16} />
                  </button>
                </div>

                {/* Render droppable items */}
                <DroppableList key={data.id} data={data} />
                <CardAdd getCard={(e) => cardData(e, index)} />
              </div>
            </div>
          ))}
        <button
          onClick={createList}
          className="mr-3 flex h-fit w-80 flex-shrink-0 items-center justify-center gap-3 rounded-md p-3 dark:bg-[#161616]"
        >
          <div className="rounded-sm bg-white">
            <Plus className="text-black" />
          </div>
          <h3>{data?.length === 0 ? "Add column" : "Add another column"}</h3>
        </button>
      </DragDropContext>
    </div>
  );
}

export default DragContext;
