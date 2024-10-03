import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function GenerateWithAi() {
  return (
    <div className="fixed bottom-8 right-5 flex h-20 w-20 items-center justify-center overflow-hidden">
      <div className="relative">
        <Popover>
          <PopoverTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button className="flex transform items-center justify-between rounded-md bg-black/80 p-2 shadow-lg hover:bg-black">
                    <video
                      src="/ai-loader.mp4"
                      className="h-10 w-10 rounded-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="rounded-md p-2 text-white shadow-lg dark:bg-[#0A0A0A]">
                  <p className="text-sm font-semibold">Generate With AI</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </PopoverTrigger>

          <PopoverContent className="absolute -right-8 bottom-16 p-0">
            <Card className="w-72 transform rounded-lg bg-[#1F1F1F] text-white shadow-xl">
              <CardHeader className="border-b border-gray-700 p-4">
                <h3 className="text-lg font-semibold">
                  Generate Template with AI
                </h3>
              </CardHeader>
              <CardContent className="p-4">
                <Textarea
                  placeholder="Describe your template..."
                  className="mb-4 border-gray-700 bg-[#292929] text-gray-200 focus:ring-2 focus:ring-blue-500"
                />
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-700 p-4">
                <Button
                  variant="secondary"
                  className="bg-indigo-500 transition duration-200 hover:bg-indigo-600"
                >
                  Generate
                </Button>
                <Button variant="secondary">Cancel</Button>
              </CardFooter>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default GenerateWithAi;
