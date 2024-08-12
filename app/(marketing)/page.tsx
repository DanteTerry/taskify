import HeroSec from "./_components/HeroSec";
import NavBar from "./_components/NavBar";

export default function Marketing() {
  return (
    <div className="min-h-full flex flex-col ">
      <NavBar />
      <div className="flex flex-col items-center justify-center md:justify-center text-center gap-y-8 flex-1 px-6 pb-10">
        <HeroSec />
      </div>
    </div>
  );
}
