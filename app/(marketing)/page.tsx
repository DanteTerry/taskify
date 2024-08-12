import HeroSec from "./_components/HeroSec";
import NavBar from "./_components/NavBar";

export default function Marketing() {
  return (
    <div className=" selection:min-h-full flex flex-col ">
      <NavBar />
      <div className="flex flex-col items-center justify-center md:justify-center text-center gap-y-8 flex-1 ">
        <HeroSec />
      </div>
    </div>
  );
}
