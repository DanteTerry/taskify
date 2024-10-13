import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { issueDataType } from "@/types/type";
import { CalendarIcon, Plus, Timer, Trash2 } from "lucide-react";
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
import {
  formatDate,
  getIssueColor,
  getPriorityColor,
  handleDeleteIssue,
  handleIssuePropertyChange,
} from "@/utils/sprintUtil";
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
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useParams } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import SprintComment from "./SprintComment";
import { typeIssue } from "@/constants";
import { useUser } from "@clerk/nextjs";
import { current } from "@reduxjs/toolkit";

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
  createdAt: Date;
  comments: {
    id: string;
    comment: string;
    user: {
      id: string;
      fullName: string;
      picture: string;
      email: string;
    };
  }[];
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
  sprintId,
}: {
  item: issueDataType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  sprintId: string;
}) {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

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
    deadLine:
      item.deadLine instanceof Timestamp
        ? item.deadLine.toDate()
        : new Date(item.deadLine),
    createdAt:
      item.createdAt instanceof Timestamp
        ? item.createdAt.toDate()
        : new Date(item.createdAt),
    loggedTime: item.loggedTime,
    remainingTime: item.remainingTime,
    id: item.id,
    comments: item.comments,
  });

  const [show, setShow] = useState<ShowState>({
    status: false,
    assignees: false,
    priority: false,
    reporter: false,
    deadline: false,
  });

  const [description, setDescription] = useState(item.description);

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

  const currentUserCollaborator = collaborators.find(
    (collaborator) => collaborator.id === user?.id,
  );

  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="h-[100vh] max-w-full overflow-y-auto rounded-none border border-gray-200 shadow-lg dark:border-gray-700 sm:max-w-max md:h-[90vh] md:rounded-lg">
          <DialogHeader className="h-full w-full">
            <ScrollArea className="h-full w-full">
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
              <div className="flex w-full items-center justify-between sm:flex-row">
                <Popover modal={true}>
                  <PopoverTrigger>
                    <Button
                      variant={"ghost"}
                      className="flex w-full justify-start gap-2 pl-0 font-semibold uppercase hover:bg-[#EBECF0] hover:bg-transparent sm:w-44"
                      size={"sm"}
                    >
                      {issueTypeIcons[item.issueType]}
                      {item.issueType}-{item.id.slice(0, 5)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-[200px] p-0 focus:ring-0">
                    <div className="mt-2 flex flex-col items-start gap-1 pb-2">
                      {typeIssue.map((option, index) => (
                        <Button
                          disabled={currentUserCollaborator?.role === "viewer"}
                          onClick={() => {
                            handleIssuePropertyChange(
                              "issueType",
                              option.title,
                              sprintId as string,
                              issueData,
                            );
                          }}
                          key={index}
                          variant={"ghost"}
                          className="flex w-full justify-start rounded-none px-2 hover:bg-[#D2E5FE]"
                        >
                          <div className="flex items-center gap-2">
                            {/* Icon for the issue type */}
                            <span className={`h-4 w-4 ${option.textColor}`}>
                              {<option.icon />}
                            </span>{" "}
                            {/* Title */}
                            <span className="text-sm font-medium capitalize">
                              {option.title}
                            </span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* issue type  */}

                {/* delete button  */}
                <div className="mt-2 flex gap-3 text-[#3b4a64] sm:mt-0">
                  <Button
                    className={cn(
                      `hover:bg-[#EBECF0]`,
                      currentUserCollaborator?.role === "collaborator" ||
                        currentUserCollaborator?.role === "viewer"
                        ? "hidden"
                        : "",
                    )}
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => {
                      if (
                        currentUserCollaborator?.role === "collaborator" ||
                        currentUserCollaborator?.role === "viewer"
                      ) {
                        return;
                      }

                      handleDeleteIssue(sprintId as string, issueData);
                    }}
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>

              {/* title */}
              <div className="flex flex-col gap-10 lg:flex-row">
                <div className="flex w-full flex-col gap-3 sm:w-[550px]">
                  <textarea
                    disabled={currentUserCollaborator?.role === "viewer"}
                    value={item.shortSummary || ""}
                    onChange={(e) =>
                      handleIssuePropertyChange(
                        "shortSummary",
                        e.target.value,
                        sprintId as string,
                        issueData,
                      )
                    }
                    className="mt-2 w-full resize-none rounded-md border-2 border-transparent bg-transparent px-3 py-2 pl-0 text-xl font-medium text-[#172B4D] outline-none placeholder:text-xs hover:bg-gray-100 focus:border-[#4FADE6] focus:bg-transparent dark:border-none dark:border-gray-600 dark:bg-[#1f1f1f] dark:bg-transparent dark:text-gray-200 dark:placeholder:text-gray-500"
                    required
                    rows={
                      item?.shortSummary && item?.shortSummary?.length > 52
                        ? 2
                        : 1
                    }
                  />

                  <div className="flex flex-col">
                    <p className="text-left text-sm font-bold capitalize text-[#0052CC] dark:text-[#538be0]">
                      Description
                    </p>
                    <div className="flex max-h-[500px] justify-start overflow-auto">
                      {isEditing ? (
                        <>
                          <ReactQuill
                            value={description}
                            className="mt-2 bg-white dark:bg-transparent dark:text-white"
                            theme="snow"
                            placeholder="Describe the issue in as much detail as possible"
                            style={{ height: "auto" }}
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
                            onChange={(value) => {
                              setDescription(value);
                            }}
                          />
                        </>
                      ) : (
                        <div
                          className="cursor-pointer rounded-md bg-white p-2 pl-0 text-sm font-medium text-[#172B4D] dark:border-none dark:bg-[#1f1f1f] dark:bg-transparent dark:text-white"
                          onClick={() => {
                            if (currentUserCollaborator?.role === "viewer") {
                              return;
                            }
                            setIsEditing(true);
                          }}
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                        />
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <div className="flex items-center gap-5 md:pl-4">
                      <Button
                        onClick={() => {
                          handleIssuePropertyChange(
                            "description",
                            description,
                            sprintId as string,
                            issueData,
                          );
                          setIsEditing(false);
                        }}
                        className="bg-[#0052CC] text-white"
                        size={"sm"}
                      >
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
                  )}

                  {/* comments */}
                  <SprintComment
                    sprintId={sprintId}
                    item={item}
                    issueData={issueData}
                  />
                </div>

                {/* second div */}
                <div className="flex w-full flex-col gap-5 sm:w-[300px]">
                  {/* status */}
                  <CustomSelect
                    sprintId={sprintId}
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
                      onClick={() => {
                        if (currentUserCollaborator?.role === "viewer") {
                          return;
                        }
                        handleToggle("status");
                      }}
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
                    sprintId={sprintId}
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
                          onClick={() => {
                            if (currentUserCollaborator?.role === "viewer") {
                              return;
                            }
                            handleToggle("assignees");
                          }}
                          variant="ghost"
                          className="flex w-max items-center justify-between px-2 dark:bg-[#262626]"
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
                              className="flex items-center gap-2 rounded-md bg-gray-100 px-1 py-2 shadow-sm dark:bg-[#262626] dark:text-white"
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

                              <span className="text-xs font-medium text-gray-700 dark:text-white">
                                {assignee.fullName}
                              </span>

                              <button
                                className="p-0.5 text-gray-500 hover:text-red-400 dark:text-white hover:dark:text-red-500"
                                onClick={() => {
                                  if (
                                    currentUserCollaborator?.role === "viewer"
                                  ) {
                                    return;
                                  }
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
                            disabled={
                              currentUserCollaborator?.role === "viewer"
                            }
                            onClick={() => {
                              if (currentUserCollaborator?.role === "viewer") {
                                return;
                              }
                              handleToggle("assignees");
                            }}
                            variant="ghost"
                            className="flex w-max items-center justify-between px-2 text-gray-500 hover:text-blue-500 dark:text-white"
                          >
                            <Plus size={20} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CustomSelect>

                  {/* reporter */}

                  <CustomSelect
                    sprintId={sprintId}
                    show={show}
                    setShow={setShow}
                    issueData={issueData}
                    setIssueData={setIssueData}
                    type="reporter"
                    option={[...collaborators]}
                  >
                    {" "}
                    <Button
                      onClick={() => {
                        if (currentUserCollaborator?.role === "viewer") {
                          return;
                        }
                        handleToggle("reporter");
                      }}
                      variant="ghost"
                      className="flex w-max items-center justify-between gap-2 bg-gray-100 px-2 hover:bg-gray-100 dark:bg-[#262626]"
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

                          <span className="text-xs font-medium text-gray-700 dark:text-white">
                            {issueData.reporter.fullName}
                          </span>
                        </>
                      )}
                    </Button>
                  </CustomSelect>

                  {/* priority */}

                  <CustomSelect
                    sprintId={sprintId}
                    show={show}
                    setShow={setShow}
                    issueData={issueData}
                    setIssueData={setIssueData}
                    type="priority"
                    option={["low", "medium", "high", "urgent"]}
                  >
                    {" "}
                    <Button
                      onClick={() => {
                        if (currentUserCollaborator?.role === "viewer") {
                          return;
                        }
                        handleToggle("priority");
                      }}
                      variant="outline"
                      className="flex w-max items-center justify-between gap-2 bg-gray-100 px-2 hover:bg-gray-100 dark:bg-[#262626]"
                    >
                      {issueData.priority && (
                        <>
                          <span
                            className={`h-3 w-3 rounded-full ${getPriorityColor(issueData.priority)}`}
                          ></span>
                          <span className="text-xs font-medium uppercase text-gray-700 dark:text-white">
                            {issueData.priority}
                          </span>
                        </>
                      )}
                    </Button>
                  </CustomSelect>

                  <div className="flex flex-col gap-1 md:pl-4">
                    <p className="text-left text-xs font-bold uppercase text-gray-600">
                      deadline
                    </p>
                    <div className="flex w-max flex-wrap gap-1">
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <Button
                            disabled={
                              currentUserCollaborator?.role === "viewer"
                            }
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start bg-gray-100 text-left font-normal dark:bg-[#262626]",
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
                            selected={issueData?.deadLine}
                            onSelect={(selectedDate) => {
                              if (currentUserCollaborator?.role === "viewer") {
                                return;
                              }
                              if (selectedDate) {
                                setIssueData({
                                  ...issueData,
                                  deadLine: selectedDate,
                                });

                                handleIssuePropertyChange(
                                  "deadLine",
                                  selectedDate,
                                  sprintId as string,
                                  issueData,
                                );
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* original  estimated  (hours) */}
                  <div className="md:pl-4">
                    <p className="text-left text-xs font-bold uppercase text-gray-600">
                      original estimated (hours)
                    </p>
                    <input
                      disabled={currentUserCollaborator?.role === "viewer"}
                      value={issueData.estimatedTime}
                      type="number"
                      onChange={(e) => {
                        setIssueData({
                          ...issueData,
                          estimatedTime: parseInt(e.target.value),
                        });

                        handleIssuePropertyChange(
                          "estimatedTime",
                          parseInt(e.target.value),
                          sprintId as string,
                          issueData,
                        );
                      }}
                      className="mt-1 w-full resize-none rounded-md border-2 border-transparent px-1 py-1 text-sm font-medium text-[#172B4D] outline-none placeholder:text-xs hover:bg-gray-100 focus:border-[#4FADE6] focus:bg-transparent dark:border-[#262626] dark:bg-[#1f1f1f] dark:text-gray-200 dark:placeholder:text-gray-500"
                      required
                    />
                  </div>

                  {/* time tracking  */}
                  <div className="flex cursor-pointer flex-col rounded-md p-1 hover:bg-gray-100 dark:hover:bg-transparent md:pl-4">
                    <p className="text-left text-xs font-bold uppercase text-gray-600">
                      Time tracking
                    </p>

                    <div
                      onClick={() => {
                        if (currentUserCollaborator?.role === "viewer") {
                          return;
                        }
                        setShowEstimatedTime(true);
                      }}
                      className="mt-2 flex cursor-pointer items-center gap-1.5 text-gray-700"
                    >
                      <Timer size={32} className="dark:text-gray-100" />

                      <div className="flex w-full flex-col gap-1">
                        <Progress
                          value={issueData.loggedTime}
                          max={issueData.estimatedTime}
                        />
                        <div className="flex justify-between">
                          <p className="text-xs dark:text-gray-100">
                            {issueData.loggedTime}h logged
                          </p>{" "}
                          <p className="text-xs dark:text-gray-100">
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
                    <p className="mt-2 capitalize dark:text-gray-100">
                      {formatDate(issueData.createdAt)}
                    </p>

                    {/* todo implemented updated functionality */}
                    {/* <p className="capitalize">Updated at a days ago</p> */}
                  </div>

                  {/* testing select component */}
                </div>
              </div>
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* estimate time setter */}
      <EstimatedTimeSetter
        showEstimatedTime={showEstimatedTime}
        setShowEstimatedTime={setShowEstimatedTime}
        issueData={issueData}
        setIssueData={setIssueData}
        sprintId={sprintId}
      />
    </>
  );
}

export default IssueDetails;
