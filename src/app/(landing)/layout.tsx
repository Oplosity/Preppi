import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
            <div className="overflow-hidden flex flex-col min-h-screen">
                <Header/>
                <div className="overflow-hidden mt-[106px] grow">
                    {children}
                </div>
                <Footer />
            </div>
        </body>
    </html>
  );
}
