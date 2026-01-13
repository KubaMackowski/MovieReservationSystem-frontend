// types/movie.ts

export interface Genre {
    id: number;
    name: string;
}

export interface Movie {
    id: number;
    title: string;
    description: string;
    status: string;
    relase_Date: string; // JSON zwróci datę jako string (uwaga na literówkę z C#)
    duration: number;
    director: string;
    production: string;
    cast: string;
    genres: string[]; // List<string> z C#
    posterPath: string;
    // Brakuje posterUrl w Twoim DTO, więc obsłużymy to w komponencie
}