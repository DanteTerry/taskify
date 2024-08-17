import { Plus } from "lucide-react";

function Dashboard() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full bg-[#f6f6f7] dark:bg-[#1f1f1f]">
      <div>
        <h1 className="text-2xl font-bold dark:text-[#f1f1f1]">Dashboard</h1>
        <p className="text-sm dark:text-[#f1f1f1]">Welcome to the dashboard</p>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-32 h-32 flex-col bg-green-500 flex items-center justify-center rounded-lg ">
          <Plus size={50} />

          <p className="text-sm dark:text-[#f1f1f1]">Create a new project</p>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
