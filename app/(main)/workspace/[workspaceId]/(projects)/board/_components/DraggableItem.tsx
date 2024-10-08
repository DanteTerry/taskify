import { Draggable } from "@hello-pangea/dnd";
import CardItem from "./CardItem";
import { ItemType, listType } from "@/types/type";
import { Dispatch, SetStateAction } from "react";

function DraggableItem({
  item,
  data,
  index,
  setData,
}: {
  item: ItemType;
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
          <CardItem setData={setData} data={data} item={item} />
        </div>
      )}
    </Draggable>
  );
}
export default DraggableItem;
