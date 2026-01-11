import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/navbar";
import {getMe} from "@/lib/auth";
import Footer from "@/app/(cinema)/_components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Merito Cinema",
  description: "Najlepsze kino w Poznaniu",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = await getMe()

  return (
    <html lang="pl">
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </head>
    <body className="bg-background font-display text-text-main">
    <div className="relative flex min-h-screen w-full flex-col">
        <div className="flex h-full grow flex-col">
            <div className="flex flex-1 justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
                <div className="flex w-full max-w-7xl flex-col">
                    {Navbar(user)}
                    {children}
                    {Footer()}
                </div>
            </div>
        </div>
    </div>
    </body>
    </html>
);
}
