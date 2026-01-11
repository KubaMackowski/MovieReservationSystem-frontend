import {UserProfile} from "@/types/user";
import Link from "next/link";

export default function Navbar(user: UserProfile | null = null) {
    return (
        <header
            className="flex items-center justify-between whitespace-nowrap p-5 neumorphic-outset rounded-xl bg-background sticky top-5 z-50">
            <Link href="/" className="flex items-center gap-4">
                <div className="h-8 w-8 text-primary">
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 18.5V5.5C4 4.12 5.12 3 6.5 3H10V1.5C10 0.67 10.67 0 11.5 0S13 0.67 13 1.5V3H17.5C18.88 3 20 4.12 20 5.5V18.5C20 19.88 18.88 21 17.5 21H6.5C5.12 21 4 19.88 4 18.5ZM6 6V10H8V6H6ZM6 12V16H8V12H6ZM16 6H10V16H16V6Z"></path>
                    </svg>
                </div>
                <h2 className="text-text-main text-xl font-bold leading-tight tracking-tight">CineSoft</h2>
            </Link>
            <div className="flex items-center gap-3">
                { user ? (
                    <Link
                        href="/panel"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full neumorphic-outset neumorphic-button-hover neumorphic-button-active transition-all">
                        <span className="material-symbols-outlined text-text-main">person</span>
                    </Link>
                ) : (
                    <Link
                        href="/login"
                        className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-background text-sm font-bold leading-normal tracking-wide neumorphic-button-hover neumorphic-button-active transition-all">
                        <span className="truncate">Sign Up</span>
                    </Link>
                )}
            </div>
        </header>
    )
}