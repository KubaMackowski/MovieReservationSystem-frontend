// app/actions/reservation-actions.ts
'use server';

import { api } from '@/lib/api-client';
import type { ReservationDto } from '@/types/reservation'; // Upewnij się, że masz ten typ
import { revalidatePath } from 'next/cache';

// Ścieżka do panelu rezerwacji
const REVALIDATE_PATH = '/panel/reservations';

// 1. Pobieranie listy rezerwacji
export async function getReservationsList() {
    try {
        const reservations = await api.get<ReservationDto[]>('/api/reservations');
        return reservations;
    } catch (error) {
        console.error('Nie udało się pobrać rezerwacji w Server Action', error);
        return [];
    }
}

// Typ zgodny z C# CreateReservationDto
interface CreateReservationDto {
    userId: string; // GUID użytkownika (Identity)
    showingId: number;
    seatId: number;
}

// 2. Tworzenie rezerwacji (Admin manualnie przypisuje userowi)
export async function createReservation(data: CreateReservationDto) {
    try {
        await api.post('/api/reservations', data);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd tworzenia rezerwacji:', error);
        return { success: false, error: 'Nie udało się utworzyć rezerwacji. Sprawdź czy miejsce jest wolne.' };
    }
}

// 3. Pobieranie pojedynczej rezerwacji (do edycji)
export async function getReservationById(id: number) {
    try {
        const reservation = await api.get<ReservationDto>(`/api/reservations/${id}`);
        return reservation;
    } catch (error) {
        console.error('Błąd pobierania rezerwacji:', error);
        return null;
    }
}

// Typ zgodny z C# UpdateReservationDto
interface UpdateReservationDto {
    showingId: number;
    seatId: number;
}

// 4. Aktualizacja rezerwacji (zmiana miejsca lub seansu)
export async function updateReservation(id: number, data: UpdateReservationDto) {
    try {
        await api.put(`/api/reservations/${id}`, data);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd aktualizacji rezerwacji:', error);
        return { success: false, error: 'Nie udało się zaktualizować rezerwacji. Miejsce może być zajęte.' };
    }
}

// 5. Usuwanie rezerwacji (Anulowanie)
export async function deleteReservation(id: number) {
    try {
        await api.delete(`/api/reservations/${id}`);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd usuwania rezerwacji:', error);
        return { success: false, error: 'Nie udało się anulować rezerwacji.' };
    }
}