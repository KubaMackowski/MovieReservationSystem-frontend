'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile } from "@/types/user";
import { deleteUser, getUsersList } from "@/app/actions/user-actions";
import Link from "next/link";
import Pagination from "@/app/panel/_components/pagination"; // <--- Importujemy nowy komponent

export default function UsersPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    // Stan paginacji nadal trzymamy w rodzicu, bo decyduje on o cięciu danych (.slice)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const handleDelete = async (id: number) => {
        if (confirm('Czy na pewno chcesz usunąć tego użytkownika? Tej operacji nie można cofnąć.')) {
            const result = await deleteUser(id);
            if (result.success) {
                setUsers(prev => prev.filter(u => u.id !== id));
            } else {
                alert(result.error);
            }
        }
    };

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const data = await getUsersList();
                setUsers(data);
            } catch (error) {
                console.error('Błąd w komponencie:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    // Logika cięcia danych zostaje tutaj (chyba że przeniesiesz paginację na backend)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    const getRoleBadgeStyle = (role: string[]) => {
        const firstRole = role ? role[0] : '';
        switch(firstRole) {
            case 'ADMIN': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'USER': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[1200px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                            Użytkownicy
                        </h2>
                    </div>
                    <Link href="/panel/users/add" className="flex items-center justify-center gap-2 rounded-xl h-10 px-6 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">person_add</span>
                        <span className="truncate">Dodaj użytkownika</span>
                    </Link>
                </div>
                <div className="flex flex-col flex-1 overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="bg-surface-dark-hover border-b border-border-dark">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Rola</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 w-32">Akcje</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                            {loading ? (
                                <tr><td colSpan={6} className="text-center py-10 text-gray-400">Ładowanie...</td></tr>
                            ) : (
                                currentUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-surface-dark-hover transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-white">{user.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeStyle(user.roles)}`}>
                                            {user.roles}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/panel/users/${user.id}/edit`} className="p-2 rounded-lg text-gray-400 hover:bg-primary/20 hover:text-primary-300 transition-colors" title="Edit">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </Link>
                                                <button onClick={() => handleDelete(user.id)} className="p-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors" title="Delete">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* NOWY KOMPONENT PAGINACJI */}
                    <Pagination
                        totalItems={users.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage} // Przekazujemy funkcję zmiany stanu
                    />

                </div>
            </div>
        </main>
    );
}