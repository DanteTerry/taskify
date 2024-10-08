import { Droppable } from "@hello-pangea/dnd";
import DraggableItem from "./DraggableItem";
import { Dispatch, SetStateAction } from "react";
import { ItemType, listType } from "@/types/type";

function DroppableList({
  data,
  setData,
}: {
  data: any;
  setData: Dispatch<SetStateAction<listType[] | undefined>>;
}) {
  return (
    <Droppable droppableId={data.id}>
      {(provided, snapshot) => (
        <div
          className="flex flex-col gap-3 py-3"
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver ? "#222" : "transparent",
          }}
          {...provided.droppableProps}
        >
          {/* list becomes droppable */}
          {data.items &&
            data.items.map((item: ItemType, index: number) => {
              return (
                <DraggableItem
                  setData={setData}
                  data={data}
                  key={index}
                  item={item}
                  index={index}
                />
              );
            })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
export default DroppableList;
