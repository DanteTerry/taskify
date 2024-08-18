import {
  Box,
  DrumIcon,
  Feather,
  LayoutGrid,
  LoaderPinwheel,
  Puzzle,
  Sparkle,
  X,
  Zap,
} from "lucide-react";

function ProjectCard() {
  return (
    <div className="mt-5 flex h-64 w-2/5 flex-col gap-2 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[18px]">New Project</h3>

        <button>
          <X size={25} />
        </button>
      </div>

      <input
        id="password"
        type="password"
        className="mb-3 mt-2 w-full rounded-md px-3 py-2 text-black/90 outline-none dark:border-2 dark:border-[#6A7863] dark:bg-[#1f1f1f] dark:placeholder:text-[#80868B]"
        placeholder="Enter project name"
      />

      <p className="text-sm">Icons</p>

      <div className="mb-2 flex items-center gap-2">
        <button>
          <LayoutGrid
            size={20}
            className="text-[#E1E1E1]/85 hover:text-white"
          />
        </button>
        <button>
          <Sparkle size={20} className="text-[#E1E1E1]/85 hover:text-white" />
        </button>
        <button>
          <LoaderPinwheel
            size={20}
            className="text-[#E1E1E1]/85 hover:text-white"
          />
        </button>

        <button>
          <Puzzle size={20} className="text-[#E1E1E1]/85 hover:text-white" />
        </button>

        <button>
          <Box size={20} className="text-[#E1E1E1]/85 hover:text-white" />
        </button>

        <button>
          <Zap size={20} className="text-[#E1E1E1]/85 hover:text-white" />
        </button>
        <button>
          <DrumIcon size={20} className="text-[#E1E1E1]/85 hover:text-white" />
        </button>

        <button>
          <Feather size={20} className="text-[#E1E1E1]/85 hover:text-white" />
        </button>
      </div>

      <p className="text-sm">Background</p>

      <div className="mb-2 flex items-center gap-2">
        <button>
          <LayoutGrid
            size={20}
            className="text-[#E1E1E1]/85 hover:text-white"
          />
        </button>
        <button>
          <Sparkle size={20} className="text-[#E1E1E1]/85 hover:text-white" />
        </button>
        <button>
          <LoaderPinwheel
            size={20}
            className="text-[#E1E1E1]/85 hover:text-white"
          />
        </button>

        <button>
          <Puzzle size={20} className="text-[#E1E1E1]/85 hover:text-white" />
        </button>

        <button>
          <Box size={20} className="text-[#E1E1E1]/85 hover:text-white" />
        </button>

        <button>
          <Zap size={20} className="text-[#E1E1E1]/85 hover:text-white" />
        </button>
        <button>
          <DrumIcon size={20} className="text-[#E1E1E1]/85 hover:text-white" />
        </button>

        <button>
          <Feather size={20} className="text-[#E1E1E1]/85 hover:text-white" />
        </button>
      </div>
    </div>
  );
}
export default ProjectCard;
