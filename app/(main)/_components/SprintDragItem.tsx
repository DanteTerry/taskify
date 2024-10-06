import { Badge } from "@/components/ui/badge";
import { issueDataType, listType } from "@/types/type";
import Image from "next/image";
import {
  FaBookmark,
  FaCheckCircle,
  FaExclamationCircle,
  FaNetworkWired,
} from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";

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
  data,
}: {
  item: issueDataType;
  data: listType;
}) {
  return (
    <div className="hover:scale-1.1 flex max-w-sm transform flex-col gap-2 overflow-hidden rounded-lg bg-white p-4 shadow-lg transition-transform hover:scale-105">
      <p className="text-sm font-medium text-gray-800">{item.shortSummary}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {issueTypeIcons[item.issueType]}

          {item.priority && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {priorityStyles[item.priority].label}
              </span>
              {/* <span
                className={`h-3 w-3 rounded-full ${priorityStyles[item.priority].color}`}
              ></span> */}
            </div>
          )}
        </div>

        <div className="flex items-center">
          <div className="h-[24px] w-[24px] overflow-hidden rounded-full border-2 border-white">
            <Image
              src={
                "https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303073.jpg?t=st=1728226672~exp=1728230272~hmac=47a7a411bcead40083ef9b51c7b79edae21127fcf034b74b529b5723c5950556&w=740"
              }
              width={24}
              height={24}
              alt="user avatar"
            />
          </div>

          <div className="-ml-1.5 h-[24px] w-[24px] overflow-hidden rounded-full border-2 border-white">
            <Image
              src={
                "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611746.jpg?t=st=1728226638~exp=1728230238~hmac=110cf24c7e3c45473289cf4431ede0803eddd19ea262492ee0135d615f4f7bbd&w=740"
              }
              width={24}
              height={24}
              alt="user avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SprintDragItem;
