import { Droppable } from "@hello-pangea/dnd";
import DraggableItem from "./DraggableItem";
import { ItemType } from "@/types/type";

function DroppableList({ data }: { data: any }) {
  return (
    <Droppable droppableId={data.id}>
      {(provided, snapshot) => (
        <div
          className="py-1"
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver ? "#222" : "transparent",
          }}
          {...provided.droppableProps}
        >
          {/* list becomes droppable */}
          {data.items &&
            data.items.map((item: ItemType, index: number) => {
              return <DraggableItem key={index} item={item} index={index} />;
            })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
export default DroppableList;
