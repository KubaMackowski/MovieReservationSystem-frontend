import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/sidebar/sidebar";
import {getMe} from "@/lib/auth";
import {redirect} from "next/navigation";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Panel administracyjny"
};


export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getMe()

    if (!user) {
        redirect('/login')
    }
    return (
        <html lang="pl">
        <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </head>
        <body className="bg-background-dark text-gray-100 font-display transition-colors duration-200">
        <div className="flex h-screen w-full overflow-hidden">
                        {Sidebar(user)}
                        {children}
        </div>
        </body>
        </html>
    );
}
