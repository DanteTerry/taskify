import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import KanbanSpritBoard from "./KanbanSprintBoard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CreateIssue, { Collaborator } from "./CreateIssue";
import { useParams } from "next/navigation";
import { issueType, listType } from "@/types/type";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/redux/store"; // Import the AppDispatch type
import { fetchSprintDocumentOutput } from "@/lib/redux/sprintSlice";

function MainSprint({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { sprintId } = useParams();
  const dispatch = useDispatch<AppDispatch>(); // Use the AppDispatch type

  const [data, setData] = useState<issueType[] | undefined>(undefined);

  const [collaborators, setCollaborators] = useState<
    Collaborator[] | undefined
  >([]);

  const output = useSelector((state: RootState) => state.sprint.output);
  const collaborator = useSelector(
    (state: RootState) => state.sprint.collaborators,
  );

  console.log(output, data);

  useEffect(() => {
    if (sprintId) {
      const docRef = doc(db, "SprintDocumentOutput", sprintId as string);

      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            setCollaborators(docSnap.data().collaborators);
            setData(docSnap.data().output);
          } else {
            console.log("No such document!");
          }
        },
        (error) => {
          console.error("Error getting real-time updates:", error);
        },
      );

      return () => unsubscribe();
    }
  }, [sprintId]);

  useEffect(() => {
    dispatch(fetchSprintDocumentOutput(sprintId as string));
  }, [dispatch, sprintId]);

  return (
    <section className="ml-60 flex h-full w-full flex-grow flex-col gap-6 px-8 py-6">
      <div className="text-xl font-medium">
        <h2>Kanban Board</h2>
      </div>

      <div className="flex items-center gap-5">
        {/* input for search */}
        <div className="relative flex items-center justify-between">
          <Search
            className="absolute left-3 text-slate-700 dark:text-gray-400"
            size={18}
          />
          <input
            id="documentName"
            type="text"
            className="w-full rounded-md bg-gray-200 px-3 py-2 pl-10 text-sm text-black/90 outline-none focus:border-[#D2F159]/50 dark:border-2 dark:bg-[#1f1f1f] dark:text-white dark:placeholder:text-[#80868B]"
          />
        </div>

        {/* collaborators */}
        <div className="flex items-center">
          {collaborators?.map((collaborator, index) => (
            <div
              key={index}
              className="h-[30px] w-[30px] overflow-hidden rounded-full border-2 border-white"
            >
              <Image
                src={collaborator.picture}
                width={34}
                height={34}
                alt={collaborator.fullName}
              />
            </div>
          ))}
        </div>

        {/* only my issues */}
        <div className="flex items-center gap-2">
          <Button variant={"ghost"} className="px-2.5" size={"sm"}>
            Only My Issues
          </Button>
          <Button variant={"ghost"} className="px-2.5" size={"sm"}>
            Recently Updated
          </Button>

          <div className="h-5 w-[1.5px] bg-gray-400"></div>

          <button className="text-xs font-medium">Clear All</button>
        </div>
      </div>

      <KanbanSpritBoard data={data} setData={setData} />
      <CreateIssue open={open} setOpen={setOpen} />
    </section>
  );
}
export default MainSprint;
