import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="h-full overflow-hidden bg-white dark:bg-gray-900">
      <div className="h-full lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            width={870}
            height={1110}
            alt="image"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex h-full -translate-y-8 items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <SignIn fallbackRedirectUrl={"/dashboard"} />
        </main>
      </div>
    </section>
  );
}
