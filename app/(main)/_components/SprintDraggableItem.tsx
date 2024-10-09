import { Draggable } from "@hello-pangea/dnd";
import { issueDataType } from "@/types/type";
import SprintDragItem from "./SprintDragItem";

function SprintDraggableItem({
  item,
  index,
}: {
  item: issueDataType;
  index: number;
}) {
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
