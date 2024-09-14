"use client";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Bell, Pencil, Trash2 } from "lucide-react";
import { ItemType } from "@/lib/redux/boardSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { db } from "@/config/firebaseConfig";
import { Dispatch, SetStateAction, useState } from "react";
import CardEdit from "@/app/(main)/_components/CardEdit";
import { toast } from "sonner";
import { listType } from "@/types/type";

function CardItem({
  item,
  data,
}: {
  item: ItemType;
  data: listType;
  setData: Dispatch<SetStateAction<listType[] | undefined>>;
}) {
  const { boardId } = useParams();
  const [show, setShow] = useState(false);

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
        toast("Document does not exist!");
      }
    } catch (error: any) {
      toast("Error deleting item from Firestore:", error);
    }
  };

  const editCard = async (updatedItem: ItemType, listId: string) => {
    try {
      const docRef = doc(db, "BoardDocumentOutput", boardId as string);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const currentOutput = docSnapshot.data()?.output || [];

        // Update the specific item in the matching list
        const updatedOutput = currentOutput.map((list: any) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((item: ItemType) =>
                  item.id === updatedItem.id ? updatedItem : item,
                ),
              }
            : list,
        );

        await updateDoc(docRef, { output: updatedOutput });
        toast.success("Card updated successfully!");
      } else {
        toast.error("Document does not exist!");
      }
    } catch (error: any) {
      toast.error(`Error updating item: ${error.message}`);
      console.error("Error updating Firestore:", error);
    }
  };

  return (
    <div
      className={cn(
        `item flex cursor-pointer justify-between gap-2 rounded-md border-2 bg-white px-1.5 py-1.5 text-black shadow-xl dark:bg-[#161616] dark:text-white`,
      )}
    >
      <div className="flex w-[400px] flex-col gap-1 rounded-md bg-white p-2 dark:bg-[#161616]">
        <h3 className="font-medium">{item.title}</h3>
        <p className="mb-2 text-justify text-xs dark:text-white/70">
          {item.description}
        </p>

        <Separator color="white" />

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* priority */}
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-medium">Priority</span>
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
              <span className="text-[12px] font-medium">Deadline</span>
              <span className="text-[10px]">
                {item.deadLine?.split(", ")[0]}
              </span>
            </div>
          </div>
          {/* buttons */}
          <div className="flex items-center gap-5">
            <button
              disabled
              className="text-[#283D3B] transition-all duration-300 dark:text-white"
            >
              <Bell size={16} />
            </button>
            <button
              onClick={() => setShow(true)}
              className="text-[#283D3B] transition-all duration-300 hover:text-black dark:text-white hover:dark:text-white/70"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={deleteItem}
              className="text-[#283D3B] transition-all duration-300 hover:text-black dark:text-white hover:dark:text-white/70"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
      <CardEdit
        getCardData={(item: ItemType) => editCard(item, data.id)}
        show={show}
        item={item}
        setShow={setShow}
      />
    </div>
  );
}

export default CardItem;
