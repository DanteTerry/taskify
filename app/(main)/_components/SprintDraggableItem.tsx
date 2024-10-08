import { Draggable } from "@hello-pangea/dnd";
import { issueDataType, issueType,  } from "@/types/type";
import { Dispatch, SetStateAction } from "react";
import SprintDragItem from "./SprintDragItem";

function SprintDraggableItem({
  item,
  data,
  index,
  setData,
}: {
  item: issueDataType;
  data: issueType;
  index: number;
  setData: Dispatch<SetStateAction<issueType[] | undefined>>;
}) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <SprintDragItem data={data} item={item} />
        </div>
      )}
    </Draggable>
  );
}
export default SprintDraggableItem;
