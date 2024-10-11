"use client";
import { fetchDocumentInfo } from "@/lib/redux/sprintSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { CircleCheck, CircleX } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function JoinPage() {
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  const { joinId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const documentInfo = useSelector(
    (state: RootState) => state.sprint.documentInfo,
  );
  const coverImage = documentInfo?.coverImage;

  const documentId = joinId as string;

  console.log(documentInfo);
  const handleAccept = () => {
    setAccepted(true);
    setRejected(false);
  };

  const handleReject = () => {
    setRejected(true);
    setAccepted(false);
  };

  useEffect(() => {
    dispatch(fetchDocumentInfo(documentId.split("-")[1]));
  }, [dispatch, documentId]);

  return (
    <div
      style={{
        backgroundImage: coverImage ? `url(${coverImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
      className={`bg-gradient-to-br flex min-h-screen w-full items-center justify-center from-blue-600 to-purple-600`}
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
            src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybDRBTHo2ZmJ6ME5KTEVLbUw5U3F6TTVDazcifQ"
            alt="Created by Hackers Community"
            className="rounded-full"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Hackers Community
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              is inviting you to join the project.
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between space-x-2">
          <button
            onClick={handleAccept}
            className="flex w-full items-center justify-center rounded bg-blue-600 px-4 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <CircleCheck className="mr-2 h-5 w-5" />
            Accept
          </button>
          <button
            onClick={handleReject}
            className="flex w-full items-center justify-center rounded bg-gray-600 px-4 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
          >
            <CircleX className="mr-2 h-5 w-5" />
            Reject
          </button>
        </div>
        {accepted && (
          <div className="mt-6 text-center text-lg font-medium text-blue-600">
            You have accepted the project invitation.
          </div>
        )}
        {rejected && (
          <div className="mt-6 text-center text-lg font-medium text-gray-600">
            You have rejected the project invitation.
          </div>
        )}
      </div>
    </div>
  );
}

export default JoinPage;
