import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { issueDataType } from "@/types/type";
import { useUser } from "@clerk/nextjs";
import { ChevronDown, Plus, Timer, Trash2, X } from "lucide-react";
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
  priority: { label: string; color: string };
  reporter: { fullName: string; picture: string; id: string; email: string };
}

export interface ShowState {
  status: boolean;
  assignees: boolean;
  priority: boolean;
  reporter: boolean;
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

  const [issueData, setIssueData] = useState<IssueData>({
    status: item.status,
    assignees: item.assignees,
    priority: {
      label: "Urgent",
      color: "bg-purple-500",
    },
    reporter: item.reporter,
  });

  const [show, setShow] = useState<ShowState>({
    status: false,
    assignees: false,
    priority: false,
    reporter: false,
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

  let className;
  switch (issueData.status.toLowerCase()) {
    case "backlog":
      className = "bg-purple-500";
      break;
    case "selected for development":
      className = "bg-yellow-500";
      break;
    case "in progress":
      className = "bg-blue-500";
      break;
    case "done":
      className = "bg-green-500";
      break;
    default:
      className = "bg-gray-500";
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="max-h-[90vh] max-w-[1040px] overflow-y-auto rounded-lg border border-gray-200 shadow-lg dark:border-gray-700">
        <DialogHeader className="h-full w-full">
          <ScrollArea className="h-full w-full">
            <div className="flex w-full items-center justify-between">
              <Button
                variant={"ghost"}
                className="flex gap-2 text-base uppercase hover:bg-[#EBECF0]"
                size={"default"}
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
                    currentItem.shortSummary &&
                    currentItem.shortSummary.length > 50
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
                              [{ header: "1" }, { header: "2" }, { font: [] }],
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
                            <p className="text-xs text-[#6B778C]">2 days ago</p>
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
                    variant="outline"
                    className={`hover:${className} flex w-max items-center justify-between text-white hover:text-white ${className}`}
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
                  option={[
                    {
                      fullName: "John Doe",
                      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
                    },
                    {
                      fullName: "Jane Smith",
                      imageUrl:
                        "https://randomuser.me/api/portraits/women/2.jpg",
                    },
                    {
                      fullName: "Michael Johnson",
                      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
                    },
                    {
                      fullName: "Emily Davis",
                      imageUrl:
                        "https://randomuser.me/api/portraits/women/4.jpg",
                    },
                    {
                      fullName: "Chris Brown",
                      imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
                    },
                  ]}
                >
                  <div className="">
                    {issueData.assignees.length === 0 && (
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

                    {issueData.assignees.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1">
                        {issueData.assignees.map((assignee, index) => (
                          <div
                            className="flex items-center gap-2 rounded-md bg-gray-200 p-1 shadow-sm"
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
                  option={[
                    {
                      fullName: "John Doe",
                      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
                    },
                    {
                      fullName: "Jane Smith",
                      imageUrl:
                        "https://randomuser.me/api/portraits/women/2.jpg",
                    },
                    {
                      fullName: "Michael Johnson",
                      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
                    },
                    {
                      fullName: "Emily Davis",
                      imageUrl:
                        "https://randomuser.me/api/portraits/women/4.jpg",
                    },
                    {
                      fullName: "Chris Brown",
                      imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
                    },
                  ]}
                >
                  {" "}
                  <Button
                    onClick={() => handleToggle("reporter")}
                    variant="outline"
                    className="flex w-max items-center justify-between gap-2 bg-gray-200 px-1 hover:bg-gray-200"
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
                  option={[
                    {
                      label: "Low",
                      color: "bg-green-500",
                    },
                    {
                      label: "Medium",
                      color: "bg-yellow-500",
                    },
                    {
                      label: "High",
                      color: "bg-red-500",
                    },
                    {
                      label: "Urgent",
                      color: "bg-purple-500",
                    },
                  ]}
                >
                  {" "}
                  <Button
                    onClick={() => handleToggle("priority")}
                    variant="outline"
                    className="flex w-max items-center justify-between gap-2 bg-gray-200 px-1 hover:bg-slate-200"
                  >
                    {issueData.priority && (
                      <>
                        <span
                          className={`h-3 w-3 rounded-full ${issueData.priority.color}`}
                        ></span>
                        <span className="text-xs font-medium text-gray-700">
                          {issueData.priority.label}
                        </span>
                      </>
                    )}
                  </Button>
                </CustomSelect>

                {/* original  estimated  (hours) */}
                <div>
                  <p className="text-xs font-bold uppercase text-gray-600">
                    original estimated (hours)
                  </p>
                  <input
                    value={"20"}
                    className="mt-1 w-full resize-none rounded-md border-2 border-transparent px-1 py-1 text-sm font-medium text-[#172B4D] outline-none placeholder:text-xs hover:bg-gray-100 focus:border-[#4FADE6] focus:bg-transparent dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 dark:placeholder:text-gray-500"
                    required
                  />
                </div>

                {/* time tracking  */}
                <div className="flex cursor-pointer flex-col rounded-md p-1 hover:bg-gray-100">
                  <p className="text-xs font-bold uppercase text-gray-600">
                    Time tracking
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-gray-700">
                    <Timer size={30} />

                    <div className="flex w-full flex-col gap-1">
                      <Progress value={60} />
                      <div className="flex justify-between">
                        <p className="text-xs">10h logged</p>{" "}
                        <p className="text-xs">12h estimated</p>
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
  );
}

export default IssueDetails;
