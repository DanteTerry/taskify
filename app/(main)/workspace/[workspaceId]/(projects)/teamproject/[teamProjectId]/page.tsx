"use client";
import MainSprint from "@/app/(main)/_components/MainSprint";
import { fetchSprintDocumentOutput } from "@/lib/redux/sprintSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function TeamProject() {
  const { user, isLoaded } = useUser();
  const { teamProjectId: projectId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // overall loading state
  const [openCreateIssue, setOpenCreateIssue] = useState(false);
  const [openCollaborators, setOpenCollaborators] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const [collaboratorCheckComplete, setCollaboratorCheckComplete] =
    useState(false); // check complete flag
  const collaborators = useSelector(
    (state: RootState) => state.sprint.collaborators,
  );
  const dispatch = useDispatch<AppDispatch>();
  const teamProjectId = projectId as string;

  // Fetch the project data
  useEffect(() => {
    if (teamProjectId) {
      dispatch(fetchSprintDocumentOutput(teamProjectId))
        .then(() => setLoading(false)) // Stop loading after project data is fetched
        .catch((error) => {
          console.error("Error fetching project:", error);
          setLoading(false); // Stop loading even if there's an error
        });
    }
  }, [dispatch, teamProjectId]);

  // Check if the user is a collaborator
  useEffect(() => {
    if (isLoaded && user && collaborators.length > 0) {
      // Wait until user and collaborator data is available
      const isUserCollaborator = collaborators.some(
        (collaborator) => collaborator.id === user?.id,
      );
      setIsCollaborator(isUserCollaborator);
      setCollaboratorCheckComplete(true); // Mark the collaborator check as complete
    }
  }, [collaborators, user, isLoaded]);

  // Wait until both the project loading and collaborator check are complete before rendering anything
  if (loading || !collaboratorCheckComplete || !isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-[#1F1F1F]">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Loader className="h-16 w-16 animate-spin rounded-full" />
          <p className="animate-pulse text-lg font-semibold text-gray-700 dark:text-gray-300">
            Loading document, please wait...
          </p>
        </div>
      </div>
    );
  }

  // Once loading is done and collaborator check is complete, show "Access Denied" if the user is not a collaborator
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

  // If the user is a collaborator and all checks are complete, render the project content
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
