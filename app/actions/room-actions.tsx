// app/actions/room-actions.ts
'use server';

import { api } from '@/lib/api-client';
import type { RoomDto } from '@/types/room'; // Upewnij się, że masz ten typ (id, number, seats, generatedSeatsCount)
import { revalidatePath } from 'next/cache';

// Ścieżka do panelu sal (odświeżamy ją po zmianach)
const REVALIDATE_PATH = '/panel/rooms';

// 1. Pobieranie listy sal
export async function getRoomsList() {
    try {
        const rooms = await api.get<RoomDto[]>('/api/rooms');
        return rooms;
    } catch (error) {
        console.error('Nie udało się pobrać sal w Server Action', error);
        return [];
    }
}

// Typ zgodny z C# CreateRoomDto
interface CreateRoomDto {
    number: number;
    seats: number;
}

// 2. Tworzenie sali
export async function createRoom(data: CreateRoomDto) {
    try {
        await api.post('/api/rooms', data);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd tworzenia sali:', error);
        return { success: false, error: 'Nie udało się utworzyć sali.' };
    }
}

// 3. Pobieranie pojedynczej sali (do edycji)
export async function getRoomById(id: number) {
    try {
        const room = await api.get<RoomDto>(`/api/rooms/${id}`);
        return room;
    } catch (error) {
        console.error('Błąd pobierania sali:', error);
        return null;
    }
}

// Typ zgodny z C# UpdateRoomDto
interface UpdateRoomDto {
    number: number;
    seats: number;
}

// 4. Aktualizacja sali
export async function updateRoom(id: number, data: UpdateRoomDto) {
    try {
        await api.put(`/api/rooms/${id}`, data);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd aktualizacji sali:', error);
        return { success: false, error: 'Nie udało się zaktualizować sali.' };
    }
}

// 5. Usuwanie sali
export async function deleteRoom(id: number) {
    try {
        await api.delete(`/api/rooms/${id}`);

        revalidatePath(REVALIDATE_PATH);

        return { success: true };
    } catch (error) {
        console.error('Błąd usuwania sali:', error);
        return { success: false, error: 'Nie udało się usunąć sali. Sprawdź czy nie ma przypisanych seansów.' };
    }
}