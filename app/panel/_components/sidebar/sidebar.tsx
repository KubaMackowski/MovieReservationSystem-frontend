export default function Sidebar() {
    return (
        <aside className="hidden w-64 flex-col border-r border-border-dark bg-surface-dark md:flex">
            <div className="flex h-full flex-col justify-between p-4">
                <div className="flex flex-col gap-6">
                    <div className="flex gap-3 items-center px-2 py-1">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-700 shadow-sm"
                            data-alt="Admin user profile picture with abstract gradient"
                            // style="background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuBGMEMnS48PT6doEvGAFuoH0WFwxPS3-e5Xmvnb2S-nvn2-9KbTOu-E9GPrXTfY4PXPk4EsKUhYtczvj0KZwNeG2Tw8RPOtb3ND3b8tUieMmjloQvfDuPvFwQbPjRRC__Q40O0OE1Ncn4jx6x9JioWrNhyZkMxuXoeycloksp5lxtXca3Zo6hP8nDwHLC34fyoaqg47iLk_7T6SXVPPBg_1OzVaSbse0K3FzkWAks3w9vdannJ6Lmi-J029TeQ5Fbhqu_4yspmZwxER&quot;);"
                        ></div>
                        <div className="flex flex-col">
                            <h1 className="text-white text-base font-bold leading-normal">Cinema Admin</h1>
                            <p className="text-gray-400 text-xs font-normal leading-normal">Manage Content</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-dark-hover transition-colors group"
                           href="#">
                            <span
                                className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">dashboard</span>
                            <p className="text-gray-400 group-hover:text-white text-sm font-medium leading-normal">Dashboard</p>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary/20" href="#">
                            <span className="material-symbols-outlined text-primary" data-weight="fill">movie</span>
                            <p className="text-primary text-sm font-bold leading-normal">Movies</p>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-dark-hover transition-colors group"
                           href="#">
                            <span
                                className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">group</span>
                            <p className="text-gray-400 group-hover:text-white text-sm font-medium leading-normal">Users</p>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-dark-hover transition-colors group"
                           href="#">
                            <span
                                className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">settings</span>
                            <p className="text-gray-400 group-hover:text-white text-sm font-medium leading-normal">Settings</p>
                        </a>
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