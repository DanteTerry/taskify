import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { issueDataType } from "@/types/type";
import { useUser } from "@clerk/nextjs";
import { ChevronDown, Timer, Trash2, X } from "lucide-react";
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] max-w-[1040px] overflow-y-auto rounded-lg border border-gray-200 shadow-lg dark:border-gray-700">
        <DialogHeader>
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
                          setCurrentItem({ ...currentItem, description: value })
                        }
                      />

                      <div className="mt-5 flex items-center gap-5">
                        <Button className="bg-[#0052CC]">Save</Button>
                        <Button
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
              <div>
                <p className="text-sm font-medium capitalize text-gray-700">
                  Status
                </p>
                <Button className="mt-1 flex items-center gap-2 bg-gray-300 px-2 font-medium capitalize text-gray-800 hover:bg-gray-300">
                  {item.status}
                  <ChevronDown size={20} />
                </Button>
              </div>

              {/* Assignees */}
              <div>
                <p className="text-sm font-medium capitalize text-gray-700">
                  Assignees
                </p>
                <Button className="mt-1 flex items-center gap-2 bg-gray-300 px-2 font-medium capitalize text-gray-800 hover:bg-gray-300">
                  {item.assignees[0]}
                  <ChevronDown size={20} />
                </Button>
              </div>

              {/* reporter */}
              <div>
                <p className="text-sm font-medium capitalize text-gray-700">
                  Reporter
                </p>
                <Button className="mt-1 flex items-center gap-2 bg-gray-300 font-medium capitalize text-gray-800 hover:bg-gray-300">
                  <Image
                    width={20}
                    height={20}
                    src={user?.imageUrl || ""}
                    alt="profile"
                    className="rounded-full"
                  />
                  <p>{item.reporter[0]}</p>
                </Button>
              </div>

              {/* priority */}

              <div>
                <p className="text-sm font-medium capitalize text-gray-700">
                  Priority
                </p>
                <Button
                  variant={"ghost"}
                  className="mt-1 flex items-center gap-2 px-1.5 font-medium capitalize text-gray-800 hover:bg-gray-200"
                >
                  <span
                    className={`h-3 w-3 rounded-full ${priorityStyles[item.priority].color}`}
                  ></span>
                  {item.priority}
                </Button>
              </div>

              {/* original  estimated  (hours) */}
              <div>
                <p className="text-sm font-medium capitalize text-gray-700">
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
                <p className="text-sm font-medium capitalize text-gray-700">
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
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default IssueDetails;
