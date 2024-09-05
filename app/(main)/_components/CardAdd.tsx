"use client";
import { Plus, X } from "lucide-react";
import { useState } from "react";

function CardAdd({ getCard }: { getCard: (card: string) => void }) {
  const [card, setCard] = useState("");
  const [show, setShow] = useState(false);

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
    </div>
  );
}
export default CardAdd;
