"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import PriorityPicker from "./PriorityPicker";
import DatePicker from "./DatePicker";
import { AddCardTpe } from "@/types/type";
import { AddCardSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { ItemType, PriorityType } from "@/lib/redux/boardSlice";
import { DialogTitle } from "@radix-ui/react-dialog";

function CardEdit({
  setShow,
  item,
  getCardData,
  show,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  item: ItemType;
  getCardData: (data: ItemType) => void;
}) {
  const [deadLine, setDeadLine] = useState<Date | undefined>();
  const [priority, setPriority] = useState<PriorityType>({
    color: "gray",
    priority: "Without",
  });

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
      id: item.id,
      title: cardTitle,
      description: cardDescription,
      priority,
      deadLine: deadLine?.toLocaleDateString(),
    };

    getCardData(itemData);
    reset();
    setDeadLine(undefined);
    setPriority({
      color: "gray",
      priority: "Without",
    });

    setShow(false);
  };

  console.log(deadLine);
  useEffect(() => {
    setDeadLine(item?.deadLine ? new Date(item.deadLine) : undefined);
    setPriority(item.priority);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-2">
      <Dialog open={show} onOpenChange={() => setShow(false)}>
        <DialogContent className="w-[350px]">
          <DialogHeader>
            <DialogTitle>Edit Card</DialogTitle>
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="flex flex-col gap-5"
            >
              {/* input for title */}
              <div className="flex flex-col gap-2">
                <input
                  id="cardTitle"
                  defaultValue={item.title}
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
                  defaultValue={item.description}
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
                Edit Card
              </button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CardEdit;
