import { IssueData } from "@/app/(main)/_components/IssueDetails";
import { db } from "@/config/firebaseConfig";
import { issueDataType, issueType } from "@/types/type";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import moment from "moment";

// function to get issue color
export function getIssueColor(status: string): string {
  switch (status.toLowerCase()) {
    case "backlog":
      return "bg-purple-500";
    case "selected for development":
      return "bg-yellow-500";
    case "in progress":
      return "bg-blue-500";
    case "done":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}

// function to get priority color
export function getPriorityColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case "low":
      return "bg-green-500";
    case "medium":
      return "bg-yellow-500";
    case "high":
      return "bg-red-500";
    case "urgent":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
}

// function to handleIssuePropertyChane
export const handleIssuePropertyChange = async (
  property: string,
  value: any,
  sprintId: string,
  issueData: IssueData,
) => {
  if (!sprintId || !issueData.id) {
    console.error("Sprint ID or Issue ID is missing");
    return;
  }

  const docRef = doc(db, "SprintDocumentOutput", sprintId as string);

  try {
    const docSnap = await getDoc(docRef); // Get the document data once
    if (!docSnap.exists()) {
      console.log("No such document!");
      return;
    }

    const output = docSnap.data().output;
    let currentOutputItemIndex: number | null = null;
    let currentIssueItem: issueDataType | null = null;

    // Find the issue in the output based on issueData.id
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

    // Update the specific property for the found issue
    const updatedOutput = output.map((outputItem: issueType, index: number) => {
      if (index === currentOutputItemIndex) {
        return {
          ...outputItem,
          items: outputItem.items.map((item: issueDataType) =>
            item.id === issueData.id ? { ...item, [property]: value } : item,
          ),
        };
      }
      return outputItem;
    });

    // Update the Firestore database with the new property value
    await updateDoc(docRef, { output: updatedOutput });
  } catch (error) {
    console.error("Error updating Firestore:", error);
  }
};

// function to handleIssueMultiplePropertyChange
export const handleIssueMultiplePropertyChange = async (
  updatedFields: Partial<IssueData>,
  sprintId: string,
  issueData: IssueData,
) => {
  if (!sprintId || !issueData.id) {
    console.error("Sprint ID or Issue ID is missing");
    return;
  }

  const docRef = doc(db, "SprintDocumentOutput", sprintId as string);

  try {
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.log("No such document!");
      return;
    }

    const output = docSnap.data().output;
    let currentOutputItemIndex: number | null = null;
    let currentIssueItem: issueDataType | null = null;

    // Find the issue in the output based on issueData.id
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

    // Update the specific fields for the found issue
    const updatedOutput = output.map((outputItem: issueType, index: number) => {
      if (index === currentOutputItemIndex) {
        return {
          ...outputItem,
          items: outputItem.items.map((item: issueDataType) =>
            item.id === issueData.id ? { ...item, ...updatedFields } : item,
          ),
        };
      }
      return outputItem;
    });

    // Update Firestore with the updated output
    await updateDoc(docRef, { output: updatedOutput });
  } catch (error) {
    console.error("Error updating Firestore:", error);
  }
};

// function to formatDate
export const formatDate = (date: Date | string): string => {
  const momentDate = moment(date);

  if (!momentDate.isValid()) return "Invalid date";

  if (momentDate.isSame(moment(), "day")) {
    return `Created today at ${momentDate.format("h:mm A")}`;
  }

  if (momentDate.isSame(moment().subtract(1, "days"), "day")) {
    return `Created yesterday at ${momentDate.format("h:mm A")}`;
  }

  return `Created ${momentDate.fromNow()} at ${momentDate.format("h:mm A")}`;
};

// handle comment change
export const handleCommentChange = async (
  commentId: string,
  value: string,
  sprintId: string,
  issueData: IssueData,
  task: "edit" | "delete",
) => {
  console.log(sprintId, issueData.id);
  if (!sprintId || !issueData.id) {
    console.error("Sprint ID or Issue ID is missing");
    return;
  }

  const docRef = doc(db, "SprintDocumentOutput", sprintId as string);

  try {
    const docSnap = await getDoc(docRef); // Get the document data once
    if (!docSnap.exists()) {
      console.log("No such document!");
      return;
    }

    const output = docSnap.data().output;
    let currentOutputItemIndex: number | null = null;
    let currentIssueItem: issueDataType | null = null;

    // Find the issue in the output based on issueData.id
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

    // Find the comment to edit/delete
    const updatedComments = currentIssueItem.comments
      .map((comment: { id: string; comment: string }) => {
        if (comment.id === commentId) {
          if (task === "edit") {
            return { ...comment, comment: value }; // Update comment
          } else if (task === "delete") {
            return null; // Mark for deletion
          }
        }
        return comment;
      })
      .filter((comment) => comment !== null); // Remove the null comments

    // Update the issue with the modified comments
    const updatedOutput = output.map((outputItem: issueType, index: number) => {
      if (index === currentOutputItemIndex) {
        return {
          ...outputItem,
          items: outputItem.items.map((item: issueDataType) =>
            item.id === issueData.id
              ? { ...item, comments: updatedComments }
              : item,
          ),
        };
      }
      return outputItem;
    });

    // Update the Firestore database with the modified comments
    await updateDoc(docRef, { output: updatedOutput });
  } catch (error) {
    console.error("Error updating Firestore:", error);
  }
};

// function to handle delete issue
export const handleDeleteIssue = async (
  sprintId: string,
  issueData: IssueData,
) => {
  // Check for valid sprint ID and issue ID
  if (!sprintId || !issueData.id) {
    console.error("Sprint ID or Issue ID is missing");
    return;
  }

  const docRef = doc(db, "SprintDocumentOutput", sprintId as string);

  try {
    const docSnap = await getDoc(docRef); // Get the document data once
    if (!docSnap.exists()) {
      console.log("No such document!");
      return;
    }

    const output = docSnap.data().output;

    let currentOutputItemIndex: number | null = null;

    // Find the issue in the output based on issueData.id
    for (let i = 0; i < output.length; i++) {
      const itemIndex = output[i].items.findIndex(
        (item: issueDataType) => item.id === issueData.id,
      );
      if (itemIndex !== -1) {
        currentOutputItemIndex = i;
        break;
      }
    }

    // If the issue is not found, return early
    if (currentOutputItemIndex === null) return;

    // Create a new output array excluding the item to be deleted
    const updatedOutput = output.map((outputItem: issueType, index: number) => {
      if (index === currentOutputItemIndex) {
        return {
          ...outputItem,
          items: outputItem.items.filter(
            (item: issueDataType) => item.id !== issueData.id,
          ),
        };
      }
      return outputItem;
    });

    // Update the Firestore database with the new output array
    await updateDoc(docRef, { output: updatedOutput });
  } catch (error) {
    console.error("Error updating Firestore:", error);
  }
};

// function to modify join code
export const updateJoinCode = async (sprintId: string, newJoinCode: string) => {
  if (!sprintId || !newJoinCode) {
    console.error("Invalid sprintId or joinCode");
    return;
  }

  const docRef = doc(db, "SprintDocumentOutput", sprintId);

  try {
    // Update the joinCode in Firestore
    await updateDoc(docRef, { joinCode: newJoinCode });
  } catch (error) {
    console.error("Error updating join code:", error);
  }
};
