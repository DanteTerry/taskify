import type { Metadata } from "next";
import {
  Space_Grotesk,
  Caveat,
  Dancing_Script,
  Poppins,
  Inter,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/components/provider/AuthProvider";

const spaceSpace_Grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--poppins",
  display: "swap",
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
  title: "Taskify ",
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
        className={`${caveat.variable} ${inter.variable} font-poppins ${dancingScript.variable} ${spaceSpace_Grotesk.variable} ${poppins.variable} `}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
