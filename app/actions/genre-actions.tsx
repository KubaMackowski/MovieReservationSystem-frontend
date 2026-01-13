// app/actions/genre-actions.ts
'use server';

import { api } from '@/lib/api-client';
import type { Genre } from '@/types/genre'; // Upewnij się, że masz ten typ (id: number, name: string)
import { revalidatePath } from 'next/cache';

// Ścieżka, którą odświeżamy po zmianach (musi pasować do URL Twojej strony w panelu)
const REVALIDATE_PATH = '/panel/genres';

// 1. Pobieranie listy
export async function getGenresList() {
    try {
        // Zakładam, że endpoint w C# to [HttpGet("api/genres")]
        const genres = await api.get<Genre[]>('/api/genres');
        return genres;
    } catch (error) {
        console.error('Nie udało się pobrać gatunków w Server Action', error);
        return []; // Zwracamy pustą tablicę w razie błędu
    }
}

// Typ zgodny z C# CreateGenreDto
interface CreateGenreDto {
    name: string;
}

// 2. Tworzenie
export async function createGenre(data: CreateGenreDto) {
    try {
        await api.post('/api/genres', data);

        // Odśwież cache dla listy gatunków
        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd tworzenia gatunku:', error);
        return { success: false, error: 'Nie udało się utworzyć gatunku.' };
    }
}

// 3. Pobieranie pojedynczego (do edycji)
export async function getGenreById(id: number) {
    try {
        const genre = await api.get<Genre>(`/api/genres/${id}`);
        return genre;
    } catch (error) {
        console.error('Błąd pobierania gatunku:', error);
        return null;
    }
}

// Typ zgodny z C# UpdateGenreDto
interface UpdateGenreDto {
    name: string;
}

// 4. Aktualizacja
export async function updateGenre(id: number, data: UpdateGenreDto) {
    try {
        await api.put(`/api/genres/${id}`, data);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd aktualizacji gatunku:', error);
        return { success: false, error: 'Nie udało się zaktualizować gatunku.' };
    }
}

// 5. Usuwanie
export async function deleteGenre(id: number) {
    try {
        await api.delete(`/api/genres/${id}`);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd usuwania:', error);
        return { success: false, error: 'Nie udało się usunąć gatunku. Może być przypisany do filmu.' };
    }
}