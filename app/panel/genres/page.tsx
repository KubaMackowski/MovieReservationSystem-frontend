'use client';

import React, { useState, useEffect } from 'react';
import { Genre } from "@/types/genre"; // Upewnij się, że masz ten typ
import { deleteGenre, getGenresList } from "@/app/actions/genre-actions"; // Tutaj twoje Server Actions
import Link from "next/link";
import Pagination from "@/app/panel/_components/pagination";

export default function GenresPage() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);

    // Stan paginacji
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const handleDelete = async (id: number) => {
        if (confirm('Czy na pewno chcesz usunąć ten gatunek? Tej operacji nie można cofnąć.')) {
            try {
                const result = await deleteGenre(id);
                if (result.success) {
                    setGenres(prev => prev.filter(g => g.id !== id));
                } else {
                    alert(result.error || "Wystąpił błąd podczas usuwania.");
                }
            } catch (error) {
                console.error("Błąd usuwania:", error);
                alert("Nie udało się połączyć z serwerem.");
            }
        }
    };

    useEffect(() => {
        const loadGenres = async () => {
            setLoading(true);
            try {
                const data = await getGenresList();
                setGenres(data);
            } catch (error) {
                console.error('Błąd w komponencie:', error);
            } finally {
                setLoading(false);
            }
        };

        loadGenres();
    }, []);

    // Logika cięcia danych (paginacja po stronie klienta)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGenres = genres.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[1200px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

                {/* HEADER */}
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                            Gatunki filmowe
                        </h2>
                    </div>
                    <Link href="/panel/genres/add" className="flex items-center justify-center gap-2 rounded-xl h-10 px-6 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">category</span>
                        <span className="truncate">Dodaj gatunek</span>
                    </Link>
                </div>

                {/* TABLE CONTAINER */}
                <div className="flex flex-col flex-1 overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead className="bg-surface-dark-hover border-b border-border-dark">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 w-24">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Nazwa</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 w-32">Akcje</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                            {loading ? (
                                <tr><td colSpan={3} className="text-center py-10 text-gray-400">Ładowanie...</td></tr>
                            ) : (
                                currentGenres.map((genre) => (
                                    <tr key={genre.id} className="hover:bg-surface-dark-hover transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500">#{genre.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-white">{genre.name}</p>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/panel/genres/${genre.id}/edit`} className="p-2 rounded-lg text-gray-400 hover:bg-primary/20 hover:text-primary-300 transition-colors" title="Edytuj">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </Link>
                                                <button onClick={() => handleDelete(genre.id)} className="p-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors" title="Usuń">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            {/* Obsługa pustej listy */}
                            {!loading && genres.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center py-10 text-gray-500">
                                        Brak gatunków w bazie. Dodaj pierwszy!
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINACJA */}
                    <Pagination
                        totalItems={genres.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />

                </div>
            </div>
        </main>
    );
}