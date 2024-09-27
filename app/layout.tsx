import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import {
  Space_Grotesk,
  Caveat,
  Dancing_Script,
  Poppins,
  Inter,
} from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";
import { store } from "@/lib/redux/store";
import GlobalStateProvider from "@/components/provider/GlobalStateProvider";
import DarkModeProvider from "@/components/provider/DarkModeProvider";

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
    <html lang="en" className="h-full">
      <body
        className={`${caveat.variable} dark ${inter.variable} h-full font-poppins ${dancingScript.variable} ${spaceSpace_Grotesk.variable} ${poppins.variable} `}
        suppressHydrationWarning={true}
      >
        <DarkModeProvider>
          <ClerkProvider>
            <GlobalStateProvider>
              {children}
              <Toaster />
            </GlobalStateProvider>
          </ClerkProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
