'use client';

import React, { useState, useEffect } from 'react';
import { RoomDto } from "@/types/room"; // Twój typ RoomDto
import { deleteRoom, getRoomsList } from "@/app/actions/room-actions"; // Zakładamy, że masz te akcje
import Link from "next/link";
import Pagination from "@/app/panel/_components/pagination";

export default function RoomsPage() {
    const [rooms, setRooms] = useState<RoomDto[]>([]);
    const [loading, setLoading] = useState(true);

    // Stan paginacji
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const handleDelete = async (id: number) => {
        if (confirm('Czy na pewno chcesz usunąć tę salę? Usunięcie sali spowoduje usunięcie wszystkich powiązanych seansów.')) {
            try {
                const result = await deleteRoom(id);
                if (result.success) {
                    setRooms(prev => prev.filter(r => r.id !== id));
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
        const loadRooms = async () => {
            setLoading(true);
            try {
                const data = await getRoomsList();
                setRooms(data);
            } catch (error) {
                console.error('Błąd w komponencie:', error);
            } finally {
                setLoading(false);
            }
        };

        loadRooms();
    }, []);

    // Logika cięcia danych
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRooms = rooms.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[1200px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

                {/* HEADER */}
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                            Sale Kinowe
                        </h2>
                        <p className="text-gray-400 text-sm">Zarządzaj salami i układem miejsc.</p>
                    </div>
                    <Link href="/panel/rooms/add" className="flex items-center justify-center gap-2 rounded-xl h-10 px-6 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">meeting_room</span>
                        <span className="truncate">Dodaj salę</span>
                    </Link>
                </div>

                {/* TABLE CONTAINER */}
                <div className="flex flex-col flex-1 overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="bg-surface-dark-hover border-b border-border-dark">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 w-24">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Numer Sali</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Pojemność</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Status miejsc</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 w-32">Akcje</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                            {loading ? (
                                <tr><td colSpan={5} className="text-center py-10 text-gray-400">Ładowanie...</td></tr>
                            ) : (
                                currentRooms.map((room) => (
                                    <tr key={room.id} className="hover:bg-surface-dark-hover transition-colors group">

                                        {/* ID */}
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500">#{room.id}</span>
                                        </td>

                                        {/* NUMER SALI */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                                                    {room.number}
                                                </div>
                                            </div>
                                        </td>

                                        {/* POJEMNOŚĆ */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white">{room.seats} miejsc</span>
                                                <span className="text-xs text-gray-500">Deklarowana</span>
                                            </div>
                                        </td>

                                        {/* STATUS WYGENEROWANYCH MIEJSC */}
                                        <td className="px-6 py-4">
                                            {room.generatedSeatsCount === room.seats ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                                    OK ({room.generatedSeatsCount})
                                                </span>
                                            ) : room.generatedSeatsCount === 0 ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                                    Brak miejsc (0)
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                                                    Niezgodność ({room.generatedSeatsCount})
                                                </span>
                                            )}
                                        </td>

                                        {/* AKCJE */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/panel/rooms/${room.id}/edit`} className="p-2 rounded-lg text-gray-400 hover:bg-primary/20 hover:text-primary-300 transition-colors" title="Edytuj">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </Link>
                                                <button onClick={() => handleDelete(room.id)} className="p-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors" title="Usuń">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}

                            {!loading && rooms.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 text-gray-500">
                                        Brak sal kinowych. Dodaj pierwszą salę!
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINACJA */}
                    <Pagination
                        totalItems={rooms.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />

                </div>
            </div>
        </main>
    );
}