import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrigin } from "@/hooks/use-origin";
import { RootState } from "@/lib/redux/store";
import { updateJoinCode } from "@/utils/sprintUtil";
import { Check, Copy, Trash2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SprintCollaborators({
  openCollaborators,
  setOpenCollaborators,
}: {
  openCollaborators: boolean;
  setOpenCollaborators: Dispatch<SetStateAction<boolean>>;
}) {
  const { sprintId } = useParams();
  const origin = useOrigin();
  const collaborators = useSelector(
    (state: RootState) => state.sprint.collaborators,
  );
  const join = useSelector((state: RootState) => state.sprint.join);
  console.log(join);
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);
  const filteredCollaborators = collaborators.filter((collaborator) =>
    collaborator.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const [role, setRole] = useState("");

  useEffect(() => {
    if (join.joinCode === "rejected") {
      const timer = setTimeout(() => {
        updateJoinCode(sprintId as string, { role: "", joinCode: "" });
      }, 10 * 1000);

      return () => clearTimeout(timer);
    }

    if (join.joinCode) {
      const timer = setTimeout(
        () => {
          updateJoinCode(sprintId as string, { role: "", joinCode: "" });
        },
        15 * 60 * 1000,
      );

      return () => clearTimeout(timer);
    }
  }, [join.joinCode, sprintId]);

  const handleAddCollaborator = () => {
    const uuid = uuidv4().slice(0, 8);
    const joinCode = `${uuid}-${sprintId}`;

    const join = {
      role,
      joinCode,
    };

    updateJoinCode(sprintId as string, join);
  };

  const url = `${origin}/join/${join.joinCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Dialog open={openCollaborators} onOpenChange={setOpenCollaborators}>
      <DialogContent className="flex h-full flex-col justify-center overflow-y-auto rounded-none border border-gray-200 shadow-lg dark:border-gray-700 md:h-max md:max-h-[90vh] md:rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-left text-2xl font-bold text-gray-800 dark:text-gray-200">
            Collaborators
          </DialogTitle>
          <DialogDescription className="text-left text-gray-600 dark:text-gray-400">
            Manage and search for collaborators in this Project.
          </DialogDescription>
        </DialogHeader>
        <div className="p-2">
          <input
            type="text"
            placeholder="Search collaborators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 transition-colors duration-200 focus:border-[#283D3B]/40 focus:outline-none focus:ring-2 focus:ring-[#283D3B]/40"
          />
          <ScrollArea className="h-max w-full rounded-md border p-2 px-4">
            {filteredCollaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="mb-2 flex w-full items-center justify-between rounded-lg border border-gray-300 p-2 shadow-sm transition-shadow duration-200 sm:flex-row"
              >
                <div className="flex items-center sm:mb-0">
                  <Image
                    width={48}
                    height={48}
                    src={collaborator.picture}
                    alt={collaborator.fullName}
                    className="mr-4 h-12 w-12 rounded-full border border-gray-200 shadow-sm"
                  />
                  <div>
                    <h3 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-200">
                      {collaborator.fullName}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {collaborator.email}
                    </p>
                  </div>
                </div>
                {collaborators.length > 1 && (
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="ml-0 rounded text-red-500 hover:text-red-600 sm:ml-4"
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>
        {!join.joinCode && (
          <button
            onClick={handleAddCollaborator}
            className="mt-2 flex w-full justify-start rounded-lg bg-[#283D3B] px-4 py-2 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-[#213432] focus:outline-none"
          >
            Add Collaborator
          </button>
        )}
        {join.joinCode && (
          <div className="mt-4 flex flex-col items-center justify-between rounded-lg border border-gray-300 p-4 shadow-sm transition-shadow duration-200">
            <div className="mb-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Join Code
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Share this code to join.
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-3">
              <Select
                defaultValue="collaborator"
                required
                onValueChange={(value) => setRole(value)}
              >
                <SelectTrigger className="mt-2 w-full rounded-md border border-input bg-gray-100 focus:ring-0 dark:bg-[#1f1f1f] dark:bg-transparent">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collaborator">
                    <div className="flex items-center gap-2">
                      <span>Collaborator</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="viewer">
                    <div className="flex items-center gap-2">
                      <span>Viewer</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="flex w-full items-center">
                <input
                  className="h-10 w-full flex-1 truncate rounded-l-md border bg-muted px-3 text-sm"
                  value={url}
                  disabled
                />
                <Button onClick={onCopy} className="h-10 rounded-l-none">
                  {copied ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              onClick={handleAddCollaborator}
              className="mt-4 w-full rounded-lg bg-[#283D3B] px-4 py-2 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-[#213432] focus:outline-none"
            >
              Regenerate Join Code
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SprintCollaborators;
