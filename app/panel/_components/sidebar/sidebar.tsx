import {UserProfile} from "@/types/user";
import Link from "next/link";

export default function Sidebar(user: UserProfile) {
    return (
        <aside className="hidden w-64 flex-col border-r border-border-dark bg-surface-dark md:flex">
            <div className="flex h-full flex-col justify-between p-4">
                <div className="flex flex-col gap-6">
                    <div className="flex gap-3 items-center px-2 py-1">
                        <div className="flex flex-col">
                            <h1 className="text-white text-base font-bold leading-normal">{user.email}</h1>
                            <p className="text-gray-400 text-xs font-normal leading-normal">{user.roles}</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-dark-hover  transition-colors group"
                              href="/panel/genres">
                            <span
                                className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">category</span>
                            <p className="text-gray-400 group-hover:text-white text-sm font-medium leading-normal">Gatunki</p>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-dark-hover  transition-colors group"
                              href="/panel/movies">
                            <span
                                className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">movie</span>
                            <p className="text-gray-400 group-hover:text-white text-sm font-medium leading-normal">Filmy</p>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-dark-hover  transition-colors group"
                           href="/panel/users">
                            <span
                                className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">group</span>
                            <p className="text-gray-400 group-hover:text-white text-sm font-medium leading-normal">Użytkownicy</p>
                        </Link>
                    </nav>
                </div>
                <div
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-red-900/20 rounded-xl transition-colors group">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-red-400">logout</span>
                    <p className="text-gray-400 group-hover:text-red-400 text-sm font-medium leading-normal">Log Out</p>
                </div>
            </div>
        </aside>
    )
}