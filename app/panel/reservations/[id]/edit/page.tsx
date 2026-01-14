'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getReservationById, updateReservation } from '@/app/actions/reservation-actions';
import { getShowingsList } from '@/app/actions/showing-actions';
import { getRoomById } from '@/app/actions/room-actions'; // Potrzebne do pobrania listy miejsc w sali
import { ShowingDto } from '@/types/showing';
import { Seat } from '@/types/seat'; // Zakładam, że masz typ Seat (id, row, number, isOccupied)

export default function EditReservationPage() {
    const router = useRouter();
    const params = useParams();

    const reservationId = Number(Array.isArray(params.id) ? params.id[0] : params.id);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Dane słownikowe
    const [showings, setShowings] = useState<ShowingDto[]>([]);
    const [availableSeats, setAvailableSeats] = useState<Seat[]>([]);

    const [formData, setFormData] = useState({
        showingId: 0,
        seatId: 0
    });

    // 1. Ładowanie danych początkowych
    useEffect(() => {
        if (!reservationId) return;

        const loadData = async () => {
            try {
                // Pobieramy rezerwację oraz listę wszystkich seansów
                const [reservationData, showingsData] = await Promise.all([
                    getReservationById(reservationId),
                    getShowingsList()
                ]);

                if (!reservationData) {
                    alert('Nie znaleziono rezerwacji');
                    router.push('/panel/reservations');
                    return;
                }

                setShowings(showingsData);

                // Ustawiamy formularz danymi z rezerwacji
                setFormData({
                    showingId: reservationData.showingId,
                    seatId: reservationData.seatId
                });

                // MUSIMY pobrać miejsca dla sali z AKTUALNEGO seansu, żeby wypełnić drugi select
                const currentShowing = showingsData.find(s => s.id === reservationData.showingId);
                if (currentShowing) {
                    await loadSeatsForRoom(currentShowing.room_Id);
                }

                setLoading(false);
            } catch (error) {
                console.error("Błąd ładowania danych:", error);
                router.push('/panel/reservations');
            }
        };

        loadData();
    }, [reservationId, router]);

    // Funkcja pomocnicza do ładowania miejsc
    const loadSeatsForRoom = async (roomId: number) => {
        const roomData = await getRoomById(roomId);
        if (roomData && roomData.seatObjects) {
            setAvailableSeats(roomData.seatObjects);
        } else {
            setAvailableSeats([]);
        }
    };

    // Obsługa zmiany Seansu (wymaga przeładowania listy miejsc)
    const handleShowingChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newShowingId = Number(e.target.value);

        // Znajdź wybrany seans w liście, żeby wyciągnąć RoomId
        const selectedShowing = showings.find(s => s.id === newShowingId);

        setFormData(prev => ({
            ...prev,
            showingId: newShowingId,
            seatId: 0 // Resetujemy miejsce, bo zmieniliśmy salę!
        }));

        if (selectedShowing) {
            // Ładujemy miejsca dla nowej sali
            await loadSeatsForRoom(selectedShowing.room_Id);
        } else {
            setAvailableSeats([]);
        }
    };

    // Obsługa zmiany Miejsca
    const handleSeatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            seatId: Number(e.target.value)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reservationId) return;

        if (formData.seatId === 0) {
            alert("Proszę wybrać miejsce.");
            return;
        }

        setSaving(true);

        const result = await updateReservation(reservationId, {
            showingId: formData.showingId,
            seatId: formData.seatId
        });

        if (result.success) {
            router.push('/panel/reservations');
        } else {
            alert(result.error);
            setSaving(false);
        }
    };

    // Helper do formatowania daty w select
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('pl-PL', {
            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
        });
    };

    if (loading) return <div className="p-10 text-white text-center">Ładowanie danych rezerwacji...</div>;

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[600px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

                <div className="flex flex-col gap-1">
                    <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                        Edytuj rezerwację
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Zmiana seansu lub miejsca dla wybranego użytkownika.
                    </p>
                </div>

                <div className="bg-surface-dark rounded-xl border border-border-dark shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-8">
                        <div className="grid grid-cols-1 gap-6">

                            {/* Wybór Seansu */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="showingId">
                                    Wybierz Seans
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer outline-none"
                                        id="showingId"
                                        name="showingId"
                                        required
                                        value={formData.showingId}
                                        onChange={handleShowingChange}
                                    >
                                        <option value={0} disabled>-- Wybierz seans --</option>
                                        {showings.map(showing => (
                                            <option key={showing.id} value={showing.id}>
                                                {showing.movieTitle} | {formatDate(showing.date)} | Sala {showing.roomNumber}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6f6189] text-[20px] pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                                <p className="text-xs text-yellow-500/80">
                                    Uwaga: Zmiana seansu zresetuje wybór miejsca.
                                </p>
                            </div>

                            {/* Wybór Miejsca */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="seatId">
                                    Wybierz Miejsce
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer outline-none disabled:opacity-50"
                                        id="seatId"
                                        name="seatId"
                                        required
                                        value={formData.seatId}
                                        onChange={handleSeatChange}
                                        disabled={availableSeats.length === 0}
                                    >
                                        <option value={0} disabled>
                                            {availableSeats.length === 0 ? "-- Najpierw wybierz seans --" : "-- Wybierz miejsce --"}
                                        </option>
                                        {availableSeats.map(seat => (
                                            <option
                                                key={seat.id}
                                                value={seat.id}
                                                // Opcjonalnie: można zablokować zajęte miejsca, ale to jest edycja,
                                                // więc aktualnie wybrane miejsce (przez tego usera) też będzie oznaczone jako zajęte.
                                                // W idealnym świecie API powinno zwracać flagę isOccupiedByOtherUser.
                                                // Tutaj pozwalamy wybrać, backend odrzuci jeśli zajęte przez kogoś innego.
                                            >
                                                Rząd {seat.row}, Numer {seat.number} {seat.isOccupied ? "(Zajęte)" : ""}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6f6189] text-[20px] pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div className="h-px bg-gray-800"></div>

                        <div className="flex flex-wrap items-center justify-end gap-3">
                            <button
                                onClick={() => router.back()}
                                className="px-6 h-10 rounded-xl text-sm font-bold text-gray-300 hover:bg-gray-800 transition-colors"
                                type="button"
                                disabled={saving}
                            >
                                Anuluj
                            </button>
                            <button
                                className="flex items-center justify-center gap-2 rounded-xl h-10 px-8 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-md shadow-primary/20 disabled:opacity-50"
                                type="submit"
                                disabled={saving}
                            >
                                {saving ? (
                                    <span>Zapisywanie...</span>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[20px]">save</span>
                                        <span>Zaktualizuj</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}