'use client';

import React, { useState } from 'react';
import Link from "next/link";
import {logoutAction} from "@/app/actions/auth";

// Definicja typu zgodna z Twoim C# DTO
export interface ReservationDto {
    id: number;
    created_At: string;
    userId: string;
    userEmail: string;
    showingId: number;
    movieTitle: string;
    showingDate: string;
    seatId: number;
    seatRow: number;
    seatNumber: number;
}

interface UserReservationsProps {
    reservations: ReservationDto[];
}

export default function UserReservations({ reservations }: UserReservationsProps) {
    const [filter, setFilter] = useState<'upcoming' | 'history'>('upcoming');

    // Helpery do dat
    const isPast = (dateStr: string) => new Date(dateStr) < new Date();

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'long'
        });
    };

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Logika filtrowania
    const filteredReservations = reservations
        .filter(res => filter === 'upcoming' ? !isPast(res.showingDate) : isPast(res.showingDate))
        .sort((a, b) => new Date(a.showingDate).getTime() - new Date(b.showingDate).getTime());

    // Helper do stylów przycisków (identyczny jak w MovieGallery)
    const getButtonClass = (isActive: boolean) => {
        const base = "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 text-sm font-medium transition-all cursor-pointer";
        if (isActive) {
            return `${base} neumorphic-inset bg-primary/20 text-primary`;
        }
        return `${base} neumorphic-outset neumorphic-button-hover neumorphic-button-active text-text-main bg-background`;
    };

    return (
        <div className="mt-16 w-full max-w-5xl mx-auto">
            <div className="flex items-center justify-between px-4 pb-4 pt-5">
                {/* Tytuł po lewej */}
                <h2 className="text-text-main text-3xl font-bold leading-tight tracking-tight">
                    Twoje Rezerwacje
                </h2>

                {/* Przycisk wylogowania po prawej */}
                <form action={logoutAction}>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-dark border border-border-dark hover:bg-red-900/20 hover:border-red-500/30 transition-all group"
                    >
            <span className="material-symbols-outlined text-gray-400 group-hover:text-red-400 text-[20px]">
                logout
            </span>
                        <p className="text-gray-400 group-hover:text-red-400 text-sm font-bold leading-normal">
                            Log Out
                        </p>
                    </button>
                </form>
            </div>


            {/* Pasek Filtrów (Nadchodzące / Historia) */}
            <div className="flex gap-4 p-3 overflow-x-auto no-scrollbar pb-6">
                <button
                    onClick={() => setFilter('upcoming')}
                    className={getButtonClass(filter === 'upcoming')}>
                    Nadchodzące
                </button>
                <button
                    onClick={() => setFilter('history')}
                    className={getButtonClass(filter === 'history')}>
                    Historia
                </button>
            </div>

            {/* Lista Rezerwacji */}
            <div className="flex flex-col gap-4 p-4">
                {filteredReservations.length > 0 ? (
                    filteredReservations.map((res) => (
                        <div
                            key={res.id}
                            className="group flex flex-col md:flex-row items-center gap-6 p-5 rounded-2xl neumorphic-outset bg-background transition-all hover:translate-y-[-2px]"
                        >
                            {/* 1. Data i Godzina (Box po lewej) */}
                            <div className="flex flex-row md:flex-col items-center md:items-start justify-between w-full md:w-auto gap-4 md:gap-1 min-w-[100px] border-b md:border-b-0 md:border-r border-text-main/10 pb-4 md:pb-0 md:pr-6">
                                <span className="text-primary text-2xl font-black leading-none">
                                    {formatTime(res.showingDate)}
                                </span>
                                <span className="text-text-main/60 text-sm font-medium uppercase tracking-wide">
                                    {formatDate(res.showingDate)}
                                </span>
                            </div>

                            {/* 2. Tytuł Filmu */}
                            <div className="flex-1 text-center md:text-left w-full">
                                <h3 className="text-text-main text-xl font-bold truncate">
                                    {res.movieTitle}
                                </h3>
                                <p className="text-text-main/40 text-xs mt-1">
                                    ID Rezerwacji: #{res.id} • Zamówiono: {formatDate(res.created_At)}
                                </p>
                            </div>

                            {/* 3. Miejsce (Szczegóły w jednej linii) */}
                            <div className="flex items-center gap-6 w-full md:w-auto justify-center md:justify-end">
                                <div className="flex flex-col items-center">
                                    <span className="text-text-main/40 text-[10px] uppercase tracking-wider font-bold">Rząd</span>
                                    <span className="text-text-main text-lg font-bold">{res.seatRow}</span>
                                </div>
                                <div className="w-px h-8 bg-text-main/10"></div>
                                <div className="flex flex-col items-center">
                                    <span className="text-text-main/40 text-[10px] uppercase tracking-wider font-bold">Miejsce</span>
                                    <span className="text-primary text-lg font-bold">{res.seatNumber}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-text-main/40 neumorphic-inset rounded-3xl">
                        <span className="material-symbols-outlined text-5xl mb-3">event_busy</span>
                        <p className="font-medium">Brak rezerwacji w tej kategorii.</p>
                        {filter === 'upcoming' && (
                            <Link href="/" className="mt-4 text-primary text-sm font-bold hover:underline">
                                Przejdź do repertuaru
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}