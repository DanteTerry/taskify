"use client";
import MainSprint from "@/app/(main)/_components/MainSprint";
import { fetchSprintDocumentOutput } from "@/lib/redux/sprintSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function TeamProject() {
  const { user } = useUser();
  const { teamProjectId: projectId } = useParams();
  const router = useRouter();
  const [openCreateIssue, setOpenCreateIssue] = useState(false);
  const [openCollaborators, setOpenCollaborators] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const collaborators = useSelector(
    (state: RootState) => state.sprint.collaborators,
  );
  const dispatch = useDispatch<AppDispatch>();
  const teamProjectId = projectId as string;
  useEffect(() => {
    dispatch(fetchSprintDocumentOutput(teamProjectId as string));
  }, [dispatch, teamProjectId]);

  useEffect(() => {
    setIsCollaborator(
      collaborators.some((collaborator) => collaborator.id === user?.id),
    );
  }, [collaborators, user]);

  if (!isCollaborator) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center rounded-lg bg-white p-8 shadow-lg">
          <FaLock className="mb-4 text-6xl text-red-500" />
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            Access Denied
          </h1>
          <p className="mb-4 text-lg text-gray-600">
            You are not a collaborator on this project.
          </p>
          <p className="mb-8 text-sm text-gray-500">
            If you believe this is a mistake, please contact the project owner
            for an invite.
          </p>
          <button
            className="transform rounded-md bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
            onClick={() => router.push("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <MainSprint
        isTeamProject={true}
        openCollaborators={openCollaborators}
        openCreateIssue={openCreateIssue}
        setOpenCreateIssue={setOpenCreateIssue}
        setOpenCollaborators={setOpenCollaborators}
        sprintId={teamProjectId}
      />
    </div>
  );
}
export default TeamProject;
