import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { issueDataType } from "@/types/type";
import { useUser } from "@clerk/nextjs";
import { CalendarIcon, Plus, Timer, Trash2, X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import {
  FaBookmark,
  FaCheckCircle,
  FaExclamationCircle,
  FaNetworkWired,
} from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";
import { Progress } from "@/components/ui/progress";
import ReactQuill from "react-quill";
import { Separator } from "@/components/ui/separator";
import CustomSelect from "@/components/UIComponents/CustomSelect";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getIssueColor, getPriorityColor } from "@/utils/sprintUtil";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import EstimatedTimeSetter from "./EstimatedTimeSetter";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const issueTypeIcons: { [key: string]: JSX.Element } = {
  task: <FaCheckCircle className="text-[#4FADE6]" />,
  bug: <FaExclamationCircle className="text-red-500" />,
  story: <FaBookmark className="text-[#65BA43]" />,
  improvement: <IoSparklesSharp className="text-[#FFA500]" />,
  epic: <FaNetworkWired className="text-[#800080]" />,
};

export interface IssueData {
  status: "backlog" | "selected for development" | "in progress" | "done";
  assignees: { fullName: string; picture: string; id: string; email: string }[];
  priority: string;
  reporter: { fullName: string; picture: string; id: string; email: string };
  estimatedTime: number;
  deadLine: Date | undefined;
  loggedTime: number;
  remainingTime: number;
  id: string;
}

export interface ShowState {
  status: boolean;
  assignees: boolean;
  priority: boolean;
  reporter: boolean;
  deadline: boolean;
}

function IssueDetails({
  item,
  open,
  setOpen,
}: {
  item: issueDataType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(item);
  const { user } = useUser();

  const collaborators = useSelector(
    (state: RootState) => state.sprint.collaborators,
  );

  const [showEstimatedTime, setShowEstimatedTime] = useState(false);

  const [issueData, setIssueData] = useState<IssueData>({
    status: item.status,
    assignees: item.assignees,
    priority: item.priority,
    reporter: item.reporter,
    estimatedTime: item.estimatedTime,
    deadLine: item?.deadLine ? new Date(item.deadLine) : undefined,
    loggedTime: 0,
    remainingTime: 0,
    id: item.id,
  });

  const [show, setShow] = useState<ShowState>({
    status: false,
    assignees: false,
    priority: false,
    reporter: false,
    deadline: false,
  });

  const handleToggle = (type: keyof ShowState) => {
    setShow((prevShow) => {
      const newShowState = Object.keys(prevShow).reduce((acc, key) => {
        acc[key as keyof ShowState] = false;
        return acc;
      }, {} as ShowState);
      return {
        ...newShowState,
        [type]: !prevShow[type],
      };
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="h-[92vh] max-w-[1040px] overflow-y-auto rounded-lg border border-gray-200 shadow-lg dark:border-gray-700">
          <DialogHeader className="h-full w-full">
            <ScrollArea className="h-full w-full">
              <div className="flex w-full items-center justify-between">
                <Button
                  variant={"ghost"}
                  className="flex gap-2 font-semibold uppercase hover:bg-[#EBECF0]"
                  size={"sm"}
                >
                  {issueTypeIcons[currentItem.issueType]}
                  {currentItem.issueType}-{currentItem.id.slice(0, 5)}
                </Button>
                <div className="flex gap-3 text-[#3b4a64]">
                  <Button
                    className="hover:bg-[#EBECF0]"
                    variant={"ghost"}
                    size={"icon"}
                  >
                    <Trash2 size={20} />
                  </Button>
                  <Button
                    onClick={() => setOpen(false)}
                    className="hover:bg-[#EBECF0]"
                    variant={"ghost"}
                    size={"icon"}
                  >
                    <X size={20} />
                  </Button>
                </div>
              </div>

              {/* title */}
              <div className="flex gap-10">
                <div className="flex w-[600px] flex-col gap-5">
                  <textarea
                    value={currentItem.shortSummary || ""}
                    className="mt-2 w-full resize-none rounded-md border-2 border-transparent px-3 py-2 text-xl font-medium text-[#172B4D] outline-none placeholder:text-xs hover:bg-gray-100 focus:border-[#4FADE6] focus:bg-transparent dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 dark:placeholder:text-gray-500"
                    required
                    rows={
                      currentItem?.shortSummary &&
                      currentItem?.shortSummary?.length > 50
                        ? 2
                        : 1
                    }
                  />

                  <div className="flex flex-col pl-4">
                    <p className="text-sm font-bold capitalize text-[#172B4D]">
                      Description
                    </p>
                    <div className="max-h-[500px] overflow-auto">
                      {isEditing ? (
                        <>
                          <ReactQuill
                            value={currentItem.description}
                            className="mt-2 bg-white dark:bg-[#1f1f1f] dark:text-white"
                            theme="snow"
                            placeholder="Describe the issue in as much detail as possible"
                            style={{ height: "auto" }} // Allow dynamic height
                            modules={{
                              toolbar: [
                                [
                                  { header: "1" },
                                  { header: "2" },
                                  { font: [] },
                                ],
                                [{ list: "ordered" }, { list: "bullet" }],
                                ["bold", "italic", "strike"],
                                [{ align: [] }],
                                ["link", "image"],
                                [{ color: [] }, { background: [] }],
                              ],
                            }}
                            onChange={(value) =>
                              setCurrentItem({
                                ...currentItem,
                                description: value,
                              })
                            }
                          />

                          <div className="mt-3 flex items-center gap-5">
                            <Button className="bg-[#0052CC]" size={"sm"}>
                              Save
                            </Button>
                            <Button
                              size={"sm"}
                              onClick={() => setIsEditing(false)}
                              variant={"ghost"}
                            >
                              Cancel
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div
                          className="cursor-pointer rounded-md bg-white p-2 pl-0 text-sm font-medium text-[#172B4D] dark:bg-[#1f1f1f] dark:text-white"
                          onClick={() => setIsEditing(true)}
                          dangerouslySetInnerHTML={{
                            __html: currentItem.description,
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="pl-4">
                    <p className="mb-2 text-sm font-bold capitalize text-[#172B4D]">
                      Comments
                    </p>
                    <div className="mt-1.5">
                      <div className="mb-4 flex items-center gap-3">
                        <Image
                          width={32}
                          height={32}
                          src={user?.imageUrl || ""}
                          alt="profile"
                          className="rounded-full"
                        />
                        <div className="flex w-full flex-col gap-2">
                          <textarea
                            placeholder="Add a comment..."
                            className="w-full resize-none rounded-md border-2 border-transparent bg-gray-100 px-3 py-2 text-sm font-medium text-[#172B4D] outline-none placeholder:text-xs focus:border-[#4FADE6] focus:bg-transparent dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 dark:placeholder:text-gray-500"
                            required
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="ml-14 mt-2 flex items-center gap-5">
                        <Button size={"sm"} className="bg-[#0052CC]">
                          Save
                        </Button>
                        <Button
                          onClick={() => setIsEditing(false)}
                          variant={"ghost"}
                          size={"sm"}
                        >
                          Cancel
                        </Button>
                      </div>

                      {/* comment template */}
                      <div className="mt-5">
                        <div className="mt-3 flex items-center gap-3">
                          <Image
                            width={32}
                            height={32}
                            src={user?.imageUrl || ""}
                            alt="profile"
                            className="rounded-full"
                          />
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-[#172B4D]">
                                {user?.fullName}
                              </p>
                              <p className="text-xs text-[#6B778C]">
                                2 days ago
                              </p>
                            </div>
                            <p className="text-sm text-[#172B4D]">
                              This is a comment
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-[300px] flex-col gap-5">
                  {/* status */}
                  <CustomSelect
                    show={show}
                    setShow={setShow}
                    issueData={issueData}
                    setIssueData={setIssueData}
                    type="status"
                    option={[
                      "backlog",
                      "selected for development",
                      "in progress",
                      "done",
                    ]}
                  >
                    {" "}
                    <Button
                      onClick={() => handleToggle("status")}
                      variant="ghost"
                      className={`hover:${getIssueColor(issueData.status)} flex w-max items-center justify-between text-white hover:text-white ${getIssueColor(issueData.status)}`}
                    >
                      <span className="text-sm font-medium uppercase">
                        {issueData.status}
                      </span>
                    </Button>
                  </CustomSelect>

                  {/* Assignees */}
                  <CustomSelect
                    show={show}
                    setShow={setShow}
                    issueData={issueData}
                    setIssueData={setIssueData}
                    type="assignees"
                    option={[...collaborators]}
                  >
                    <div className="">
                      {issueData?.assignees?.length === 0 && (
                        <Button
                          onClick={() => handleToggle("assignees")}
                          variant="ghost"
                          className="flex w-max items-center justify-between px-2"
                        >
                          <span className="text-sm font-medium">
                            {"Unassigned"}
                          </span>
                        </Button>
                      )}

                      {issueData?.assignees?.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1">
                          {issueData.assignees.map((assignee, index) => (
                            <div
                              className="flex items-center gap-2 rounded-md bg-gray-100 p-1 shadow-sm"
                              key={index}
                            >
                              <Image
                                key={index}
                                width={24}
                                height={24}
                                src={assignee.picture}
                                alt="profile"
                                className="rounded-full"
                              />

                              <span className="text-xs font-medium text-gray-700">
                                {assignee.fullName}
                              </span>

                              <button
                                className="p-0.5 text-gray-500 hover:text-red-500"
                                onClick={() => {
                                  setIssueData((prevIssueData) => ({
                                    ...prevIssueData,
                                    assignees: prevIssueData.assignees.filter(
                                      (_, i) => i !== index,
                                    ),
                                  }));
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}

                          <Button
                            onClick={() => handleToggle("assignees")}
                            variant="ghost"
                            className="flex w-max items-center justify-between px-2 text-gray-500 hover:text-blue-500"
                          >
                            <Plus size={20} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CustomSelect>

                  {/* reporter */}

                  <CustomSelect
                    show={show}
                    setShow={setShow}
                    issueData={issueData}
                    setIssueData={setIssueData}
                    type="reporter"
                    option={[...collaborators]}
                  >
                    {" "}
                    <Button
                      onClick={() => handleToggle("reporter")}
                      variant="ghost"
                      className="flex w-max items-center justify-between gap-2 bg-gray-100 px-1 hover:bg-gray-100"
                    >
                      {issueData.reporter && (
                        <>
                          <Image
                            width={24}
                            height={24}
                            src={issueData.reporter.picture}
                            alt="profile"
                            className="rounded-full"
                          />

                          <span className="text-xs font-medium text-gray-700">
                            {issueData.reporter.fullName}
                          </span>
                        </>
                      )}
                    </Button>
                  </CustomSelect>

                  {/* priority */}

                  <CustomSelect
                    show={show}
                    setShow={setShow}
                    issueData={issueData}
                    setIssueData={setIssueData}
                    type="priority"
                    option={["low", "medium", "high", "urgent"]}
                  >
                    {" "}
                    <Button
                      onClick={() => handleToggle("priority")}
                      variant="outline"
                      className="hover:gray-100 flex w-max items-center justify-between gap-2 bg-gray-100 px-1"
                    >
                      {issueData.priority && (
                        <>
                          <span
                            className={`h-3 w-3 rounded-full ${getPriorityColor(issueData.priority)}`}
                          ></span>
                          <span className="text-xs font-medium uppercase text-gray-700">
                            {issueData.priority}
                          </span>
                        </>
                      )}
                    </Button>
                  </CustomSelect>

                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold uppercase text-gray-600">
                      deadline
                    </p>
                    <div className="flex w-max flex-wrap gap-1">
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start bg-gray-100 text-left font-normal",
                              !issueData.deadLine && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {issueData.deadLine ? (
                              format(issueData.deadLine, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={issueData.deadLine}
                            onSelect={(selectedDate) => {
                              if (selectedDate) {
                                setIssueData({
                                  ...issueData,
                                  deadLine: selectedDate,
                                });
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* original  estimated  (hours) */}
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-600">
                      original estimated (hours)
                    </p>
                    <input
                      value={issueData.estimatedTime}
                      type="number"
                      className="mt-1 w-full resize-none rounded-md border-2 border-transparent px-1 py-1 text-sm font-medium text-[#172B4D] outline-none placeholder:text-xs hover:bg-gray-100 focus:border-[#4FADE6] focus:bg-transparent dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 dark:placeholder:text-gray-500"
                      required
                    />
                  </div>

                  {/* time tracking  */}
                  <div className="flex cursor-pointer flex-col rounded-md p-1 hover:bg-gray-100">
                    <p className="text-xs font-bold uppercase text-gray-600">
                      Time tracking
                    </p>

                    <div
                      onClick={() => setShowEstimatedTime(true)}
                      className="mt-2 flex cursor-pointer items-center gap-1.5 text-gray-700"
                    >
                      <Timer size={32} />

                      <div className="flex w-full flex-col gap-1">
                        <Progress
                          value={issueData.loggedTime}
                          max={issueData.estimatedTime}
                        />
                        <div className="flex justify-between">
                          <p className="text-xs">
                            {issueData.loggedTime}h logged
                          </p>{" "}
                          <p className="text-xs">
                            {issueData.remainingTime}h remaining
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* separator */}

                  {/* created and updated */}
                  <div className="flex flex-col gap-1 text-xs font-medium text-[#67758B]">
                    <Separator className="h-[2px]" />
                    <p className="mt-2 capitalize">Created at 1 days ago</p>
                    <p className="capitalize">Updated at a days ago</p>
                  </div>

                  {/* testing select component */}
                </div>
              </div>
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <EstimatedTimeSetter
        showEstimatedTime={showEstimatedTime}
        setShowEstimatedTime={setShowEstimatedTime}
        issueData={issueData}
        setIssueData={setIssueData}
      />
    </div>
  );
}

export default IssueDetails;
