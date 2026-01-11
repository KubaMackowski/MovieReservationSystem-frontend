'use server';

import { api } from '@/lib/api-client';
import { Genre, Movie } from '@/types/movie';

export async function getGenresList() {
    try {
        // Zakładam, że masz taki endpoint w kontrolerze
        const genres = await api.get<Genre[]>('/api/genres');
        return genres || [];
    } catch (error) {
        console.error('Błąd pobierania gatunków:', error);
        return [];
    }
}

export async function getMoviesList() {
    try {
        const movies = await api.get<Movie[]>('/api/movies');
        return movies || [];
    } catch (error) {
        console.error('Błąd pobierania filmów:', error);
        return [];
    }
}