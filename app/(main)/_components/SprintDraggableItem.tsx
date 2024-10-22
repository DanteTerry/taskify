import { Draggable } from "@hello-pangea/dnd";
import { issueDataType } from "@/types/type";
import SprintDragItem from "./SprintDragItem";
import { useUser } from "@clerk/nextjs";

function SprintDraggableItem({
  item,
  sprintId,
  index,
}: {
  item: issueDataType;
  index: number;
  sprintId: string;
}) {
  const { user } = useUser();

  const isUserAssigneesOrReporter =
    item?.assignees.some((assignee) => assignee.id === user?.id) ||
    item.reporter.id === user?.id;

  return (
    <Draggable
      key={item.id}
      isDragDisabled={!isUserAssigneesOrReporter}
      draggableId={item.id}
      index={index}
    >
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
