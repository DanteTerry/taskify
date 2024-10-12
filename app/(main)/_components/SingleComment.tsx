import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { CommentType } from "@/types/type";
import { IssueData } from "./IssueDetails";
import { handleCommentChange } from "@/utils/sprintUtil";
import { useParams } from "next/navigation";

function SingleComment({
  comment,
  issueData,
  sprintId,
}: {
  comment: CommentType;
  issueData: IssueData;
  sprintId: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const { user } = useUser();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedComment(comment.comment);
  };

  const handleSaveClick = () => {
    handleCommentChange(
      comment.id,
      editedComment,
      sprintId as string,
      issueData,
      "edit",
    );
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    handleCommentChange(
      comment.id,
      editedComment,
      sprintId as string,
      issueData,
      "delete",
    );
  };

  return (
    <div className="mt-6 w-full" key={comment.id}>
      <div className="mt-3 flex items-start gap-3">
        <Image
          width={28}
          height={28}
          src={comment.user.picture || ""}
          alt="profile"
          className="rounded-full"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-[#172B4D]">
              {comment.user.fullName}
            </p>
            <p className="text-xs text-[#6B778C]">2 days ago</p>
          </div>
          {isEditing ? (
            <div className="flex w-full flex-col gap-1">
              <textarea
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full resize-none rounded-md border px-2 py-1 text-sm text-[#172B4D] outline-none placeholder:text-xs focus:border-[#4FADE6] focus:bg-transparent dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200 dark:placeholder:text-gray-500"
                rows={editedComment.split("\n").length + 1}
              />

              <div className="flex gap-2">
                <Button
                  size="xs"
                  className="p-0 text-xs text-blue-600 hover:text-blue-700"
                  variant="ghost"
                  onClick={handleSaveClick}
                >
                  Save
                </Button>
                <Button
                  size="xs"
                  className="p-0 text-xs text-red-600 hover:text-red-700"
                  variant="ghost"
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[#172B4D]">{comment.comment}</p>
          )}
          {!isEditing && user?.id === comment.user.id && (
            <div className="flex gap-2">
              <Button
                size="xs"
                variant="ghost"
                className="p-0 text-xs text-blue-600 hover:text-blue-700"
                onClick={handleEditClick}
              >
                Edit
              </Button>
              <Button
                onClick={handleDeleteClick}
                size="xs"
                className="p-0 text-xs text-red-600 hover:text-red-700"
                variant="ghost"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
