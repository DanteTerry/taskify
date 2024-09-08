"use client";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Bell, Pencil, Trash2 } from "lucide-react";
import { ItemType } from "@/lib/redux/boardSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { db } from "@/config/firebaseConfig";

function CardItem({ item }: { item: ItemType }) {
  const { boardId } = useParams();

  const deleteItem = async () => {
    try {
      const docRef = doc(db, "BoardDocumentOutput", boardId as string);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const currentData = docSnapshot.data();
        const currentOutput = currentData?.output || [];

        // Filter out the item with the matching ID
        const updatedItems = currentOutput.map((list: any) => ({
          ...list,
          items: list.items.filter(
            (listItem: ItemType) => listItem.id !== item.id,
          ),
        }));

        await updateDoc(docRef, { output: updatedItems });
      } else {
        console.error("Document does not exist!");
      }
    } catch (error) {
      console.error("Error deleting item from Firestore:", error);
    }
  };

  return (
    <div
      className={cn(
        `item flex cursor-pointer justify-between gap-2 rounded-md border-2 bg-zinc-700 px-1.5 py-1.5 shadow-xl`,
        `bg-["${item.randomColor}"]`,
      )}
    >
      <div className="flex w-[400px] flex-col gap-1 rounded-md p-2 dark:bg-[#161616]">
        <h3 className="font-medium">{item.title}</h3>
        <p className="mb-2 text-justify text-xs text-white/70">
          {item.description}
        </p>

        <Separator color="white" />

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* priority */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px]">Priority</span>
              <div className="flex items-center gap-1.5">
                <div
                  className={cn(`h-2.5 w-2.5 rounded-full bg-green-500`)}
                  style={{
                    background: item.priority.color,
                  }}
                ></div>
                <span className="text-[10px]">{item.priority.priority}</span>
              </div>
            </div>

            {/* deadline */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px]">Deadline</span>
              <span className="text-[10px]">
                {item.deadLine?.split(", ")[0]}
              </span>
            </div>
          </div>
          {/* buttons */}
          <div className="flex items-center gap-5">
            <button
              disabled
              className="text-[white/50] transition-all duration-300"
            >
              <Bell size={16} />
            </button>
            <button className="text-[white/50] transition-all duration-300 hover:text-white">
              <Pencil size={16} />
            </button>
            <button
              onClick={deleteItem}
              className="text-[white/50] transition-all duration-300 hover:text-white"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
