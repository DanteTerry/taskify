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
import { Dispatch, SetStateAction, useState } from "react";
import { chatSession } from "@/config/GoogleAIModel";
import { Loader2Icon } from "lucide-react";
import { PartialBlock } from "@blocknote/core";
import { sanitizeStyleBlocks } from "@/utils/blockNoteUtil";
import { set } from "mongoose";

function GenerateWithAi({
  setDocumentOutput,
}: {
  setDocumentOutput: Dispatch<SetStateAction<PartialBlock[]>>;
}) {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateWithAi = async () => {
    setLoading(true);
    const PROMPT =
      "Generate template for blocknote.js in JSON for " + userInput;
    const result = await chatSession.sendMessage(PROMPT);
    try {
      const output = JSON.parse(result.response.text());
      const sanitizedBlocks = sanitizeStyleBlocks(output.blocks); // Sanitize styles
      setDocumentOutput(sanitizedBlocks);
      setLoading(false);
      setUserInput("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setUserInput("");
    }
  };

  return (
    <div className="fixed bottom-8 right-5 flex h-20 w-20 items-center justify-center overflow-hidden">
      <div className="relative">
        <Popover>
          <PopoverTrigger className="flex transform items-center justify-between rounded-md bg-black/80 p-2 shadow-lg hover:bg-black dark:bg-white/80 dark:hover:bg-white">
            <video
              src="/ai-loader.mp4"
              className="h-10 w-10 rounded-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </PopoverTrigger>

          <PopoverContent className="absolute -right-8 bottom-16 p-0">
            <Card className="w-72 transform rounded-lg bg-white text-black shadow-xl dark:bg-[#1F1F1F] dark:text-white">
              <CardHeader className="border-b border-gray-300 p-4 dark:border-gray-700">
                <h3 className="text-lg font-semibold">
                  Generate Template with AI
                </h3>
              </CardHeader>
              <CardContent className="p-4">
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Describe your template..."
                  className="mb-4 border-gray-300 bg-gray-100 text-gray-800 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#292929] dark:text-gray-200"
                />
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-300 p-4 dark:border-gray-700">
                <Button
                  disabled={!userInput || loading}
                  onClick={() => generateWithAi()}
                  variant="secondary"
                  className="duration-20 w-full bg-indigo-500 text-white transition hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Generate"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default GenerateWithAi;
