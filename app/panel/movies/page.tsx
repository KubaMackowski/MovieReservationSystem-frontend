'use client';

import React, { useState, useEffect } from 'react';
import { Movie } from "@/types/movie"; // Twój typ Movie
import { deleteMovie, getAdminMoviesList } from "@/app/actions/movie-actions"; // Twoje akcje
import Link from "next/link";
import Pagination from "@/app/panel/_components/pagination";
import Image from "next/image"; // Do wyświetlania plakatów

export default function MoviesPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    // Stan paginacji
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Mniej elementów na stronę, bo wiersze są wyższe (plakaty)

    const handleDelete = async (id: number) => {
        if (confirm('Czy na pewno chcesz usunąć ten film? Tej operacji nie można cofnąć.')) {
            try {
                const result = await deleteMovie(id);
                if (result.success) {
                    setMovies(prev => prev.filter(m => m.id !== id));
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
        const loadMovies = async () => {
            setLoading(true);
            try {
                const data = await getAdminMoviesList();
                setMovies(data);
            } catch (error) {
                console.error('Błąd w komponencie:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    // Logika cięcia danych
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);

    // Helper do kolorowania statusu
    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'available': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'coming soon': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

                {/* HEADER */}
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                            Filmy
                        </h2>
                        <p className="text-gray-400 text-sm">Zarządzaj repertuarem kina.</p>
                    </div>
                    <Link href="/panel/movies/add" className="flex items-center justify-center gap-2 rounded-xl h-10 px-6 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">movie</span>
                        <span className="truncate">Dodaj film</span>
                    </Link>
                </div>

                {/* TABLE CONTAINER */}
                <div className="flex flex-col flex-1 overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead className="bg-surface-dark-hover border-b border-border-dark">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 w-16">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Film</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Gatunki</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Czas</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Premiera</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 w-32">Akcje</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                            {loading ? (
                                <tr><td colSpan={7} className="text-center py-10 text-gray-400">Ładowanie...</td></tr>
                            ) : (
                                currentMovies.map((movie) => (
                                    <tr key={movie.id} className="hover:bg-surface-dark-hover transition-colors group">

                                        {/* ID */}
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500">#{movie.id}</span>
                                        </td>

                                        {/* FILM (PLAKAT + TYTUŁ) */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-14 relative rounded overflow-hidden bg-gray-800 flex-shrink-0">
                                                    {movie.posterPath ? (
                                                        <img
                                                            src={movie.posterPath}
                                                            alt={movie.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full w-full text-gray-600">
                                                            <span className="material-symbols-outlined text-sm">image_not_supported</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white line-clamp-1">{movie.title}</p>
                                                    <p className="text-xs text-gray-500 line-clamp-1">{movie.director}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* GATUNKI */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {movie.genres && movie.genres.length > 0 ? (
                                                    movie.genres.slice(0, 2).map((g, i) => (
                                                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-700 text-gray-300 border border-gray-600">
                                                                {g}
                                                            </span>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-gray-600">-</span>
                                                )}
                                                {movie.genres && movie.genres.length > 2 && (
                                                    <span className="text-[10px] text-gray-500">+{movie.genres.length - 2}</span>
                                                )}
                                            </div>
                                        </td>

                                        {/* CZAS TRWANIA */}
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-300">{movie.duration} min</span>
                                        </td>

                                        {/* DATA PREMIERY */}
                                        <td className="px-6 py-4">
                                                <span className="text-sm text-gray-300">
                                                    {new Date(movie.relase_Date).toLocaleDateString('pl-PL')}
                                                </span>
                                        </td>

                                        {/* AKCJE */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/panel/movies/${movie.id}/edit`} className="p-2 rounded-lg text-gray-400 hover:bg-primary/20 hover:text-primary-300 transition-colors" title="Edytuj">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </Link>
                                                <button onClick={() => handleDelete(movie.id)} className="p-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors" title="Usuń">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            {!loading && movies.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center py-10 text-gray-500">
                                        Brak filmów w repertuarze.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINACJA */}
                    <Pagination
                        totalItems={movies.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />

                </div>
            </div>
        </main>
    );
}