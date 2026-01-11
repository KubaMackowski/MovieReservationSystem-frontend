

export default async function Home() {
    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[1200px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">Movie
                            Management</h2>
                        <p className="text-gray-400 text-base font-normal leading-normal">Manage your cinema's movie
                            listings and schedules</p>
                    </div>
                    <button
                        className="flex items-center justify-center gap-2 rounded-xl h-10 px-6 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        <span className="truncate">Add New Movie</span>
                    </button>
                </div>
                <div
                    className="flex flex-wrap items-center gap-4 bg-surface-dark p-4 rounded-xl border border-border-dark shadow-sm">
                    <div className="relative flex-1 min-w-[240px]">
                        <span
                            className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500">search</span>
                        <input
                            className="w-full h-11 pl-11 pr-4 bg-background-dark border-border-dark rounded-lg text-sm text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-border-dark transition-all"
                            placeholder="Search movies by title..." type="text"/>
                    </div>
                    <div className="relative min-w-[180px]">
                        <span
                            className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500">filter_list</span>
                        <select
                            className="w-full h-11 pl-10 pr-8 bg-background-dark border-border-dark rounded-lg text-sm text-white focus:ring-2 focus:ring-primary/50 focus:border-border-dark appearance-none cursor-pointer">
                            <option value="">All Genres</option>
                            <option value="sci-fi">Sci-Fi</option>
                            <option value="drama">Drama</option>
                            <option value="comedy">Comedy</option>
                            <option value="action">Action</option>
                        </select>
                        <span
                            className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-[20px] pointer-events-none">expand_more</span>
                    </div>
                    <div className="relative min-w-[160px]">
                        <select
                            className="w-full h-11 px-4 bg-background-dark border-border-dark rounded-lg text-sm text-white focus:ring-2 focus:ring-primary/50 focus:border-border-dark appearance-none cursor-pointer">
                            <option value="">Status: All</option>
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                        </select>
                        <span
                            className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-[20px] pointer-events-none">expand_more</span>
                    </div>
                </div>
                <div
                    className="flex flex-col flex-1 overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="bg-surface-dark-hover border-b border-border-dark">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 w-20">Poster</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Title</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Genre</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Release
                                    Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 w-32">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 w-32">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                            <tr className="hover:bg-surface-dark-hover transition-colors group">
                                <td className="px-6 py-4">
                                    <div
                                        className="h-12 w-12 rounded-lg bg-cover bg-center shadow-sm border border-border-dark"
                                        data-alt="Poster for Dune Part Two movie"
                                        // style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuCTsF6tMgDf6DcRRHWe-w5tjZfEXr1-c7JN8Ccib3vvpn-qlQiGwnX5uFnlXDFU95kfvLzTln4PBpUdBy9GBff_ubIaJ8VHM0qxCxv_geC2OW_FUtUK8r4go0IJYgDb_eH4_59UiZJNUH5tqgLqexqfQKPVHYkqAPdC3dfEWVugGHTkXspjh-QWBFnkTcNvlGL9ekgfdJzDqjZoqi8gLJD46xdpPM9cUqrPA0j0AsxQyPseNzF54VcAaaOPBZHysohSfTIjrP5wVb');"
                                    ></div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-white">Dune: Part Two</p>
                                    <p className="text-xs text-gray-500 mt-0.5">2h 46m</p>
                                </td>
                                <td className="px-6 py-4">
<span
    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                            Sci-Fi
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">Mar 1, 2024</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                <span
                                    className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                                        <span className="text-sm font-medium text-white">Active</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div
                                        className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            className="p-2 rounded-lg text-gray-400 hover:bg-primary/20 hover:text-primary-300 transition-colors"
                                            title="Edit">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button
                                            className="p-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                                            title="Delete">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-surface-dark-hover transition-colors group">
                                <td className="px-6 py-4">
                                    <div
                                        className="h-12 w-12 rounded-lg bg-cover bg-center shadow-sm border border-border-dark"
                                        data-alt="Poster for Oppenheimer movie"
                                        // style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpnKM-3vIZ1UWUy4B0wQQzQNWhuGYF2jFOofJ91e9sqP8oXXOR1M3Lp1mS4UzpQILeR6nHvPZsakhOnqjKk5b8Gzzi3tEWUDsNcH0EivLFJzCS7gVS3vcQupRQg2bVFkqnS0nrS8BfWBetmsna10fqXtXMk2L-n0K1HAtv4MDoSoZ2bEdmkRQ6PjHo-LJydJrA-e2dzuJ9f2sE7lQuwYlMbk4OaZVUu5HHX7-7i8w0fjLhMXNK7Yn06MxYKDCr3fj_gE8peueSMhqo');"
                                    ></div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-white">Oppenheimer</p>
                                    <p className="text-xs text-gray-500 mt-0.5">3h 00m</p>
                                </td>
                                <td className="px-6 py-4">
<span
    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                            Drama
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">Jul 21, 2023</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="size-2 rounded-full bg-gray-500"></span>
                                        <span className="text-sm font-medium text-gray-400">Archived</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div
                                        className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            className="p-2 rounded-lg text-gray-400 hover:bg-primary/20 hover:text-primary-300 transition-colors"
                                            title="Edit">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button
                                            className="p-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                                            title="Delete">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-surface-dark-hover transition-colors group">
                                <td className="px-6 py-4">
                                    <div
                                        className="h-12 w-12 rounded-lg bg-cover bg-center shadow-sm border border-border-dark"
                                        data-alt="Poster for Barbie movie"
                                        // style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7k4S7ofPaZEikhLfPFgTpIQGWoPEjp3QjW_moNFKcN9w7LD3szHWfeD433bszD8ioaggdfdkespKJt7iyx00kUDXaGW4lvegWSxpWfPBqzK0qSeh9YSf2ch8O7oEBRhE5AEA3YA3xdnonvYJSATaVRzwgXPnHUb2WKK2h9LNq88APXkTNSKZ5_0ID1a1n_7NSBY6wAlPL2mqAGjiA4TFOZ1LgIrgiCDufu026EvFXn3h3XHMkHWCizyLb4moSH7GhI9AoT_tUzLeC');"
                                    ></div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-white">Barbie</p>
                                    <p className="text-xs text-gray-500 mt-0.5">1h 54m</p>
                                </td>
                                <td className="px-6 py-4">
<span
    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                            Comedy
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">Jul 21, 2023</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                <span
                                    className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                                        <span className="text-sm font-medium text-white">Active</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div
                                        className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            className="p-2 rounded-lg text-gray-400 hover:bg-primary/20 hover:text-primary-300 transition-colors"
                                            title="Edit">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button
                                            className="p-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                                            title="Delete">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-surface-dark-hover transition-colors group">
                                <td className="px-6 py-4">
                                    <div
                                        className="h-12 w-12 rounded-lg bg-cover bg-center shadow-sm border border-border-dark"
                                        data-alt="Poster for Godzilla x Kong movie"
                                        // style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeeTfM7X5DiFoYmPS-EzyrBZFeEQKK58_27EHkEsdkgi_AlZ6FSzqofVnVJcQeZiolfBh1L3wqSqDSgJb4dD_Vmbf9G9hxJx5U78MwzeNM5sNwuZ5wenqBRku8tJXyx2kzKVfisHMSWY2_EtylrSUimF55fgstq09UQaFbcqW1IaWS-mR9hOtM8el8qmfzQKCFriuLN99FeqcKy9Gg1tX_UWn_MV5Tra-StxOWr1vA69xiyd9Z4PLpIL5e2IVkIKrKM2jazOE1um6Z');"
                                    ></div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-white">Godzilla x Kong</p>
                                    <p className="text-xs text-gray-500 mt-0.5">1h 55m</p>
                                </td>
                                <td className="px-6 py-4">
<span
    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                            Action
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">Mar 29, 2024</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                <span
                                    className="size-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]"></span>
                                        <span className="text-sm font-medium text-white">Draft</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div
                                        className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            className="p-2 rounded-lg text-gray-400 hover:bg-primary/20 hover:text-primary-300 transition-colors"
                                            title="Edit">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button
                                            className="p-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                                            title="Delete">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-surface-dark-hover transition-colors group">
                                <td className="px-6 py-4">
                                    <div
                                        className="h-12 w-12 rounded-lg bg-cover bg-center shadow-sm border border-border-dark"
                                        data-alt="Poster for Spider-Man movie"
                                        // style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuABrI8OAL45JItYFwRWIYfSZmH1eIG9PooyfMiYKq1F7gYkpWb4gnd07cjXNqKtozVeSvpzyeZbzuSLNhvhNQWzXVhs-M4m6TB9l2WSJXs0zNpSzLbZYDyWoognAawsgcPkxpncTcWkPGASk2ft2HomU4rG25NHxgmd5vMgkBR9MNPGR9vqaIrn3RBMCUnAIhCLEjSVNEwpY-F3wO3ryqhI4SFb78G5xi9bkzaRYYpn0gkWw3scy8IYTmeC4QhUYMqgsFnrAFuH8mra');"
                                    ></div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-white">Spider-Man: ATSP</p>
                                    <p className="text-xs text-gray-500 mt-0.5">2h 20m</p>
                                </td>
                                <td className="px-6 py-4">
<span
    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                            Animation
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">Jun 2, 2023</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                <span
                                    className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                                        <span className="text-sm font-medium text-white">Active</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div
                                        className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            className="p-2 rounded-lg text-gray-400 hover:bg-primary/20 hover:text-primary-300 transition-colors"
                                            title="Edit">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button
                                            className="p-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                                            title="Delete">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div
                        className="flex items-center justify-between border-t border-border-dark px-4 py-3 sm:px-6 bg-surface-dark">
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-400">
                                    Showing <span className="font-medium text-white">1</span> to <span
                                    className="font-medium text-white">5</span> of <span
                                    className="font-medium text-white">24</span> results
                                </p>
                            </div>
                            <div>
                                <nav aria-label="Pagination"
                                     className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    <a className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-border-dark hover:bg-surface-dark-hover focus:z-20 focus:outline-offset-0"
                                       href="#">
                                        <span className="sr-only">Previous</span>
                                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                    </a>
                                    <a aria-current="page"
                                       className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                       href="#">1</a>
                                    <a className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-border-dark hover:bg-surface-dark-hover focus:z-20 focus:outline-offset-0"
                                       href="#">2</a>
                                    <a className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-border-dark hover:bg-surface-dark-hover focus:z-20 focus:outline-offset-0"
                                       href="#">3</a>
                                    <span
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-border-dark focus:outline-offset-0">...</span>
                                    <a className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-border-dark hover:bg-surface-dark-hover focus:z-20 focus:outline-offset-0"
                                       href="#">
                                        <span className="sr-only">Next</span>
                                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}