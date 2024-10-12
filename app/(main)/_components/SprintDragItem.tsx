import { Badge } from "@/components/ui/badge";
import { issueDataType } from "@/types/type";
import Image from "next/image";
import { useState } from "react";
import {
  FaBookmark,
  FaCheckCircle,
  FaExclamationCircle,
  FaNetworkWired,
} from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";
import IssueDetails from "./IssueDetails";
import { SprintOutput } from "@/lib/redux/sprintSlice";

const issueTypeIcons: { [key: string]: JSX.Element } = {
  task: <FaCheckCircle className="text-[#4FADE6]" />,
  bug: <FaExclamationCircle className="text-red-500" />,
  story: <FaBookmark className="text-[#65BA43]" />,
  improvement: <IoSparklesSharp className="text-[#FFA500]" />,
  epic: <FaNetworkWired className="text-[#800080]" />,
};

const priorityStyles: { [key: string]: { color: string; label: string } } = {
  low: { color: "bg-green-500", label: "Low" },
  medium: { color: "bg-yellow-500", label: "Medium" },
  high: { color: "bg-red-500", label: "High" },
  urgent: { color: "bg-purple-500", label: "Urgent" },
};

function SprintDragItem({
  item,
  sprintId,
}: {
  item: issueDataType;
  sprintId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(true)}
      className="flex h-full max-w-sm transform flex-col gap-3 overflow-hidden rounded-lg bg-white p-4 shadow-lg transition-transform hover:scale-[101%]"
    >
      <p className="text-sm font-medium text-gray-800">{item.shortSummary}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {issueTypeIcons[item.issueType]}

          {item.priority && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {priorityStyles[item.priority].label}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center">
          {item.assignees.map((assignee, index) => (
            <div
              key={index}
              className="h-[24px] w-[24px] overflow-hidden rounded-full border-2 border-white"
            >
              <Image
                src={assignee.picture}
                width={24}
                height={24}
                alt="user avatar"
              />
            </div>
          ))}
        </div>
      </div>
      <IssueDetails
        sprintId={sprintId}
        item={item}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default SprintDragItem;
