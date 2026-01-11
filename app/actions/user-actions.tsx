// actions/user-actions.ts
'use server';

import { api } from '@/lib/api-client';
import type { UserProfile } from '@/types/user';
import { revalidatePath } from 'next/cache';

export async function getUsersList() {
    // Tutaj używamy naszego serwisu, token doda się sam!
    // Zakładam, że endpoint to /api/users
    try {
        const users = await api.get<UserProfile[]>('/api/users');
        return users;
    } catch (error) {
        console.error('Nie udało się pobrać użytkowników w Server Action', error);
        return []; // Zwracamy pustą tablicę w razie błędu
    }
}

interface CreateUserDto {
    email: string;
    password: string;
    role: string;
}

export async function createUser(data: CreateUserDto) {
    try {
        await api.post('/api/users', data);

        // Odśwież cache dla listy użytkowników
        revalidatePath('/users');

        return { success: true };
    } catch (error) {
        console.error('Błąd tworzenia użytkownika:', error);
        return { success: false, error: 'Nie udało się utworzyć użytkownika' };
    }
}

interface UpdateUserEmailDto {
    email: string;
}

// 2. Pobieranie (bez zmian, potrzebujemy tego do wyświetlenia obecnego maila)
export async function getUserById(id: string | number) {
    console.log(id)
    try {
        const user = await api.get<UserProfile>(`/api/users/${id}`);
        return user;
    } catch (error) {
        console.error('Błąd pobierania użytkownika:', error);
        return null;
    }
}

// 3. Aktualizacja - wysyłamy tylko email
export async function updateUser(id: string | number, data: UpdateUserEmailDto) {
    try {
        await api.put(`/api/users/${id}`, data);
        revalidatePath('/users');
        return { success: true };
    } catch (error) {
        console.error('Błąd aktualizacji maila:', error);
        return { success: false, error: 'Nie udało się zmienić adresu email.' };
    }
}

export async function deleteUser(id: string | number) {
    try {
        await api.delete(`/api/users/${id}`);
        revalidatePath('/users');
        return { success: true };
    } catch (error) {
        console.error('Błąd usuwania:', error);
        return { success: false, error: 'Nie udało się usunąć użytkownika.' };
    }
}