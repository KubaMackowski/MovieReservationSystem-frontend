// lib/api-client.ts
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

type FetchOptions = RequestInit & {
    headers?: Record<string, string>;
};

// Funkcja pomocnicza do pobierania nagłówków z tokenem
async function getAuthHeaders() {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}

// Główna funkcja fetchująca
async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const authHeaders = await getAuthHeaders();

    const config = {
        ...options,
        headers: {
            ...authHeaders,
            ...options.headers, // Pozwala nadpisać nagłówki w razie potrzeby
        },
    };
    console.log(options)

    // Usuwamy slash na początku endpointu, jeśli jest, żeby uniknąć podwójnego //
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    try {
        const res = await fetch(`${BACKEND_URL}${cleanEndpoint}`, config);

        // Obsługa błędów HTTP
        if (!res.ok) {
            // Jeśli 401 (Unauthorized), można tu dodać logikę wylogowania
            if (res.status === 401) {
                console.warn('Token wygasł lub jest nieprawidłowy');
            }
            console.log(cleanEndpoint)
            throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }

        // Jeśli odpowiedź nie ma treści (np. 204 No Content), zwróć null
        if (res.status === 204) {
            return null as T;
        }

        return await res.json();
    } catch (error) {
        console.error(`Błąd zapytania do ${cleanEndpoint}:`, error);
        throw error;
    }
}

// Eksportujemy gotowe metody HTTP
export const api = {
    get: <T>(url: string, options?: FetchOptions) => fetchAPI<T>(url, { ...options, method: 'GET' }),
    post: <T>(url: string, body: any, options?: FetchOptions) => fetchAPI<T>(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
    put: <T>(url: string, body: any, options?: FetchOptions) => fetchAPI<T>(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(url: string, options?: FetchOptions) => fetchAPI<T>(url, { ...options, method: 'DELETE' }),
};