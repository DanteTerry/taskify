"use client";
import { db } from "@/config/firebaseConfig";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import SprintDroppableList from "./SprintDroppableList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { setOutput } from "@/lib/redux/sprintSlice";

function KanbanSprintBoard({ sprintId }: { sprintId: string }) {
  const data = useSelector((state: RootState) => state.sprint.output);

  const dispatch = useDispatch<AppDispatch>();

  // Handle dragging and dropping items between lists
  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    // If no destination, return early
    if (!destination) return;

    // Check if data is defined and is an array
    if (!data || !Array.isArray(data)) {
      console.warn("Data is undefined or not an array.");
      return;
    }

    // Find the source list
    const sourceListIndex = data.findIndex(
      (list) => list.id === source.droppableId,
    );

    // Check if the source list index is valid
    if (sourceListIndex < 0) {
      console.warn("Source list not found.");
      return;
    }

    const sourceList = data[sourceListIndex];
    const sourceItems = Array.isArray(sourceList?.items)
      ? [...sourceList.items]
      : []; // Ensure sourceItems is an array

    // If the item is dropped in the same list
    if (source.droppableId === destination.droppableId) {
      // Remove the item from the source list
      const [movedItem] = sourceItems.splice(source.index, 1);

      // Add the item to the new position in the same list
      sourceItems.splice(destination.index, 0, movedItem);

      // Update the list
      const updatedData = [...data];
      updatedData[sourceListIndex] = {
        ...sourceList,
        items: sourceItems,
      };

      // Update the state
      dispatch(setOutput(updatedData));

      // Update the database
      const docRef = doc(db, "SprintDocumentOutput", sprintId as string);
      await updateDoc(docRef, {
        output: updatedData,
      });

      return;
    }

    // Find the destination list
    const destinationListIndex = data.findIndex(
      (list) => list.id === destination.droppableId,
    );

    // Check if the destination list index is valid
    if (destinationListIndex < 0) {
      console.warn("Destination list not found.");
      return;
    }

    const destinationList = data[destinationListIndex];
    const destinationItems = Array.isArray(destinationList?.items)
      ? [...destinationList.items]
      : []; // Ensure destinationItems is an array

    // Remove the item from the source list
    const [movedItem] = sourceItems.splice(source.index, 1);

    // Clone the moved item to avoid modifying the original object
    const updatedMovedItem = {
      ...movedItem,
      status: destinationList.status as
        | "backlog"
        | "selected for development"
        | "in progress"
        | "done",
    };

    // Add the item to the destination list
    destinationItems.splice(destination.index, 0, updatedMovedItem);

    // Update the lists
    const updatedData = [...data];
    updatedData[sourceListIndex] = {
      ...sourceList,
      items: sourceItems,
    };
    updatedData[destinationListIndex] = {
      ...destinationList,
      items: destinationItems,
    };

    // Update the state
    dispatch(setOutput(updatedData));

    // Update the database
    const docRef = doc(db, "SprintDocumentOutput", sprintId as string);
    await updateDoc(docRef, {
      output: updatedData,
    });
  };

  return (
    <div className="h-full w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data &&
            data.map((data, index) => (
              <div
                key={data.id}
                className="mr-3 w-full rounded-md bg-gray-100 p-2 dark:bg-[#161616] md:max-w-80"
              >
                <div className="list-body">
                  <div className="flex items-center justify-between p-1">
                    <input
                      disabled
                      type="text"
                      placeholder={"Click to edit"}
                      className="w-full border-none bg-transparent uppercase text-[#5E6C8F] outline-none placeholder:text-white focus-within:placeholder:hidden dark:bg-[#161616] dark:text-white"
                      defaultValue={data.status}
                    />

                    <span className="text-sm font-bold text-gray-400 dark:text-gray-200">
                      {data?.items?.length}
                    </span>
                  </div>

                  {/* Render droppable items */}
                  <SprintDroppableList
                    sprintId={sprintId}
                    data={data}
                    key={data.id}
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
