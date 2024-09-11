import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DatePicker({
  deadLine,
  setDeadLine,
}: {
  deadLine: Date;
  setDeadLine: any;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <span>Deadline</span>
      <div className="mx-auto flex w-full flex-wrap gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !deadLine && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {deadLine ? format(deadLine, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={deadLine}
              onSelect={setDeadLine}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
export default DatePicker;
