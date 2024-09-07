import { Draggable } from "@hello-pangea/dnd";
import CardItem from "./CardItem";
import { ItemType } from "@/lib/redux/boardSlice";

function DraggableItem({ item, index }: { item: ItemType; index: number }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardItem item={item} />
        </div>
      )}
    </Draggable>
  );
}
export default DraggableItem;
