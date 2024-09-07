"use client";
import { randomColors } from "@/constants";
import { cn } from "@/lib/utils";
import { randomLightenedColor } from "@/utils/dragndropUtil";
import { Dices } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

function CardColorPicker({
  setSelectedColor,
  selectedColor,
  randomColor,
  setRandomColor,
}: {
  setSelectedColor: Dispatch<SetStateAction<string>>;
  selectedColor: string;
  randomColor: string;
  setRandomColor: Dispatch<SetStateAction<string>>;
}) {
  let randColor: string = "";

  return (
    <div className="flex flex-col gap-2">
      <span>Card color</span>
      <div className="mx-auto flex w-full flex-wrap gap-1">
        {randomColors.map((color, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setSelectedColor(color);
              setRandomColor("");
            }}
            className={cn(
              `w-max rounded-md border border-transparent p-1 transition-all duration-300 hover:border-white`,
              selectedColor === color && `border-white`,
            )}
          >
            <div
              className="flex h-[37px] w-[37px] items-center justify-center rounded-md border border-transparent"
              style={{
                background: color,
              }}
            ></div>
          </button>
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            randColor = randomLightenedColor();
            setRandomColor(randColor);
            setSelectedColor("");
          }}
          className={cn(
            `w-max rounded-md border border-transparent p-1 transition-all duration-300 hover:border-white`,
          )}
          style={{
            borderColor: `${randomColor}`,
          }}
        >
          <div
            className={cn(
              `flex h-[37px] w-[37px] items-center justify-center rounded-md border border-transparent hover:border-transparent`,
            )}
            style={{
              backgroundColor: `${randomColor}`,
            }}
          >
            <Dices size={25} />
          </div>
        </button>
      </div>
    </div>
  );
}
export default CardColorPicker;
