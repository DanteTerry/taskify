"use client";
import { Plus, X } from "lucide-react";
import { useState } from "react";

function CardAdd() {
  const [card, setCard] = useState("");
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      <div className="flex flex-col">
        {show && (
          <div>
            <textarea
              className="rounded-md border-2 bg-zinc-900 p-1"
              name=""
              id=""
              cols={24}
              rows={2}
              placeholder="Enter Card Title.."
            ></textarea>
            <div className="flex p-1">
              <button className="mr-2 rounded bg-sky-600 p-1 text-white hover:bg-gray-600">
                Add card
              </button>
              <button
                onClick={() => setShow(false)}
                className="rounded p-1 hover:bg-gray-600"
              >
                <X />
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setShow(true)}
          className="mt-1 flex h-8 w-full items-center justify-start rounded p-1 hover:bg-gray-500"
        >
          <Plus size={16} /> Add a card
        </button>
      </div>
    </div>
  );
}
export default CardAdd;
