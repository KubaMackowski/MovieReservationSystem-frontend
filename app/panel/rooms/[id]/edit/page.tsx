'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getRoomById, updateRoom } from '@/app/actions/room-actions';

export default function EditRoomPage() {
    const router = useRouter();
    const params = useParams();

    // Pobieramy ID i konwertujemy na number
    const roomId = Number(Array.isArray(params.id) ? params.id[0] : params.id);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        number: 0,
        seats: 0
    });

    useEffect(() => {
        if (!roomId) return;

        const loadRoom = async () => {
            try {
                const room = await getRoomById(roomId);

                if (!room) {
                    alert('Nie znaleziono sali');
                    router.push('/panel/rooms');
                    return;
                }

                setFormData({
                    number: room.number,
                    seats: room.seats
                });
                setLoading(false);
            } catch (error) {
                console.error("Błąd ładowania sali:", error);
                router.push('/panel/rooms');
            }
        };

        loadRoom();
    }, [roomId, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value === '' ? '' : Number(value)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!roomId) return;

        setSaving(true);

        const payload = {
            number: Number(formData.number),
            seats: Number(formData.seats)
        };

        const result = await updateRoom(roomId, payload);

        if (result.success) {
            router.push('/panel/rooms');
        } else {
            alert(result.error);
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-white text-center">Ładowanie danych sali...</div>;

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[600px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

                <div className="flex flex-col gap-1">
                    <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                        Edytuj salę
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Zaktualizuj numer sali lub jej pojemność.
                    </p>
                </div>

                <div className="bg-surface-dark rounded-xl border border-border-dark shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-8">
                        <div className="grid grid-cols-1 gap-6">

                            {/* Pole Numer Sali */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="number">
                                    Numer sali
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="number"
                                    name="number"
                                    type="number"
                                    min="1"
                                    max="100"
                                    required
                                    value={formData.number}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-gray-500">
                                    Numer musi być unikalny.
                                </p>
                            </div>

                            {/* Pole Pojemność */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="seats">
                                    Pojemność (liczba miejsc)
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="seats"
                                    name="seats"
                                    type="number"
                                    min="1"
                                    max="500"
                                    required
                                    value={formData.seats}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-yellow-500/80">
                                    Uwaga: Zmiana pojemności może wymagać regeneracji układu miejsc.
                                </p>
                            </div>

                        </div>

                        <div className="h-px bg-gray-800"></div>

                        <div className="flex flex-wrap items-center justify-end gap-3">
                            <button
                                onClick={() => router.back()}
                                className="px-6 h-10 rounded-xl text-sm font-bold text-gray-300 hover:bg-gray-800 transition-colors"
                                type="button"
                                disabled={saving}
                            >
                                Anuluj
                            </button>
                            <button
                                className="flex items-center justify-center gap-2 rounded-xl h-10 px-8 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-md shadow-primary/20 disabled:opacity-50"
                                type="submit"
                                disabled={saving}
                            >
                                {saving ? (
                                    <span>Zapisywanie...</span>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[20px]">save</span>
                                        <span>Zaktualizuj</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}