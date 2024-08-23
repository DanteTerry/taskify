import WorkSpaceList from "../_components/WorkSpaceList";

function Dashboards() {
  return (
    <section className="flex h-full w-full flex-col justify-between bg-[#f6f6f7] px-4 py-2 dark:bg-[#1f1f1f] md:px-2 md:pt-16 lg:px-0">
      <div className="mx-auto h-full w-full px-3 py-6 dark:dark:bg-[#1f1f1f] md:w-full lg:w-3/4 lg:px-0">
        <WorkSpaceList />
      </div>
    </section>
  );
}
export default Dashboards;
