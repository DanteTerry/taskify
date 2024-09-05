import { ItemType } from "@/types/type";
import { Edit2Icon } from "lucide-react";

function CardItem({ item }: { item: ItemType }) {
  return (
    <div className="item flex cursor-pointer items-center justify-between rounded-md border-2 border-zinc-900 bg-zinc-700 p-1 hover:border-gray-500">
      <span>{item.title}</span>
      <span className="flex items-start justify-start">
        <button className="rounded-sm p-1 hover:bg-gray-600">
          <Edit2Icon size={16} />
        </button>
      </span>
    </div>
  );
}

export default CardItem;
