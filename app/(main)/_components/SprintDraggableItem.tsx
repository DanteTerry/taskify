import { Draggable } from "@hello-pangea/dnd";
import { ItemType } from "@/lib/redux/boardSlice";
import { issueDataType, listType } from "@/types/type";
import { Dispatch, SetStateAction } from "react";
import SprintDragItem from "./SprintDragItem";

function SprintDraggableItem({
  item,
  data,
  index,
  setData,
}: {
  item: issueDataType;
  data: listType;
  index: number;
  setData: Dispatch<SetStateAction<listType[] | undefined>>;
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
