"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { CoverImages, getRandomEmoji, spaceCoverImages } from "@/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { CreateProject } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProjectSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const emojiIcons: string[] = getRandomEmoji();
const images = CoverImages.sort(() => Math.random() - 0.5).slice(0, 12);

function ProjectCard({
  projectType,
  setOpen,
  params,
}: {
  projectType: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  params: any;
}) {
  const [emoji, setEmoji] = useState("😄");
  const [selectedImage, setSelectedImage] = useState("");
  const { user } = useUser();
  const id = user?.id;

  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<CreateProject>({
    resolver: zodResolver(CreateProjectSchema),
  });

  const createProject = async (document: any) => {
    const { documentName } = document;

    try {
      const documentId = uuidv4().slice(0, 8);
      await setDoc(doc(db, "WorkSpaceDocuments", documentId.toString()), {
        workspaceId: params?.workspaceId,
        createdBy: {
          id: user?.id,
          fullName: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          picture: user?.imageUrl,
        },
        coverImage: selectedImage,
        id: documentId,
        emoji: emoji,
        documentName: documentName,
        projectType: projectType,
        isPublished: false,
        teamProject: false,
      });

      // create a new document output for the workspace
      if (projectType === "page") {
        await setDoc(doc(db, "PageDocumentOutput", documentId.toString()), {
          docId: documentId,
          workspaceId: params?.workspaceId,
          output: [],
        });
      }

      if (projectType === "board") {
        await setDoc(doc(db, "BoardDocumentOutput", documentId.toString()), {
          docId: documentId,
          workspaceId: params?.workspaceId,
          output: [],
        });
      }

      if (projectType === "sprint") {
        await setDoc(doc(db, "SprintDocumentOutput", documentId.toString()), {
          docId: documentId,
          workspaceId: params?.workspaceId,
          joinCode: "",
          output: [
            {
              id: uuidv4().slice(0, 8),
              status: "backlog",
              items: [],
            },
            {
              id: uuidv4().slice(0, 8),
              status: "selected for Development",
              items: [],
            },
            {
              id: uuidv4().slice(0, 8),
              status: "in Progress",
              items: [],
            },
            {
              id: uuidv4().slice(0, 8),
              status: "done",
              items: [],
            },
          ],
          collaborators: [
            {
              id: id,
              fullName: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
              picture: user?.imageUrl,
              role: "owner",
            },
          ],
        });
      }

      toast(`${projectType} project created successfully`);
      router.replace(
        `/workspace/${params?.workspaceId}/${projectType}/${documentId}`,
      );

      setOpen(false);
    } catch (error: any) {
      toast(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(createProject)}
      className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1f1f1f]"
    >
      <div className="flex flex-col items-center gap-2">
        <input
          id="documentName"
          type="text"
          className="mb-2 mt-2 w-full rounded-md border px-3 py-2 text-black/90 outline-none focus:border-[#D2F159]/50 dark:border-2 dark:bg-[#2b2b2b] dark:text-white dark:placeholder:text-[#80868B]"
          placeholder="Enter project name"
          {...register("documentName", { required: true })}
        />
        {errors.documentName && (
          <p className="text-sm text-red-500">{errors.documentName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-justify text-sm font-semibold text-black dark:text-white">
          Icons
        </p>

        <div className="mb-2 flex items-center justify-between gap-0.5">
          {emojiIcons.map((icon: string, index) => (
            <div
              key={index}
              onClick={() => setEmoji(icon)}
              className={cn(
                `cursor-pointer rounded-md border border-transparent p-1 transition-all duration-300 hover:border-black dark:hover:border-white`,
                emoji === icon && "border-black dark:border-white",
              )}
            >
              <span className="text-xl">{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-justify text-sm font-semibold text-black dark:text-white">
          Background
        </p>

        <div className="mx-auto flex w-full flex-wrap justify-between gap-1">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image.imageUrl)}
              className={cn(
                `w-max cursor-pointer rounded-md border border-transparent p-1 transition-all duration-300 hover:border-black dark:hover:border-white`,
                selectedImage === image.imageUrl &&
                  "border-black dark:border-white",
              )}
            >
              <Image
                src={image.imageUrl}
                alt="cover"
                width={200}
                height={200}
                className="h-[37px] w-[37px] rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className={cn(
          `w-full rounded-md py-2 font-semibold text-slate-200`,
          projectType === "board" && "bg-[#c98a0d] dark:bg-[#b07a0b]",
          projectType === "sprint" && "bg-[#933030] dark:bg-[#7b2929]",
          projectType === "page" && "bg-[#1963ae] dark:bg-[#155a9b]",
        )}
      >
        {isSubmitting ? (
          <Loader className="mx-auto animate-spin" size={25} />
        ) : (
          "Create Project"
        )}
      </button>
    </form>
  );
}
export default ProjectCard;
