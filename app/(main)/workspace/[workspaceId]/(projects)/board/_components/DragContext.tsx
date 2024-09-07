import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { Plus, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/config/firebaseConfig";
import { setBoard, createNewList, ItemType } from "@/lib/redux/boardSlice";
import DroppableList from "./DroppableList";
import CardAdd from "@/app/(main)/_components/CardAdd";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { listType } from "@/types/type";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

function DragContext() {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const [data, setData] = useState<listType[]>();

  useEffect(() => {
    if (boardId) {
      const docRef = doc(db, "BoardDocumentOutput", boardId as string);

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

        const updatedOutput = existingOutput.filter(
          (list: listType) => list.id !== listId,
        );

        await updateDoc(docRef, {
          output: updatedOutput,
        });

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
  const cardData = async (cardDetails: any, listId: string) => {
    const docRef = doc(db, "BoardDocumentOutput", boardId as string);

    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const currentData = docSnapshot.data();
        const existingOutput = currentData?.output || [];

        const updatedOutput = existingOutput.map((list: listType) => {
          if (list.id === listId) {
            return {
              ...list,
              items: [...list.items, cardDetails],
            };
          }
          return list;
        });

        await updateDoc(docRef, { output: updatedOutput });

        setData(updatedOutput);
        dispatch(setBoard(updatedOutput));
      } else {
        console.error("Document does not exist!");
      }
    } catch (error) {
      console.error("Error updating Firestore with new card:", error);
    }
  };

  // Handle dragging and dropping items between lists
  const ondragend = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const docRef = doc(db, "BoardDocumentOutput", boardId as string);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const currentData = docSnapshot.data();
      const currentOutput = currentData?.output || [];

      // Clone the current list data
      const newList = [...currentOutput];

      // Find the source and destination lists
      const sourceListIndex = newList.findIndex(
        (list: listType) => list.id.toString() === source.droppableId,
      );
      const destinationListIndex = newList.findIndex(
        (list: listType) => list.id.toString() === destination.droppableId,
      );

      // If either the source or destination list is not found, exit
      if (sourceListIndex === -1 || destinationListIndex === -1) {
        console.error("Source or destination list not found!");
        return;
      }

      const sourceList = newList[sourceListIndex];
      const destinationList = newList[destinationListIndex];

      // Clone the items from source and destination lists
      const sourceItems = [...sourceList.items];
      const destinationItems = [...destinationList.items];

      // Handle moving within the same list (reorder logic)
      if (sourceListIndex === destinationListIndex) {
        const [movedItem] = sourceItems.splice(source.index, 1);
        sourceItems.splice(destination.index, 0, movedItem);
        newList[sourceListIndex] = {
          ...sourceList,
          items: sourceItems,
        };
      } else {
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
      }

      try {
        await updateDoc(docRef, {
          output: newList,
        });
        console.log("Database updated with new list order!");
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    } else {
      console.error("Document does not exist!");
    }
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

        const updatedOutput = existingOutput.map((list: listType) => {
          if (list.id === listId) {
            return { ...list, title: newTitle }; // Update the title
          }
          return list;
        });

        await updateDoc(docRef, { output: updatedOutput });

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
                <CardAdd
                  getCard={(cardDetails: ItemType) =>
                    cardData(cardDetails, data.id)
                  }
                />
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
