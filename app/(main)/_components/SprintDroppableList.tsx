import { Droppable } from "@hello-pangea/dnd"; // This is the correct import, ignore the spell check warning
import { issueDataType } from "@/types/type";
import SprintDraggableItem from "./SprintDraggableItem";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { SprintOutput } from "@/lib/redux/sprintSlice";

function SprintDroppableList({ data }: { data: SprintOutput }) {
  return (
    <Droppable droppableId={data.id.toString()}>
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
                <SprintDraggableItem key={item.id} item={item} index={index} />
              );
            })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
export default SprintDroppableList;