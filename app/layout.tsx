import type { Metadata } from "next";
import { Inter, Space_Grotesk, Caveat, Dancing_Script } from "next/font/google";
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

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--caveat",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--dancing-script",
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
    <html lang="en" className="dark  dark:bg-[#0D0D10]">
      <body
        className={`${caveat.variable} ${dancingScript.variable} ${spaceSpace_Grotesk.variable} ${inter.variable} `}
      >
        {children}
      </body>
    </html>
  );
}
