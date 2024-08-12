import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceSpace_Grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--space-grotesk",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

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
      <body
        className={` dark:bg-[#0D0D10] ${spaceSpace_Grotesk.variable} ${inter.variable} `}
      >
        {children}
      </body>
    </html>
  );
}
