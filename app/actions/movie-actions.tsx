'use server';

import { api } from '@/lib/api-client';
import { Genre, Movie } from '@/types/movie';
import { revalidatePath } from 'next/cache';

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

const REVALIDATE_PATH = '/panel/movies';

// 1. Pobieranie listy filmów
export async function getAdminMoviesList() {
    try {
        const movies = await api.get<Movie[]>('/api/movies');
        return movies;
    } catch (error) {
        console.error('Nie udało się pobrać filmów w Server Action', error);
        return [];
    }
}

// Typ zgodny z C# CreateMovieDto
// Pamiętaj: backend oczekuje genreIds (tablica intów), a nie obiektów gatunków
interface CreateMovieDto {
    title: string;
    description: string;
    status: string;
    relase_Date: string; // Przesyłamy jako ISO String
    duration: number;
    director: string;
    production: string;
    cast: string;
    genreIds: number[]; // Kluczowe pole do relacji
}

// 2. Tworzenie filmu
export async function createMovie(data: CreateMovieDto) {
    try {
        await api.post('/api/movies', data);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd tworzenia filmu:', error);
        return { success: false, error: 'Nie udało się utworzyć filmu.' };
    }
}

// 3. Pobieranie pojedynczego filmu (np. do edycji)
export async function getMovieById(id: number) {
    try {
        const movie = await api.get<Movie>(`/api/movies/${id}`);
        return movie;
    } catch (error) {
        console.error('Błąd pobierania filmu:', error);
        return null;
    }
}

// Typ zgodny z C# UpdateMovieDto
interface UpdateMovieDto {
    title?: string;
    description?: string;
    status?: string;
    relase_Date?: string;
    duration?: number;
    director?: string;
    production?: string;
    cast?: string;
    genreIds?: number[];
}

// 4. Aktualizacja filmu
export async function updateMovie(id: number, data: UpdateMovieDto) {
    try {
        await api.put(`/api/movies/${id}`, data);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd aktualizacji filmu:', error);
        return { success: false, error: 'Nie udało się zaktualizować filmu.' };
    }
}

// 5. Usuwanie filmu
export async function deleteMovie(id: number) {
    try {
        await api.delete(`/api/movies/${id}`);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd usuwania filmu:', error);
        return { success: false, error: 'Nie udało się usunąć filmu. Sprawdź czy nie ma zaplanowanych seansów.' };
    }
}