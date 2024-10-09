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
