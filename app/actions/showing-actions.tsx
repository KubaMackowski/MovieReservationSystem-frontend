// app/actions/showing-actions.ts
'use server';

import { api } from '@/lib/api-client';
import type { ShowingDto } from '@/types/showing'; // Upewnij się, że masz ten typ (z poprzedniego kroku)
import { revalidatePath } from 'next/cache';

// Ścieżka do panelu seansów
const REVALIDATE_PATH = '/panel/showings';

// 1. Pobieranie listy seansów
export async function getShowingsList() {
    try {
        const showings = await api.get<ShowingDto[]>('/api/showings');
        return showings;
    } catch (error) {
        console.error('Nie udało się pobrać seansów w Server Action', error);
        return [];
    }
}

// Typ zgodny z C# CreateShowingDto
interface CreateShowingDto {
    movie_Id: number;
    room_Id: number;
    date: string; // Data w formacie ISO string
}

// 2. Tworzenie seansu
export async function createShowing(data: CreateShowingDto) {
    try {
        await api.post('/api/showings', data);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd tworzenia seansu:', error);
        return { success: false, error: 'Nie udało się utworzyć seansu. Sprawdź czy sala nie jest zajęta w tym terminie.' };
    }
}

// 3. Pobieranie pojedynczego seansu (do edycji)
export async function getShowingById(id: number) {
    try {
        const showing = await api.get<ShowingDto>(`/api/showings/${id}`);
        return showing;
    } catch (error) {
        console.error('Błąd pobierania seansu:', error);
        return null;
    }
}

// Typ zgodny z C# UpdateShowingDto
interface UpdateShowingDto {
    movie_Id: number;
    room_Id: number;
    date: string;
}

// 4. Aktualizacja seansu
export async function updateShowing(id: number, data: UpdateShowingDto) {
    try {
        await api.put(`/api/showings/${id}`, data);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd aktualizacji seansu:', error);
        return { success: false, error: 'Nie udało się zaktualizować seansu.' };
    }
}

// 5. Usuwanie seansu
export async function deleteShowing(id: number) {
    try {
        await api.delete(`/api/showings/${id}`);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd usuwania seansu:', error);
        return { success: false, error: 'Nie udało się usunąć seansu. Może posiadać aktywne rezerwacje.' };
    }
}