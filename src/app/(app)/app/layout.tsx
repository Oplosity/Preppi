import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import AppHeader from "@/components/appHeader";

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
    <html lang="en">
        <body className={inter.className}>
            <div className="overflow-hidden">
                <AppHeader />
                <div className="overflow-hidden mt-[74px]">
                    {children}
                </div>
            </div>
        </body>
    </html>
  );
}
