"use client";
import { useState } from "react";
import { coverImages, getRandomEmoji } from "@/constants";
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

const emojiIcons: [] = getRandomEmoji();

function ProjectCard({
  projectType,
  params,
}: {
  projectType: string;
  params: any;
}) {
  const [emoji, setEmoji] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const { user } = useUser();
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
      const documentId = uuidv4();
      await setDoc(doc(db, "WorkSpaceDocuments", documentId.toString()), {
        workspaceId: params?.workspaceId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        coverImage: selectedImage,
        id: documentId,
        emoji: emoji,
        documentName: documentName,
        documentOutput: [],
        projectType: projectType,
      });

      // create a new document output for the workspace
      await setDoc(doc(db, "DocumentOutput", documentId.toString()), {
        docId: documentId,
        output: [],
      });

      toast("Document created successfully");
      router.replace(`/workspace/${params?.workspaceId}/${documentId}`);
    } catch (error: any) {
      toast(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(createProject)}
      className="flex flex-col gap-4 rounded-xl"
    >
      <div className="flex flex-col items-center gap-2">
        <input
          id="documentName"
          type="text"
          className="mb-3 mt-5 w-full rounded-md px-3 py-2 text-black/90 outline-none dark:border-2 dark:bg-[#1f1f1f] dark:text-white dark:placeholder:text-[#80868B]"
          placeholder="Enter project name"
          {...register("documentName", { required: true })}
        />
        {errors.documentName && (
          <p className="text-sm text-red-500">{errors.documentName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-justify text-sm font-semibold">Icons</p>

        <div className="mb-2 flex items-center gap-1.5">
          {emojiIcons.map((icon: string, index) => (
            <div
              key={index}
              onClick={() => setEmoji(icon)}
              className={cn(
                `cursor-pointer rounded-md border-2`,
                emoji !== icon && "border-transparent",
              )}
            >
              <span className="text-xl">{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-justify text-sm font-semibold">Background</p>

        <div className="mx-auto flex w-full flex-wrap gap-1">
          {coverImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image.imageUrl)}
              className={cn(
                `w-max cursor-pointer rounded-md border border-transparent p-1 transition-all duration-300 hover:border-white`,
                selectedImage === image.imageUrl && "border-white",
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
          projectType === "board" && "bg-[#c98a0d]",
          projectType === "sprint" && "bg-[#933030]",
          projectType === "page" && "bg-[#1963ae]",
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
