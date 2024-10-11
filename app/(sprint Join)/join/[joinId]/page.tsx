"use client";
import { db } from "@/config/firebaseConfig";
import {
  fetchDocumentInfo,
  fetchSprintDocumentOutput,
  setCollaborators,
} from "@/lib/redux/sprintSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { updateJoinCode } from "@/utils/sprintUtil";
import { useUser } from "@clerk/nextjs";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { CircleCheck, CircleX, Loader } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function JoinPage() {
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const { user } = useUser();

  const { joinId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { documentInfo, collaborators, loading, joinCode } = useSelector(
    (state: RootState) => state.sprint,
  );

  const isCollaborator = collaborators?.some(
    (collaborator) => collaborator.id === user?.id,
  );

  const coverImage = documentInfo?.coverImage;
  const documentId = joinId as string;

  const handleAccept = async () => {
    if (!user || !documentInfo) return;

    const collaboratorData = {
      id: user.id,
      fullName: user.fullName || "",
      email: user.primaryEmailAddress?.emailAddress || "",
      picture: user.imageUrl || "",
      role: "collaborator",
    };

    try {
      const docRef = doc(db, "SprintDocumentOutput", documentId.split("-")[1]);

      await updateDoc(docRef, {
        collaborators: arrayUnion(collaboratorData),
      });

      setAccepted(true);
      setRejected(false);

      toast.success("You have successfully joined the project!");
    } catch (error) {
      console.error("Error accepting invite: ", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleReject = () => {
    updateJoinCode(documentId.split("-")[1], "rejected");
    setRejected(true);
    setAccepted(false);
  };

  useEffect(() => {
    dispatch(fetchDocumentInfo(documentId.split("-")[1]));
    dispatch(fetchSprintDocumentOutput(documentId.split("-")[1]));
  }, [dispatch, documentId]);

  if (loading) {
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

  if (!documentInfo?.documentName) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            This document doesn&apos;t exist.
          </h1>
          <p className="mt-2 text-gray-600">
            Please check the invite link or contact the project owner.
          </p>
        </div>
      </div>
    );
  }

  if (joinCode === "rejected") {
    return (
      <div
        style={{
          backgroundImage: coverImage ? `url(${coverImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-gradient-to-br flex min-h-screen w-full items-center justify-center from-blue-600 to-purple-600"
      >
        <div className="w-full max-w-md transform rounded-lg bg-white bg-opacity-90 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
          <h1 className="mb-3 text-center text-3xl font-bold tracking-wide text-gray-900">
            Invitation Rejected
          </h1>
          <p className="text-center text-lg text-gray-600">
            You have rejected the invitation to join this project.
          </p>
          <div className="mt-3 flex justify-center">
            <button
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 focus:outline-none"
              onClick={() => window.history.back()}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!joinCode || joinCode.split("-")[0] !== documentId.split("-")[0]) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            The invite has been canceled or doesn&apos;t exist.
          </h1>
          <p className="mt-2 text-gray-600">
            You may want to check with the person who invited you.
          </p>
        </div>
      </div>
    );
  }

  // Priority given to accepted or rejected states
  if (accepted) {
    return (
      <div
        style={{
          backgroundImage: coverImage ? `url(${coverImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-gradient-to-br flex min-h-screen w-full items-center justify-center from-blue-600 to-purple-600"
      >
        <div className="w-full max-w-md transform rounded-lg bg-white bg-opacity-90 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
          <h1 className="mb-4 text-center text-2xl font-bold tracking-wide text-gray-900">
            You Have Joined the Project!
          </h1>
          <div className="mb-6 flex flex-col items-center">
            <Image
              width={64}
              height={64}
              src={user?.imageUrl || "/default-avatar.png"}
              alt="user image"
              className="mb-3 rounded-full"
            />
            <p className="text-lg font-semibold text-gray-800">
              Collaborator: {user?.fullName}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 focus:outline-none"
              onClick={() => window.history.back()}
            >
              Go to Project
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is already a collaborator
  if (isCollaborator) {
    return (
      <div
        style={{
          backgroundImage: coverImage ? `url(${coverImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-gradient-to-br flex min-h-screen w-full items-center justify-center from-blue-600 to-purple-600"
      >
        <div className="w-full max-w-md transform rounded-lg bg-white bg-opacity-90 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
          <h1 className="mb-3 text-center text-3xl font-bold tracking-wide text-gray-900">
            Already a Collaborator
          </h1>
          <p className="text-center text-lg text-gray-600">
            You are already part of this project.
          </p>
          <div className="mt-3 flex justify-center">
            <button
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 focus:outline-none"
              onClick={() => window.history.back()}
            >
              Go to Project
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: coverImage ? `url(${coverImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-gradient-to-br flex min-h-screen w-full items-center justify-center from-blue-600 to-purple-600"
    >
      <div className="w-full max-w-md transform rounded-lg bg-white bg-opacity-90 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold tracking-wide text-gray-900">
          Join Project
        </h1>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-medium text-gray-700"
            htmlFor="projectName"
          >
            Project Name
          </label>
          <input
            id="projectName"
            type="text"
            value={documentInfo?.documentName}
            readOnly
            className="focus:shadow-outline w-full appearance-none rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-6 flex items-center space-x-4">
          <Image
            width={48}
            height={48}
            src={documentInfo?.createdBy.picture}
            alt="user image"
            className="rounded-full"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {documentInfo?.createdBy.fullName}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              is inviting you to join the project.
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between space-x-2">
          <button
            onClick={handleAccept}
            className="flex w-full items-center justify-center rounded bg-blue-600 px-4 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 focus:outline-none"
          >
            <CircleCheck className="mr-2 h-5 w-5" />
            Accept
          </button>
          <button
            onClick={handleReject}
            className="flex w-full items-center justify-center rounded bg-gray-600 px-4 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-gray-700 focus:outline-none"
          >
            <CircleX className="mr-2 h-5 w-5" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinPage;
