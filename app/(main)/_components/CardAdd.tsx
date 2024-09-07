"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import CardColorPicker from "./CardColorPicker";
import PriorityPicker from "./PriorityPicker";
import DatePicker from "./DatePicker";
import { AddCardTpe } from "@/types/type";
import { AddCardSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { ItemType, PriorityType } from "@/lib/redux/boardSlice";

function CardAdd({ getCard }: { getCard: (card: any) => void }) {
  const [show, setShow] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#161616");
  const [randomColor, setRandomColor] = useState("");
  const [priority, setPriority] = useState<PriorityType>({
    color: "gray",
    priority: "Without",
  });

  const [deadLine, setDeadLine] = useState<Date | undefined>();

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<AddCardTpe>({
    resolver: zodResolver(AddCardSchema),
  });

  const onsubmit = (data: AddCardTpe) => {
    const { cardDescription, cardTitle } = data;
    const itemData: ItemType = {
      id: uuidv4().slice(0, 8),
      title: cardTitle,
      description: cardDescription,
      selectedColor,
      randomColor,
      priority,
      deadLine: deadLine?.toLocaleDateString(),
    };
    getCard(itemData);
    reset();
    setDeadLine(undefined);
    setSelectedColor("");
    setRandomColor("");
    setPriority({
      color: "gray",
      priority: "Without",
    });

    setShow(false);
  };

  return (
    <div className="mt-2">
      <div className="flex flex-col">
        {/* button to add card */}
        <button
          onClick={() => setShow(true)}
          className="mt-1 flex h-8 w-full items-center justify-start gap-3 rounded p-1 hover:bg-gray-500"
        >
          <Plus size={16} /> Add a card
        </button>
      </div>
      <Dialog open={show} onOpenChange={() => setShow(false)}>
        <DialogContent className="w-[350px]">
          <DialogHeader>
            <DialogTitle>Add Card</DialogTitle>
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="flex flex-col gap-5"
            >
              {/* input for title */}
              <div className="flex flex-col gap-2">
                <input
                  id="cardTitle"
                  type="text"
                  className="mt-3 w-full rounded-md px-3 py-2 text-black/90 outline-none focus:border-[#D2F159]/50 dark:border-2 dark:bg-[#1f1f1f] dark:text-white dark:placeholder:text-[#80868B]"
                  placeholder="Title"
                  {...register("cardTitle", { required: true })}
                />
                {errors.cardTitle && (
                  <p className="text-sm text-red-500">
                    {errors.cardTitle.message}
                  </p>
                )}
              </div>

              {/* text area for description */}
              <div className="flex flex-col gap-2">
                <textarea
                  id="cardDescription"
                  className="w-full rounded-md px-3 py-2 text-black/90 outline-none focus:border-[#D2F159]/50 dark:border-2 dark:bg-[#1f1f1f] dark:text-white dark:placeholder:text-[#80868B]"
                  placeholder="Description"
                  rows={3}
                  {...register("cardDescription", { required: true })}
                />
                {errors.cardDescription && (
                  <p className="text-sm text-red-500">
                    {errors.cardDescription.message}
                  </p>
                )}
              </div>

              {/* color picker for card */}

              <CardColorPicker
                setSelectedColor={setSelectedColor}
                selectedColor={selectedColor}
                setRandomColor={setRandomColor}
                randomColor={randomColor}
              />

              {/* priority picker for card */}
              <PriorityPicker setPriority={setPriority} priority={priority} />

              {/* date picker for card */}
              <DatePicker
                deadLine={deadLine as Date}
                setDeadLine={setDeadLine}
              />

              {/* button to add card  */}
              <button
                type="submit"
                className={cn(
                  `w-full rounded-md py-2 font-medium text-slate-200`,
                  "bg-[#D2F159] text-black",
                )}
              >
                Add Card
              </button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CardAdd;
