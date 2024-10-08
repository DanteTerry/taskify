import { Droppable } from "@hello-pangea/dnd";
import { Dispatch, SetStateAction } from "react";
import { issueDataType, issueType } from "@/types/type";
import SprintDraggableItem from "./SprintDraggableItem";

function SprintDroppableList({
  data,
  setData,
}: {
  data: any;
  setData: Dispatch<SetStateAction<issueType[] | undefined>>;
}) {
  return (
    <Droppable droppableId={data.id}>
      {(provided, snapshot) => (
        <div
          className="flex flex-col gap-3 py-3"
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver
              ? "#e6e9ee"
              : "transparent",
          }}
          {...provided.droppableProps}
        >
          {/* list becomes droppable */}
          {data.items &&
            data.items.map((item: issueDataType, index: number) => {
              return (
                <SprintDraggableItem
                  setData={setData}
                  data={data}
                  key={index}
                  item={item}
                  index={index}
                />
              );
            })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
export default SprintDroppableList;
