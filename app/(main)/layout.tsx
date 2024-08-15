import SideNavigation from "./_components/SideNavigation";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex dark:bg-[#0D0D10]">
      <SideNavigation />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}
export default MainLayout;
