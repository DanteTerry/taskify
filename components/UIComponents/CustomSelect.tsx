import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import { IssueData, ShowState } from "@/app/(main)/_components/IssueDetails";
import {
  getPriorityColor,
  handleIssuePropertyChange,
} from "@/utils/sprintUtil";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { issueDataType, issueType } from "@/types/type";

function CustomSelect({
  setIssueData,
  sprintId,
  type,
  option,
  issueData,
  show,
  setShow,
  children,
}: {
  type: string;
  setShow: Dispatch<SetStateAction<ShowState>>;
  show: ShowState;
  issueData: IssueData;
  setIssueData: Dispatch<SetStateAction<IssueData>>;
  option: any;
  children: React.ReactNode;
  sprintId: string;
}) {
  const handleClose = () => {
    setShow((prevShow) => ({
      ...prevShow,
      [type]: false,
    }));
  };
  console.log(sprintId);

  // todo make a function that close all the show state when click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        const selectElement = document.querySelector(".relative");
        const buttonElements = document.querySelectorAll("button");
        const isButtonClick = Array.from(buttonElements).some((button) =>
          button.contains(e.target as Node),
        );

        if (
          selectElement &&
          !selectElement.contains(e.target) &&
          !isButtonClick
        ) {
          setShow((prevShow) => ({
            ...prevShow,
            [type]: false,
          }));
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setShow, type]);

  const handleStatusChange = async (status: string) => {
    if (!sprintId) throw new Error("Invalid sprintId");

    const docRef = doc(db, "SprintDocumentOutput", sprintId as string);

    const unsubscribe = onSnapshot(
      docRef,
      async (docSnap) => {
        if (!docSnap.exists()) {
          console.log("No such document!");
          return;
        }

        const output = docSnap.data().output;
        let currentOutputItemIndex: number | null = null;
        let currentIssueItem: issueDataType | null = null;

        // Find the issue in the output
        for (let i = 0; i < output.length; i++) {
          const itemIndex = output[i].items.findIndex(
            (item: issueDataType) => item.id === issueData.id,
          );
          if (itemIndex !== -1) {
            currentOutputItemIndex = i;
            currentIssueItem = output[i].items[itemIndex];
            break;
          }
        }

        if (currentOutputItemIndex === null || !currentIssueItem) return;

        // Create the updated output
        const updatedOutput = output.map(
          (outputItem: issueType, index: number) => {
            if (index === currentOutputItemIndex) {
              return {
                ...outputItem,
                items: outputItem.items.filter(
                  (item) => item.id !== issueData.id,
                ),
              };
            }
            if (outputItem.status.toLowerCase() === status.toLowerCase()) {
              return {
                ...outputItem,
                items: [...outputItem.items, { ...currentIssueItem, status }],
              };
            }
            return outputItem;
          },
        );

        // Unsubscribe to prevent receiving updates for this change
        unsubscribe();

        // Update the Firestore database
        try {
          await updateDoc(docRef, { output: updatedOutput });
        } catch (error) {
          console.error("Error updating Firestore:", error);
        }
      },
      (error) => {
        console.error("Error getting real-time updates:", error);
      },
    );
  };

  return (
    <div className="relative flex flex-col gap-1 md:pl-4">
      <label
        htmlFor="select"
        className="text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-300"
      >
        {type}
      </label>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      {show[type as keyof ShowState] && (
        <>
          {type === "status" && (
            <div className="absolute top-16 z-10 w-3/4 border border-gray-200 bg-white shadow-sm dark:border-gray-600 dark:bg-[#262626]">
              <input
                placeholder="Search"
                type="text"
                className="mt-1 w-full border-none px-3 py-1 text-sm font-medium text-[#172B4D] outline-none placeholder:text-sm dark:bg-transparent dark:text-gray-200 dark:placeholder:text-gray-100"
                required
              />
              <div className="mt-2 flex flex-col items-start gap-1 pb-2">
                {option.map((item: any, index: number) => {
                  let className;
                  switch (item.toLowerCase()) {
                    case "backlog":
                      className = "bg-purple-500 text-white";
                      break;
                    case "selected for development":
                      className = "bg-yellow-500 text-white";
                      break;
                    case "in progress":
                      className = "bg-blue-500 text-white";
                      break;
                    case "done":
                      className = "bg-green-500 text-white";
                      break;
                    default:
                      className = "bg-gray-500 text-white";
                  }
                  return (
                    <Button
                      onClick={() => handleStatusChange(item)}
                      key={index}
                      variant={"ghost"}
                      className="flex w-full justify-start rounded-none px-2 hover:bg-[#D2E5FE] dark:hover:bg-gray-700"
                    >
                      <div
                        className={`w-max rounded-md px-2 py-1 text-xs uppercase ${className}`}
                      >
                        {item}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {type === "assignees" && (
            <div className="absolute top-16 z-10 w-3/4 border border-gray-200 bg-white shadow-sm dark:border-gray-600 dark:bg-[#262626]">
              <input
                placeholder="Search"
                type="text"
                className="mt-1 w-full border-none px-3 py-1 text-sm font-medium text-[#172B4D] outline-none placeholder:text-sm dark:bg-transparent dark:text-gray-200 dark:placeholder:text-gray-100"
                required
              />
              <div className="mt-2 flex flex-col items-start gap-1 pb-2">
                {option.map((item: any, index: number) => {
                  return (
                    <Button
                      onClick={() => {
                        const updatedAssignees = issueData.assignees.some(
                          (assignee: any) => assignee.id === item.id,
                        )
                          ? issueData.assignees
                          : [...issueData.assignees, item];

                        setIssueData({
                          ...issueData,
                          assignees: updatedAssignees,
                        });

                        handleIssuePropertyChange(
                          "assignees",
                          updatedAssignees,
                          sprintId as string,
                          issueData,
                        );
                        handleClose();
                      }}
                      key={index}
                      variant={"ghost"}
                      className="flex w-full justify-start rounded-none px-2 hover:bg-[#D2E5FE] dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          width={24}
                          height={24}
                          src={item.picture}
                          alt={item.fullName}
                          className="rounded-full"
                        />
                        <span className="text-xs font-medium dark:text-gray-200">
                          {item.fullName}
                        </span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {type === "reporter" && (
            <div className="absolute top-16 z-10 w-3/4 border border-gray-200 bg-white shadow-sm dark:border-gray-600 dark:bg-[#262626]">
              <input
                placeholder="Search"
                type="text"
                className="mt-1 w-full border-none px-3 py-1 text-sm font-medium text-[#172B4D] outline-none placeholder:text-sm dark:bg-transparent dark:text-gray-200 dark:placeholder:text-gray-100"
                required
              />
              <div className="mt-2 flex flex-col items-start gap-1 pb-2">
                {option.map((item: any, index: number) => {
                  return (
                    <Button
                      onClick={() => {
                        setIssueData({ ...issueData, reporter: item });
                        handleIssuePropertyChange(
                          "reporter",
                          item,
                          sprintId as string,
                          issueData,
                        );
                        handleClose();
                      }}
                      key={index}
                      variant={"ghost"}
                      className="flex w-full justify-start rounded-none px-2 hover:bg-[#D2E5FE] dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          width={24}
                          height={24}
                          src={item.picture}
                          alt={item.fullName}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium dark:text-gray-200">
                          {item.fullName}
                        </span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {type === "priority" && (
            <div className="absolute top-16 z-10 w-3/4 border border-gray-200 bg-white shadow-sm dark:border-gray-600 dark:bg-[#262626]">
              <input
                placeholder="Search"
                type="text"
                className="mt-1 w-full border-none px-3 py-1 text-sm font-medium text-[#172B4D] outline-none placeholder:text-sm dark:bg-transparent dark:text-gray-200 dark:placeholder:text-gray-100"
                required
              />
              <div className="mt-2 flex flex-col items-start gap-1 pb-2">
                {option.map((item: any, index: number) => {
                  return (
                    <Button
                      onClick={() => {
                        setIssueData({ ...issueData, priority: item });
                        handleIssuePropertyChange(
                          "priority",
                          item,
                          sprintId as string,
                          issueData,
                        );
                        handleClose();
                      }}
                      key={index}
                      variant={"ghost"}
                      className="flex w-full justify-start rounded-none px-2 hover:bg-[#D2E5FE] dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-3 w-3 rounded-full ${getPriorityColor(item)}`}
                        ></span>
                        <span className="text-sm font-medium capitalize dark:text-gray-200">
                          {item}
                        </span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default CustomSelect;
