"use client";
import { Loader, Plus, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { randomColors } from "@/constants";
import { cn } from "@/lib/utils";

function CardAdd({ getCard }: { getCard: (card: string) => void }) {
  const [card, setCard] = useState("");
  const [show, setShow] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const saveCard = () => {
    if (!card) {
      return;
    }
    getCard(card);
    setCard("");
    setShow(!show);
  };

  const closeCard = () => {
    setCard("");
    setShow(!show);
  };
  return (
    <div className="mt-2">
      <div className="flex flex-col">
        {show && (
          <div>
            {/* text area to set card title */}
            <textarea
              className="rounded-md border-2 bg-zinc-900 p-1"
              name=""
              id=""
              value={card}
              onChange={(e) => setCard(e.target.value)}
              cols={24}
              rows={2}
              placeholder="Enter Card Title.."
            ></textarea>

            {/* buttons to save or delete card */}
            <div className="flex p-1">
              <button
                onClick={saveCard}
                className="mr-2 rounded bg-sky-600 p-1 text-white hover:bg-gray-600"
              >
                Add card
              </button>
              <button
                onClick={closeCard}
                className="rounded p-1 hover:bg-gray-600"
              >
                <X />
              </button>
            </div>
          </div>
        )}

        {/* button to add card */}
        <button
          onClick={() => setShow(true)}
          className="mt-1 flex h-8 w-full items-center justify-start rounded p-1 hover:bg-gray-500"
        >
          <Plus size={16} /> Add a card
        </button>
      </div>
      <Dialog open={show} onOpenChange={() => setShow(false)}>
        <DialogContent className="w-[350px]">
          <DialogHeader>
            <DialogTitle>Add Card</DialogTitle>
            <div className="flex flex-col gap-5">
              <input
                id="cardTitle"
                type="text"
                className="mt-3 w-full rounded-md px-3 py-2 text-black/90 outline-none focus:border-[#D2F159]/50 dark:border-2 dark:bg-[#1f1f1f] dark:text-white dark:placeholder:text-[#80868B]"
                placeholder="Title"
              />

              <textarea
                id="cardDescription"
                className="w-full rounded-md px-3 py-2 text-black/90 outline-none focus:border-[#D2F159]/50 dark:border-2 dark:bg-[#1f1f1f] dark:text-white dark:placeholder:text-[#80868B]"
                placeholder="Description"
                rows={5}
              />

              <div className="flex flex-col gap-2">
                <span>Card color</span>

                <div className="mx-auto flex w-full flex-wrap gap-3">
                  {randomColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        `h-[37px] w-[37px] rounded-md border border-transparent transition-all duration-300 hover:border-white`,
                        selectedColor === color && "border-white",
                      )}
                      style={{
                        backgroundColor: color,
                      }}
                    ></button>
                  ))}
                </div>
              </div>
              <div>
                <button
                  className={cn(
                    `w-full rounded-md py-2 font-medium text-slate-200`,
                    "bg-[#D2F159] text-black",
                  )}
                >
                  Add Card
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CardAdd;
