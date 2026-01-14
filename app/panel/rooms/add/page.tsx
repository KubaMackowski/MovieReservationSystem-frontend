'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRoom } from '@/app/actions/room-actions'; // Zmiana akcji na sale

export default function AddRoomPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Stan formularza - inicjujemy zerami lub pustymi wartościami
    // W C# Number i Seats to int
    const [formData, setFormData] = useState({
        number: '' as unknown as number, // Trick żeby input był pusty na początku zamiast "0"
        seats: '' as unknown as number
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value === '' ? '' : Number(value)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Upewniamy się, że wysyłamy liczby (backend oczekuje int)
        const payload = {
            number: Number(formData.number),
            seats: Number(formData.seats)
        };

        const result = await createRoom(payload);

        if (result.success) {
            // Przekierowanie do listy sal
            router.push('/panel/rooms');
        } else {
            alert(result.error);
            setLoading(false);
        }
    };

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[800px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

                <div className="flex flex-col gap-1">
                    <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                        Dodaj salę kinową
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Zdefiniuj parametry nowej sali (numer i pojemność).
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
                                    placeholder="np. 1, 2, 10..."
                                    type="number"
                                    min="1"
                                    max="100"
                                    required
                                    value={formData.number}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-gray-500">
                                    Unikalny numer identyfikacyjny sali (1-100).
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
                                    placeholder="np. 50, 100, 200..."
                                    type="number"
                                    min="1"
                                    max="500"
                                    required
                                    value={formData.seats}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-gray-500">
                                    Liczba miejsc w sali (system wygeneruje je automatycznie).
                                </p>
                            </div>

                        </div>

                        <div className="h-px bg-gray-800"></div>

                        <div className="flex flex-wrap items-center justify-end gap-3">
                            <button
                                onClick={() => router.back()}
                                className="px-6 h-10 rounded-xl text-sm font-bold text-gray-300 hover:bg-gray-800 transition-colors"
                                type="button"
                                disabled={loading}
                            >
                                Anuluj
                            </button>
                            <button
                                className="flex items-center justify-center gap-2 rounded-xl h-10 px-8 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span>Zapisywanie...</span>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[20px]">check</span>
                                        <span>Zapisz</span>
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