import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Timer, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { IssueData } from "./IssueDetails";
import { Progress } from "@/components/ui/progress";

function EstimatedTimeSetter({
  showEstimatedTime,
  setShowEstimatedTime,
  issueData,
  setIssueData,
}: {
  showEstimatedTime: boolean;
  setShowEstimatedTime: Dispatch<SetStateAction<boolean>>;
  issueData: IssueData;
  setIssueData: Dispatch<SetStateAction<IssueData>>;
}) {
  // Ensure remainingTime is set to estimatedTime when both are 0
  if (issueData.loggedTime === 0 && issueData.remainingTime === 0) {
    setIssueData((prev) => ({
      ...prev,
      remainingTime: prev.estimatedTime,
    }));
  }

  // Handlers for updating logged and remaining times
  const handleLoggedTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const loggedTime = parseInt(e.target.value) || 0;

    if (loggedTime > issueData.estimatedTime) {
      alert("Logged time cannot be greater than estimated time.");
      return;
    }

    setIssueData((prev) => ({
      ...prev,
      loggedTime,
      remainingTime: prev.estimatedTime - loggedTime,
    }));
  };

  const handleRemainingTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const remainingTime = parseInt(e.target.value) || 0;

    if (remainingTime > issueData.estimatedTime) {
      alert("Remaining time cannot be greater than estimated time.");
      return;
    }

    setIssueData((prev) => ({
      ...prev,
      remainingTime,
      loggedTime: prev.estimatedTime - remainingTime,
    }));
  };

  return (
    <Dialog open={showEstimatedTime} onOpenChange={setShowEstimatedTime}>
      <DialogContent className="max-w-[400px] rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Time Tracking
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowEstimatedTime(false)}
            >
              <X className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100" />
            </Button>
          </div>

          <div className="mt-4 flex flex-col rounded-md bg-gray-100 p-4 dark:bg-gray-700">
            <div className="flex items-center gap-2">
              <Timer size={35} className="text-blue-500" />
              <div className="flex w-full flex-col gap-2">
                <Progress
                  value={issueData.loggedTime}
                  max={issueData.estimatedTime}
                  className="h-2 rounded-full"
                />
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    {issueData.loggedTime}h logged
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {issueData.remainingTime}h remaining
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogDescription className="mt-4 text-gray-600 dark:text-gray-400">
            Adjust the estimated time for this issue.
          </DialogDescription>

          <div className="mt-4 flex gap-4">
            {/* Input for logged time */}
            <input
              type="number"
              value={issueData.loggedTime}
              onChange={handleLoggedTimeChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Logged Time"
            />
            {/* Input for remaining time */}
            <input
              type="number"
              value={issueData.remainingTime}
              onChange={handleRemainingTimeChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Remaining Time"
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EstimatedTimeSetter;
