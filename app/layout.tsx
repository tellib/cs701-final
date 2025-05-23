import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Header from "@/components/ui/Header";
import UserCard from "@/components/auth/UserCard";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased from-slate-900 to-slate-800 bg-gradient-to-t`}
      >
        <div className="min-h-screen max-w-[1000px] mx-auto w-full flex flex-col shadow">
          <Header />
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 p-4 bg-gray-200">
            <Navbar />
            <UserCard />
          </div>
          <div className="flex-1 bg-primary-foreground flex flex-col p-8">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
