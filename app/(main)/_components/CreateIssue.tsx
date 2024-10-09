"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaCheckCircle, FaExclamationCircle, FaBookmark } from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";
import { FaNetworkWired } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import "react-quill/dist/quill.snow.css"; // Quill editor styles
import { Button } from "@/components/ui/button";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "next/navigation";
import { issueDataType, listType } from "@/types/type";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

// Dynamically import ReactQuill to avoid server-side rendering issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export interface Collaborator {
  id: string;
  fullName: string;
  picture: string;
  email: string;
}

function CreateIssue({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { sprintId } = useParams();
  const [issueData, setIssueData] = useState<issueDataType>({
    id: uuidv4().slice(0, 8),
    description: "",
    issueType: "",
    shortSummary: "",
    reporter: {
      id: "",
      fullName: "",
      picture: "",
      email: "",
    },
    assignees: [],
    priority: "",
    comments: [],
    status: "backlog",
    estimatedTime: 10,
    deadLine: new Date(),
    loggedTime: 0,
    remainingTime: 0,
    createdAt: new Date().toLocaleDateString(),
  });

  const collaborators = useSelector(
    (state: RootState) => state.sprint.collaborators,
  );
  // Handle change for single selection
  const handleChange = (key: string, value: string) => {
    setIssueData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const docRef = doc(db, "SprintDocumentOutput", sprintId as string);

    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const currentData = docSnapshot.data();
        const existingOutput = currentData?.output || [];
        const updatedOutput = existingOutput.map((list: listType) => {
          if (list.status === "backlog") {
            return {
              ...list,
              items: [
                ...list.items,
                {
                  ...issueData,
                  deadLine: issueData.deadLine.toLocaleString(),
                },
              ],
            };
          }
          return list;
        });

        await updateDoc(docRef, { output: updatedOutput });

        setIssueData({
          id: uuidv4().slice(0, 8),
          description: "",
          issueType: "",
          shortSummary: "",
          reporter: {
            id: "",
            fullName: "",
            picture: "",
            email: "",
          },
          assignees: [],
          priority: "",
          comments: [],
          status: "backlog",
          estimatedTime: 0,
          deadLine: new Date(),
          loggedTime: 0,
          remainingTime: 0,
          createdAt: new Date().toLocaleDateString(),
        });

        setOpen(false);
      } else {
        console.error("Document does not exist!");
      }
    } catch (error) {
      console.error("Error updating Firestore with new card:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="max-h-[90vh] max-w-[850px] overflow-y-auto rounded-lg border border-gray-200 shadow-lg dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Create Issue
          </DialogTitle>
          <DialogDescription></DialogDescription>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
            {/* issue type */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Issue Type
              </p>
              <Select
                onValueChange={(value) => handleChange("issueType", value)}
                required
              >
                <SelectTrigger
                  value={issueData.issueType}
                  className="mt-2 w-full rounded-md border bg-gray-100 focus:ring-0 dark:border-gray-600 dark:bg-[#1f1f1f]"
                >
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="task">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-[#4FADE6]" />
                      <span>Task</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="bug">
                    <div className="flex items-center gap-2">
                      <FaExclamationCircle className="text-red-500" />
                      <span>Bug</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="story">
                    <div className="flex items-center gap-2">
                      <FaBookmark className="text-[#65BA43]" />
                      <span>Story</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="improvement">
                    <div className="flex items-center gap-2">
                      <IoSparklesSharp className="text-[#FFA500]" />
                      <span>Improvement</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="epic">
                    <div className="flex items-center gap-2">
                      <FaNetworkWired className="text-[#800080]" />
                      <span>Epic</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />

            {/* short summary */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Short Summary
              </p>

              <input
                type="text"
                value={issueData.shortSummary || ""}
                onChange={(e) => handleChange("shortSummary", e.target.value)}
                className="mt-2 w-full rounded-md border-2 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 outline-none placeholder:text-xs focus:border-[#4FADE6] focus:bg-transparent dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 dark:placeholder:text-gray-500"
                placeholder="Enter short summary"
                required
              />

              <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                Concisely summarize the issue in one or two sentences
              </p>
            </div>

            {/* description with Quill.js */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </p>

              <div className="max-h-[500px] overflow-auto">
                <ReactQuill
                  value={issueData.description}
                  onChange={(value) => handleChange("description", value)}
                  className="my-2 bg-white dark:bg-[#1f1f1f] dark:text-white"
                  theme="snow"
                  defaultValue={issueData.description}
                  placeholder="Describe the issue in as much detail as possible"
                  style={{ height: "auto" }} // Set height to auto for dynamic growth
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline", "strike"],
                      [{ align: [] }],
                      ["link", "image"],
                      [{ color: [] }, { background: [] }],
                      ["clean"],
                    ],
                  }}
                />
              </div>
            </div>

            {/* reporter with multi-select */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Reporter
              </p>
              <Select
                onValueChange={(value) => {
                  const selectedReporter = collaborators?.find(
                    (collaborator) => collaborator.fullName === value,
                  );
                  if (selectedReporter) {
                    setIssueData({ ...issueData, reporter: selectedReporter });
                  }
                }}
              >
                <SelectTrigger className="mt-2 w-full rounded-md border bg-gray-100 focus:ring-0 dark:border-gray-600 dark:bg-[#1f1f1f]">
                  <SelectValue placeholder="Select reporter" />
                </SelectTrigger>
                <SelectContent>
                  {collaborators?.length &&
                    collaborators.map((collaborator) => (
                      <SelectItem
                        key={collaborator.id}
                        value={collaborator?.fullName}
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            width={24}
                            height={24}
                            src={collaborator?.picture}
                            alt={collaborator?.fullName}
                            className="h-6 w-6 rounded-full"
                          />
                          <span>{collaborator?.fullName}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <p className="mt-1 text-xs text-gray-500">
                Current reporters: {issueData?.reporter.fullName}
              </p>
            </div>

            {/* Assignees with multi-select */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Assignees
              </p>
              <Select
                onValueChange={(value) => {
                  const selectedAssignee = collaborators?.find(
                    (collaborator) => collaborator.fullName === value,
                  );
                  if (selectedAssignee) {
                    setIssueData((prevState) => ({
                      ...prevState,
                      assignees: [...prevState.assignees, selectedAssignee],
                    }));
                  }
                }}
              >
                <SelectTrigger className="mt-2 w-full rounded-md border bg-gray-100 focus:ring-0 dark:border-gray-600 dark:bg-[#1f1f1f]">
                  <SelectValue placeholder="Select assignees" />
                </SelectTrigger>
                <SelectContent>
                  {collaborators?.length &&
                    collaborators.map((collaborator) => (
                      <SelectItem
                        key={collaborator.id}
                        value={collaborator?.fullName}
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            width={24}
                            height={24}
                            src={collaborator?.picture}
                            alt={collaborator?.fullName}
                            className="h-6 w-6 rounded-full"
                          />
                          <span>{collaborator?.fullName}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <p className="mt-1 text-xs text-gray-500">
                Current assignees:{" "}
                {issueData?.assignees
                  .map((assignee) => assignee.fullName)
                  .join(", ")}
              </p>
            </div>

            {/* priority */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Priority
              </p>
              <Select
                onValueChange={(value) => handleChange("priority", value)}
                required
              >
                <SelectTrigger className="mt-2 w-full rounded-md border bg-gray-100 focus:ring-0 dark:border-gray-600 dark:bg-[#1f1f1f]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-green-500"></span>
                      <span>Low</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                      <span>Medium</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-500"></span>
                      <span>High</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="urgent">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-purple-500"></span>
                      <span>Urgent</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Deadline
              </p>
              <div className="mx-auto flex w-full flex-wrap gap-1">
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

            {/* estimated time */}

            <div className="flex items-center justify-end gap-5">
              <Button type="submit" className="bg-[#0052CC] hover:bg-[#154da1]">
                Create Issue
              </Button>
              <Button
                type="button"
                variant={"ghost"}
                className="text-gray-500"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateIssue;
