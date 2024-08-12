import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taskify - AI powered task management tool",
  description:
    " Taskify is a task management tool that uses AI to help you manage your tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark dark:bg-[#0D0D10]">
      <body className={` dark:bg-[#0D0D10] ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
