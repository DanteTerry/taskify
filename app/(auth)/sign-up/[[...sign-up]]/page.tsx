import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="h-full overflow-hidden bg-white dark:bg-gray-900">
      <div className="h-full lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            width={870}
            height={1110}
            alt="image"
            src="https://utfs.io/f/97133e03-f1b1-4be4-bd7a-62a287e68378-exb088.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex h-full -translate-y-8 items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <SignUp fallbackRedirectUrl={"/dashboard"} />
        </main>
      </div>
    </section>
  );
}
