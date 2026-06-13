import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, MobileNav } from "@/components/layout/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindDump | Mental Clarity AI",
  description: "Declutter your mind with production-ready AI categorization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-mesh overflow-x-hidden`}>
        {/* Background Blobs */}
        <div className="fixed inset-0 z-[-1] overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] animate-pulse-slow delay-1000" />
          <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-accent/10 blur-[100px] animate-float" />
        </div>

        <Navbar />
        <main className="flex-1 pt-24 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
