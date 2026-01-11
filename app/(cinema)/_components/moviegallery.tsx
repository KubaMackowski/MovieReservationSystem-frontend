'use client';

import React, { useState } from 'react';
import { Genre, Movie } from '@/types/movie';

interface MovieGalleryProps {
    movies: Movie[];
    genres: Genre[];
}

export default function MovieGallery({ movies, genres }: MovieGalleryProps) {
    const [selectedGenre, setSelectedGenre] = useState<string>('All');

    // Logika filtrowania
    // Twój MovieDto zwraca listę stringów, np. ["Sci-Fi", "Action"]
    const filteredMovies = selectedGenre === 'All'
        ? movies
        : movies.filter(movie => movie.genres.includes(selectedGenre));

    // Helper do stylów przycisków (zachowujący Twój design)
    const getButtonClass = (isActive: boolean) => {
        const base = "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 text-sm font-medium transition-all cursor-pointer";
        if (isActive) {
            return `${base} neumorphic-inset bg-primary/20 text-primary`;
        }
        return `${base} neumorphic-outset neumorphic-button-hover neumorphic-button-active text-text-main bg-background`;
    };

    return (
        <div className="mt-16">
            <h2 className="text-text-main text-3xl font-bold leading-tight tracking-tight px-4 pb-4 pt-5">
                Now Showing
            </h2>

            {/* Pasek Kategorii */}
            <div className="flex gap-4 p-3 overflow-x-auto no-scrollbar pb-6">
                <button
                    onClick={() => setSelectedGenre('All')}
                    className={getButtonClass(selectedGenre === 'All')}>
                    All
                </button>

                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => setSelectedGenre(genre.name)}
                        className={getButtonClass(selectedGenre === genre.name)}>
                        {genre.name}
                    </button>
                ))}
            </div>

            {/* Grid Filmów */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-8 p-4">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <div key={movie.id} className="flex flex-col gap-3 cursor-pointer group neumorphic-card-hover transition-all">
                            {/* PLAKAT - Używamy placeholdera, bo brak w DTO */}
                            <div
                                className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl neumorphic-outset relative overflow-hidden"
                                style={{
                                    // Generujemy tło z tytułem filmu, skoro nie ma URL w bazie
                                    backgroundImage: `url('https://placehold.co/400x600/1e1b29/FFF?text=${encodeURIComponent(movie.title)}')`
                                }}
                            >
                                {/* Opcjonalnie: Nakładka hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-4xl">play_circle</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-text-main text-base font-bold leading-normal truncate" title={movie.title}>
                                    {movie.title}
                                </p>
                                {/* Wyświetlamy gatunki połączone slashem */}
                                <p className="text-text-main/70 text-sm font-normal leading-normal truncate">
                                    {movie.genres.join(' / ')}
                                </p>
                                <p className="text-text-main/50 text-xs mt-1">
                                    {movie.duration} min
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        <span className="material-symbols-outlined text-4xl mb-2">videocam_off</span>
                        <p>No movies found for category: {selectedGenre}</p>
                    </div>
                )}
            </div>
        </div>
    );
}