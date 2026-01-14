'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createShowing } from '@/app/actions/showing-actions';
import { getMoviesList } from '@/app/actions/movie-actions';
import { getRoomsList } from '@/app/actions/room-actions';
import { Movie } from '@/types/movie';
import { RoomDto } from '@/types/room';

export default function AddShowingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Stany dla list wyboru (dropdownów)
    const [movies, setMovies] = useState<Movie[]>([]);
    const [rooms, setRooms] = useState<RoomDto[]>([]);

    // Stan formularza
    const [formData, setFormData] = useState({
        movie_Id: 0,
        room_Id: 0,
        date: '',
        price: 25.00 // Domyślna cena
    });

    // Pobieramy dane do selectów przy starcie
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [moviesData, roomsData] = await Promise.all([
                    getMoviesList(),
                    getRoomsList()
                ]);
                setMovies(moviesData);
                setRooms(roomsData);
            } catch (error) {
                console.error("Błąd pobierania danych słownikowych:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // Sprawdzamy czy pole jest liczbowe (ID lub Cena)
        const isNumberField = name === 'movie_Id' || name === 'room_Id' || name === 'price';

        setFormData({
            ...formData,
            [name]: isNumberField ? Number(value) : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Walidacja czy wybrano film i salę
        if (formData.movie_Id === 0 || formData.room_Id === 0) {
            alert("Proszę wybrać film i salę.");
            setLoading(false);
            return;
        }

        // Przygotowanie payloadu
        const payload = {
            movie_Id: formData.movie_Id,
            room_Id: formData.room_Id,
            date: new Date(formData.date).toISOString(),
            price: formData.price // Wysyłamy cenę
        };

        const result = await createShowing(payload);

        if (result.success) {
            router.push('/panel/showings');
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
                        Zaplanuj seans
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Wybierz film, salę, datę oraz ustal cenę biletu.
                    </p>
                </div>

                <div className="bg-surface-dark rounded-xl border border-border-dark shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-8">
                        <div className="grid grid-cols-1 gap-6">

                            {/* Wybór Filmu */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="movie_Id">
                                    Film
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer outline-none"
                                        id="movie_Id"
                                        name="movie_Id"
                                        required
                                        value={formData.movie_Id}
                                        onChange={handleChange}
                                    >
                                        <option value={0} disabled>-- Wybierz film --</option>
                                        {movies.map(movie => (
                                            <option key={movie.id} value={movie.id}>
                                                {movie.title} ({movie.duration} min)
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6f6189] text-[20px] pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                            </div>

                            {/* Wybór Sali */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="room_Id">
                                    Sala kinowa
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer outline-none"
                                        id="room_Id"
                                        name="room_Id"
                                        required
                                        value={formData.room_Id}
                                        onChange={handleChange}
                                    >
                                        <option value={0} disabled>-- Wybierz salę --</option>
                                        {rooms.map(room => (
                                            <option key={room.id} value={room.id}>
                                                Sala {room.number} (Miejsc: {room.seats})
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6f6189] text-[20px] pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                            </div>

                            {/* Data i Godzina */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="date">
                                    Data i godzina rozpoczęcia
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none [color-scheme:dark]"
                                    id="date"
                                    name="date"
                                    type="datetime-local"
                                    required
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-gray-500">
                                    Godzina zakończenia zostanie obliczona automatycznie.
                                </p>
                            </div>

                            {/* Cena biletu */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="price">
                                    Cena biletu (PLN)
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    required
                                    value={formData.price}
                                    onChange={handleChange}
                                />
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