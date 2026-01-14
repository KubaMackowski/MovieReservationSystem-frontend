'use client';

import React, { useState, useEffect } from 'react';
import { ShowingDto } from "@/types/showing"; // Twój typ ShowingDto
import { deleteShowing, getShowingsList } from "@/app/actions/showing-actions"; // Twoje Server Actions
import Link from "next/link";
import Pagination from "@/app/panel/_components/pagination";

export default function ShowingsPage() {
    const [showings, setShowings] = useState<ShowingDto[]>([]);
    const [loading, setLoading] = useState(true);

    // Stan paginacji
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const handleDelete = async (id: number) => {
        if (confirm('Czy na pewno chcesz usunąć ten seans? Spowoduje to anulowanie wszystkich rezerwacji na ten termin.')) {
            try {
                const result = await deleteShowing(id);
                if (result.success) {
                    setShowings(prev => prev.filter(s => s.id !== id));
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
        const loadShowings = async () => {
            setLoading(true);
            try {
                const data = await getShowingsList();
                // Opcjonalnie: Sortowanie po dacie (od najnowszych/najbliższych)
                const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                setShowings(sortedData);
            } catch (error) {
                console.error('Błąd w komponencie:', error);
            } finally {
                setLoading(false);
            }
        };

        loadShowings();
    }, []);

    // Logika cięcia danych
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentShowings = showings.slice(indexOfFirstItem, indexOfLastItem);

    // Helper do formatowania godziny (np. 14:30)
    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    };

    // Helper do formatowania daty (np. 12.01.2025)
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[1200px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

                {/* HEADER */}
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                            Repertuar (Seanse)
                        </h2>
                        <p className="text-gray-400 text-sm">Planowanie projekcji w salach kinowych.</p>
                    </div>
                    <Link href="/panel/showings/add" className="flex items-center justify-center gap-2 rounded-xl h-10 px-6 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
                        <span className="truncate">Dodaj seans</span>
                    </Link>
                </div>

                {/* TABLE CONTAINER */}
                <div className="flex flex-col flex-1 overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead className="bg-surface-dark-hover border-b border-border-dark">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 w-24">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Film</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Sala</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Data</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Godziny</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 w-32">Akcje</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                            {loading ? (
                                <tr><td colSpan={6} className="text-center py-10 text-gray-400">Ładowanie...</td></tr>
                            ) : (
                                currentShowings.map((showing) => (
                                    <tr key={showing.id} className="hover:bg-surface-dark-hover transition-colors group">

                                        {/* ID */}
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500">#{showing.id}</span>
                                        </td>

                                        {/* FILM */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white">{showing.movieTitle}</span>
                                                <Link href={`/panel/movies/${showing.movie_Id}/edit`} className="text-xs text-primary hover:underline">
                                                    Zobacz film
                                                </Link>
                                            </div>
                                        </td>

                                        {/* SALA */}
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600">
                                                Sala {showing.roomNumber}
                                            </span>
                                        </td>

                                        {/* DATA */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[16px] text-gray-500">calendar_today</span>
                                                <span className="text-sm text-gray-300">{formatDate(showing.date)}</span>
                                            </div>
                                        </td>

                                        {/* GODZINY */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[16px] text-gray-500">schedule</span>
                                                <span className="text-sm text-gray-300 font-mono">
                                                    {formatTime(showing.date)} - {formatTime(showing.end_Date)}
                                                </span>
                                            </div>
                                        </td>

                                        {/* AKCJE */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/panel/showings/${showing.id}/edit`} className="p-2 rounded-lg text-gray-400 hover:bg-primary/20 hover:text-primary-300 transition-colors" title="Edytuj">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </Link>
                                                <button onClick={() => handleDelete(showing.id)} className="p-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors" title="Usuń">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}

                            {!loading && showings.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-gray-500">
                                        Brak zaplanowanych seansów.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINACJA */}
                    <Pagination
                        totalItems={showings.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />

                </div>
            </div>
        </main>
    );
}