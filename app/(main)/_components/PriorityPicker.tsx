import { priorities } from "@/constants";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PriorityType } from "@/lib/redux/boardSlice";

function PriorityPicker({
  priority,
  setPriority,
}: {
  priority: PriorityType;
  setPriority: Dispatch<SetStateAction<PriorityType>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span>Priority</span>
      <div className="flex items-center gap-2">
        {priorities.map((pri, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setPriority(pri);
                  }}
                  key={index}
                  className={cn(
                    `flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-all duration-300 hover:border-[#1f1f1f]`,
                    pri.priority === priority.priority && "border-[#1f1f1f]",
                  )}
                >
                  <div
                    className={cn(`h-3 w-3 rounded-full`)}
                    style={{
                      backgroundColor: `${pri.color}`,
                    }}
                  ></div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">{pri.priority}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
export default PriorityPicker;
