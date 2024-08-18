import { cn } from "@/lib/utils";

function TemplateCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        `group flex w-full items-center gap-6 rounded-xl border-2 border-slate-300/50 bg-white px-5 py-3 transition-all duration-300 dark:border-slate-400/5 dark:bg-[#252525] hover:dark:text-[#e1e1e1] md:px-3 lg:px-6`,
        className,
      )}
    >
      {children}
    </button>
  );
}
export default TemplateCard;
