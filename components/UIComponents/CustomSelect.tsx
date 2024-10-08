import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { IssueData, ShowState } from "@/app/(main)/_components/IssueDetails";

function CustomSelect({
  setIssueData,
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
}) {
  const handleClose = () => {
    setShow((prevShow) => ({
      ...prevShow,
      [type]: false,
    }));
  };

  return (
    <div className="relative flex flex-col gap-1">
      <label
        htmlFor="select"
        className="text-xs font-bold uppercase text-gray-600"
      >
        {type}
      </label>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      {show[type as keyof ShowState] && (
        <>
          {type === "status" && (
            <div className="absolute top-16 z-10 w-3/4 border border-gray-200 bg-white shadow-sm">
              <input
                placeholder="Search"
                type="text"
                className="mt-1 w-full border-none px-3 py-1 text-sm font-medium text-[#172B4D] outline-none placeholder:text-sm dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 dark:placeholder:text-gray-500"
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
                      onClick={() => {
                        setIssueData({ ...issueData, status: item });
                        handleClose();
                      }}
                      key={index}
                      variant={"ghost"}
                      className="flex w-full justify-start rounded-none px-2 hover:bg-[#D2E5FE]"
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
            <div className="absolute top-16 z-10 w-3/4 border border-gray-200 bg-white shadow-sm">
              <input
                placeholder="Search"
                type="text"
                className="mt-1 w-full border-none px-3 py-1 text-sm font-medium text-[#172B4D] outline-none placeholder:text-sm dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 dark:placeholder:text-gray-500"
                required
              />
              <div className="mt-2 flex flex-col items-start gap-1 pb-2">
                {option.map((item: any, index: number) => {
                  return (
                    <Button
                      onClick={() => {
                        setIssueData({
                          ...issueData,
                          assignees: [...issueData.assignees, item],
                        });
                        handleClose();
                      }}
                      key={index}
                      variant={"ghost"}
                      className="flex w-full justify-start rounded-none px-2 hover:bg-[#D2E5FE]"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          width={24}
                          height={24}
                          src={item.imageUrl}
                          alt={item.fullName}
                          className="rounded-full"
                        />
                        <span className="text-xs font-medium">
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
            <div className="absolute top-16 z-10 w-3/4 border border-gray-200 bg-white shadow-sm">
              <input
                placeholder="Search"
                type="text"
                className="mt-1 w-full border-none px-3 py-1 text-sm font-medium text-[#172B4D] outline-none placeholder:text-sm dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 dark:placeholder:text-gray-500"
                required
              />
              <div className="mt-2 flex flex-col items-start gap-1 pb-2">
                {option.map((item: any, index: number) => {
                  return (
                    <Button
                      onClick={() => {
                        setIssueData({ ...issueData, reporter: item });
                        handleClose();
                      }}
                      key={index}
                      variant={"ghost"}
                      className="flex w-full justify-start rounded-none px-2 hover:bg-[#D2E5FE]"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          width={24}
                          height={24}
                          src={item.imageUrl}
                          alt={item.fullName}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium">
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
            <div className="absolute top-16 z-10 w-3/4 border border-gray-200 bg-white shadow-sm">
              <input
                placeholder="Search"
                type="text"
                className="mt-1 w-full border-none px-3 py-1 text-sm font-medium text-[#172B4D] outline-none placeholder:text-sm dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 dark:placeholder:text-gray-500"
                required
              />
              <div className="mt-2 flex flex-col items-start gap-1 pb-2">
                {option.map((item: any, index: number) => {
                  return (
                    <Button
                      onClick={() => {
                        setIssueData({ ...issueData, priority: item });
                        handleClose();
                      }}
                      key={index}
                      variant={"ghost"}
                      className="flex w-full justify-start rounded-none px-2 hover:bg-[#D2E5FE]"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-3 w-3 rounded-full ${item.color}`}
                        ></span>
                        <span className="text-sm font-medium">
                          {item.label}
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
