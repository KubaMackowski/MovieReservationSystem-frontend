'use client';

import React, { useState, useEffect } from 'react';
import { ReservationDto } from "@/types/reservation"; // Twój typ
import { deleteReservation, getReservationsList } from "@/app/actions/reservation-actions"; // Twoje Server Actions
import Link from "next/link";
import Pagination from "@/app/panel/_components/pagination";

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<ReservationDto[]>([]);
    const [loading, setLoading] = useState(true);

    // Stan paginacji
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const handleDelete = async (id: number) => {
        if (confirm('Czy na pewno chcesz anulować tę rezerwację? Miejsce zostanie zwolnione.')) {
            try {
                const result = await deleteReservation(id);
                if (result.success) {
                    setReservations(prev => prev.filter(r => r.id !== id));
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
        const loadReservations = async () => {
            setLoading(true);
            try {
                const data = await getReservationsList();
                // Sortujemy: najnowsze rezerwacje na górze
                const sortedData = data.sort((a, b) => new Date(b.created_At).getTime() - new Date(a.created_At).getTime());
                setReservations(sortedData);
            } catch (error) {
                console.error('Błąd w komponencie:', error);
            } finally {
                setLoading(false);
            }
        };

        loadReservations();
    }, []);

    // Logika cięcia danych
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReservations = reservations.slice(indexOfFirstItem, indexOfLastItem);

    // Helper do formatowania daty i godziny
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('pl-PL', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

                {/* HEADER */}
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                            Rezerwacje
                        </h2>
                        <p className="text-gray-400 text-sm">Przeglądaj i zarządzaj biletami użytkowników.</p>
                    </div>
                </div>

                {/* TABLE CONTAINER */}
                <div className="flex flex-col flex-1 overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead className="bg-surface-dark-hover border-b border-border-dark">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 w-20">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Użytkownik</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Film</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Seans</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Miejsce</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Utworzono</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 w-32">Akcje</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                            {loading ? (
                                <tr><td colSpan={7} className="text-center py-10 text-gray-400">Ładowanie...</td></tr>
                            ) : (
                                currentReservations.map((reservation) => (
                                    <tr key={reservation.id} className="hover:bg-surface-dark-hover transition-colors group">

                                        {/* ID */}
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500">#{reservation.id}</span>
                                        </td>

                                        {/* UŻYTKOWNIK */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white">{reservation.userEmail}</span>
                                                <span className="text-xs text-gray-500 line-clamp-1" title={reservation.userId}>ID: {reservation.userId.substring(0, 8)}...</span>
                                            </div>
                                        </td>

                                        {/* FILM */}
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-primary">{reservation.movieTitle}</span>
                                        </td>

                                        {/* DATA SEANSU */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <span className="material-symbols-outlined text-[16px]">event</span>
                                                <span className="text-sm">{formatDateTime(reservation.showingDate)}</span>
                                            </div>
                                        </td>

                                        {/* MIEJSCE */}
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600">
                                                    Rząd: {reservation.seatRow}
                                                </span>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600">
                                                    Nr: {reservation.seatNumber}
                                                </span>
                                            </div>
                                        </td>

                                        {/* UTWORZONO */}
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-gray-500">{formatDateTime(reservation.created_At)}</span>
                                        </td>

                                        {/* AKCJE */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/panel/reservations/${reservation.id}/edit`} className="p-2 rounded-lg text-gray-400 hover:bg-primary/20 hover:text-primary-300 transition-colors" title="Edytuj">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </Link>
                                                <button onClick={() => handleDelete(reservation.id)} className="p-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors" title="Anuluj">
                                                    <span className="material-symbols-outlined text-[20px]">cancel</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}

                            {!loading && reservations.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center py-10 text-gray-500">
                                        Brak rezerwacji w systemie.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINACJA */}
                    <Pagination
                        totalItems={reservations.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />

                </div>
            </div>
        </main>
    );
}