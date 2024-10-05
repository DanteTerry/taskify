import MainSprint from "@/app/(main)/_components/MainSprint";
import SprintSidebar from "@/app/(main)/_components/SprintSidebar";

function page() {
  return (
    <div className="flex h-full w-full">
      <SprintSidebar />
      <MainSprint />
    </div>
  );
}
export default page;
