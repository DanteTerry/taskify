import CardAdd from "@/app/(main)/_components/CardAdd";
import { Edit2Icon, MoreHorizontal } from "lucide-react";

function page() {
  return (
    <section className="flex h-full w-full flex-col bg-slate-900">
      <div className="relative flex w-full flex-grow flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 mb-1 flex overflow-y-hidden p-3 pb-1">
          <div className="mr-3 h-fit w-60 flex-shrink-0 rounded-md bg-black p-2">
            <div className="list-body">
              <div className="flex justify-between p-1">
                <span>To do</span>
                <button>
                  <MoreHorizontal size={20} />
                </button>
              </div>
              {/* list item */}
              <div className="item flex cursor-pointer items-center justify-between rounded-md border-2 border-zinc-900 bg-zinc-700 p-1 hover:border-gray-500">
                <span>Project description</span>
                <span className="flex items-start justify-start">
                  <button className="rounded-sm p-1 hover:bg-gray-600">
                    <Edit2Icon size={16} />
                  </button>
                </span>
              </div>
              <CardAdd />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default page;
