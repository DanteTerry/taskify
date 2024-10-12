"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { handleIssuePropertyChange } from "@/utils/sprintUtil";
import { useParams } from "next/navigation";
import { IssueData } from "./IssueDetails";
import { v4 as uuidv4 } from "uuid";
import { CommentType, issueDataType } from "@/types/type";
import SingleComment from "./SingleComment";

function SprintComment({
  issueData,
  item,
  sprintId,
}: {
  issueData: IssueData;
  item: issueDataType;
  sprintId: string;
}) {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // this useEffect is used to listen to the keypress event and open the comment box
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (
        (event.key === "m" || event.key === "M") &&
        activeElement !== textAreaRef.current &&
        activeElement?.tagName !== "INPUT" &&
        activeElement?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();
        setIsEditing(true);
        textAreaRef.current?.focus();
        setComment("");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const saveComment = async () => {
    if (user?.id && comment.length === 0) {
      return;
    }

    const commentData = {
      id: uuidv4().slice(0, 8),
      comment,
      createdAt: new Date(),
      user: {
        id: user?.id,
        fullName: user?.fullName,
        picture: user?.imageUrl,
        email: user?.primaryEmailAddress?.emailAddress,
      },
    };

    await handleIssuePropertyChange(
      "comments",
      [...item.comments, commentData],
      sprintId as string,
      issueData,
    );

    setComment("");
    setIsEditing(false);
  };

  return (
    <div>
      <p className="mb-2 text-left text-sm font-bold capitalize text-[#172B4D]">
        Comments
      </p>
      <div className="mt-1.5">
        <div className="mb-2 flex items-start gap-3">
          <Image
            width={32}
            height={32}
            src={user?.imageUrl || ""}
            alt="profile"
            className="rounded-full"
          />
          <div className="flex w-full flex-col gap-1">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              ref={textAreaRef}
              className="w-full resize-none rounded-md border-2 px-3 py-2 text-sm text-[#172B4D] outline-none placeholder:text-xs focus:border-[#4FADE6] focus:bg-transparent dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 dark:placeholder:text-gray-500"
              rows={isEditing ? comment.split("\n").length + 1 : 1}
              onFocus={() => setIsEditing(true)}
            />
            {!isEditing && (
              <p className="mt-1 hidden text-left text-xs text-gray-500 md:block">
                <span className="font-semibold text-gray-700">Pro tip:</span>{" "}
                Press{" "}
                <span className="rounded bg-gray-200 px-1 py-0.5 text-gray-800">
                  M
                </span>{" "}
                to comment
              </p>
            )}
          </div>
        </div>
        {isEditing && (
          <div className="ml-12 mt-2 flex items-center gap-3">
            <Button onClick={saveComment} size={"sm"} className="bg-[#0052CC]">
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
        )}

        {/* comment template */}

        {item?.comments?.map((comment) => (
          <SingleComment
            sprintId={sprintId}
            issueData={issueData}
            key={comment.id}
            comment={comment as CommentType}
          />
        ))}
      </div>
    </div>
  );
}

export default SprintComment;
