import { IssueData } from "@/app/(main)/_components/IssueDetails";
import { db } from "@/config/firebaseConfig";
import { issueDataType, issueType } from "@/types/type";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

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
