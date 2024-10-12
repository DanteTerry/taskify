import { Draggable } from "@hello-pangea/dnd";
import { issueDataType } from "@/types/type";
import SprintDragItem from "./SprintDragItem";

function SprintDraggableItem({
  item,
  sprintId,
  index,
}: {
  item: issueDataType;
  index: number;
  sprintId: string;
}) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <SprintDragItem sprintId={sprintId} item={item} />
        </div>
      )}
    </Draggable>
  );
}
export default SprintDraggableItem;
