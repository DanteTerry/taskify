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
import PriorityPicker from "./PriorityPicker";
import DatePicker from "./DatePicker";
import { AddCardTpe, ItemType } from "@/types/type";
import { AddCardSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

interface PriorityType {
  color: string;
  priority: string;
}

function CardAdd({ getCard }: { getCard: (card: any) => void }) {
  const [show, setShow] = useState(false);
  const [priority, setPriority] = useState<PriorityType>({
    color: "gray",
    priority: "Without",
  });

  const [date, setDate] = useState<Date>();
  const {
    register,
    formState: { errors },
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
      priority,
      deadLine: date?.toLocaleDateString(),
    };
    getCard(itemData);
    reset();
    setDate(undefined);
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
          className="mt-1 flex h-8 w-full items-center justify-start gap-3 rounded p-1 text-white hover:bg-[#203432]"
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
                  className="mt-3 w-full rounded-md border-2 px-3 py-2 text-black/90 outline-none focus:border-[#D2F159]/50 dark:border-2 dark:bg-[#1f1f1f] dark:text-white dark:placeholder:text-[#80868B]"
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
                  className="w-full rounded-md border-2 px-3 py-2 text-black/90 outline-none focus:border-[#D2F159]/50 dark:border-2 dark:bg-[#1f1f1f] dark:text-white dark:placeholder:text-[#80868B]"
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

              {/* priority picker for card */}
              <PriorityPicker setPriority={setPriority} priority={priority} />

              {/* date picker for card */}
              <DatePicker date={date} setDate={setDate} />

              {/* button to add card  */}
              <button
                type="submit"
                className={cn(
                  `w-full rounded-md py-2 font-medium text-slate-200`,
                  "bg-[#283D3B] text-white",
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
