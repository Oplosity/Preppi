import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import QuizzesSidebar from "@/components/quizzesSidebar";

// Fontawesome icon important things
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Preppi",
  description: "Welcome to Preppi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
        <div className="fixed w-56 h-screen mt-[-74px] pt-[74px]">
            <QuizzesSidebar />
        </div>
        <div className="ml-56 overflow-hidden">
            <div className="standard-app">
                {children}
            </div>
        </div>
    </div>
  );
}
