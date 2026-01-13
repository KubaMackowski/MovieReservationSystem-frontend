'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createMovie } from '@/app/actions/movie-actions';
import { getGenresList } from '@/app/actions/genre-actions';
import { Genre } from '@/types/genre';

export default function AddMoviePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Stan dla dostępnych gatunków pobranych z API
    const [availableGenres, setAvailableGenres] = useState<Genre[]>([]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Available',
        relase_Date: '',
        duration: 120,
        director: '',
        production: '',
        cast: '',
        posterPath: '',
        genreIds: [] as number[]
    });

    // Pobierz gatunki przy starcie komponentu
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genres = await getGenresList();
                setAvailableGenres(genres || []);
            } catch (err) {
                console.error("Failed to fetch genres", err);
            }
        };
        fetchGenres();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    // Obsługa zaznaczania gatunków (Multi-select)
    const toggleGenre = (genreId: number) => {
        setFormData(prev => {
            const isSelected = prev.genreIds.includes(genreId);
            if (isSelected) {
                return { ...prev, genreIds: prev.genreIds.filter(id => id !== genreId) };
            } else {
                return { ...prev, genreIds: [...prev.genreIds, genreId] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            // Formatowanie daty na ISO
            relase_Date: formData.relase_Date ? new Date(formData.relase_Date).toISOString() : new Date().toISOString()
        };

        const result = await createMovie(payload);

        if (result.success) {
            router.push('/panel/movies');
        } else {
            alert(result.error);
            setLoading(false);
        }
    };

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[1000px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

                <div className="flex flex-col gap-1">
                    <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                        Dodaj film
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Wprowadź szczegóły nowego filmu do repertuaru.
                    </p>
                </div>

                <div className="bg-surface-dark rounded-xl border border-border-dark shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-8">

                        {/* SEKCJA 1: PODSTAWOWE INFORMACJE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Tytuł */}
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="title">
                                    Tytuł filmu
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="title"
                                    name="title"
                                    placeholder="np. Diuna: Część Druga"
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Reżyser */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="director">
                                    Reżyser
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="director"
                                    name="director"
                                    placeholder="np. Denis Villeneuve"
                                    type="text"
                                    required
                                    value={formData.director}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Produkcja */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="production">
                                    Produkcja
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="production"
                                    name="production"
                                    placeholder="np. Warner Bros."
                                    type="text"
                                    required
                                    value={formData.production}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Data premiery */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="relase_Date">
                                    Data premiery
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none [color-scheme:dark]"
                                    id="relase_Date"
                                    name="relase_Date"
                                    type="date"
                                    required
                                    value={formData.relase_Date}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Czas trwania (min) */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="duration">
                                    Czas trwania (minuty)
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="duration"
                                    name="duration"
                                    type="number"
                                    min="1"
                                    required
                                    value={formData.duration}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Status */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="status">
                                    Status
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer outline-none"
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Available">Dostępny (Available)</option>
                                        <option value="Coming Soon">Wkrótce (Coming Soon)</option>
                                        <option value="Archived">Zarchiwizowany</option>
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6f6189] text-[20px] pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="director">
                                    Url do zdjęcia
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="posterPath"
                                    name="posterPath"
                                    type="text"
                                    required
                                    value={formData.posterPath}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* SEKCJA 2: SZCZEGÓŁY I GATUNKI */}
                        <div className="grid grid-cols-1 gap-6">

                            {/* Gatunki - Multi-Select */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200">
                                    Gatunki
                                </label>
                                <div className="flex flex-wrap gap-2 p-4 bg-[#2a2636] rounded-lg border border-transparent hover:border-[#6f6189]/50 transition-colors">
                                    {availableGenres.length > 0 ? availableGenres.map(genre => {
                                        const isSelected = formData.genreIds.includes(genre.id);
                                        return (
                                            <button
                                                key={genre.id}
                                                type="button"
                                                onClick={() => toggleGenre(genre.id)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                                                    isSelected
                                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                                        : 'bg-gray-700/50 text-gray-400 border-gray-600 hover:bg-gray-600'
                                                }`}
                                            >
                                                {genre.name}
                                            </button>
                                        );
                                    }) : (
                                        <p className="text-xs text-gray-500 italic">Brak gatunków. Dodaj je najpierw w zakładce Gatunki.</p>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500">Kliknij, aby wybrać wiele.</p>
                            </div>

                            {/* Opis */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="description">
                                    Opis filmu
                                </label>
                                <textarea
                                    className="w-full p-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none min-h-[120px] resize-y"
                                    id="description"
                                    name="description"
                                    placeholder="Krótki opis fabuły..."
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Obsada */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="cast">
                                    Obsada
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="cast"
                                    name="cast"
                                    placeholder="np. Timothée Chalamet, Zendaya, Rebecca Ferguson"
                                    type="text"
                                    required
                                    value={formData.cast}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="h-px bg-gray-800 my-2"></div>

                        {/* PRZYCISKI AKCJI */}
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