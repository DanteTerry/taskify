import { Draggable } from "@hello-pangea/dnd";
import { issueDataType, issueType } from "@/types/type";
import { Dispatch, SetStateAction } from "react";
import SprintDragItem from "./SprintDragItem";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";

function SprintDraggableItem({
  item,
  index,
}: {
  item: issueDataType;
  index: number;
}) {
  const data = useSelector((state: RootState) => state.sprint.output);
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <SprintDragItem item={item} />
        </div>
      )}
    </Draggable>
  );
}
export default SprintDraggableItem;
