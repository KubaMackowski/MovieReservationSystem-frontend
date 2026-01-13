'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createGenre } from '@/app/actions/genre-actions'; // Zmiana akcji na gatunki

export default function AddGenrePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Genre wymaga tylko nazwy
    const [formData, setFormData] = useState({
        name: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Wywołujemy createGenre
        const result = await createGenre(formData);

        if (result.success) {
            // Przekierowanie do listy gatunków
            router.push('/panel/genres');
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
                        Dodaj gatunek
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Utwórz nową kategorię filmową w systemie.
                    </p>
                </div>

                <div className="bg-surface-dark rounded-xl border border-border-dark shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-8">
                        <div className="grid grid-cols-1 gap-6">

                            {/* Pole Nazwa */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="name">
                                    Nazwa gatunku
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="name"
                                    name="name"
                                    placeholder="np. Sci-Fi, Komedia, Dramat"
                                    type="text"
                                    required
                                    minLength={2}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-gray-500">
                                    Nazwa powinna być unikalna i krótka.
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