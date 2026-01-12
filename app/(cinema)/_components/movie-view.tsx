"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createReservation } from "@/app/(cinema)/actions/movie-actions"


interface MovieGenre {
    genre_Id: number
    movie_Id: number
    genre: { id: number; name: string }
}

interface Price {
    id: number
    priceValue: number
}

interface Seat {
    id: number
    row: number
    number: number
    // TERAZ TO PRZYCHODZI Z BACKENDU!
    isOccupied: boolean
}

interface Reservation {
    id: number
    seat_Id: number
    showing_Id: number
}

interface Room {
    id: number
    number: number
    seats: Seat[]
}

export interface Showing {
    id: number
    movie_Id: number
    date: string
    end_Date: string
    room_Id: number
    price: number
    room: Room
}

export interface Movie {
    id: number
    title: string
    description: string
    status: string
    duration: number
    cast: string
    director: string
    poster?: { url: string }
    movieGenres: MovieGenre[]
    showings: Showing[]
}

interface MovieViewProps {
    movie: Movie
    userId: string | null
}

export default function MovieView({ movie, userId }: MovieViewProps) {
    const router = useRouter()

    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [selectedShowing, setSelectedShowing] = useState<Showing | null>(null)
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null)
    const [isBooking, setIsBooking] = useState(false)

    // --- HELPERS ---
    const uniqueDates = movie.showings
        ? Array.from(new Set(movie.showings.map((s) => s.date.split("T")[0]))).sort()
        : []

    const filteredShowings = selectedDate
        ? movie.showings
            .filter((s) => s.date.startsWith(selectedDate))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        : []

    const currentPrice = selectedShowing?.price || 0

    const getSeatsGrid = () => {
        if (!selectedShowing || !selectedShowing.room || !selectedShowing.room.seats) {
            return <div className="text-red-400 p-4">Brak wolnych miejsc</div>
        }

        const sortedSeats = [...selectedShowing.room.seats].sort((a, b) =>
            a.row === b.row ? a.number - b.number : a.row - b.row
        )

        const rowsMap = new Map<number, Seat[]>()
        sortedSeats.forEach((seat) => {
            if (!rowsMap.has(seat.row)) rowsMap.set(seat.row, [])
            rowsMap.get(seat.row)?.push(seat)
        })

        return Array.from(rowsMap.keys()).map((rowNum) => (
            <div key={rowNum} className="flex justify-center gap-2 mb-2">
                <span className="flex items-center justify-center w-6 text-xs text-gray-400 font-mono">{rowNum}</span>

                {rowsMap.get(rowNum)?.map((seat) => {
                    const isOccupied = seat.isOccupied
                    const isSelected = selectedSeat?.id === seat.id

                    let seatClass = "seat-available neumorphic-button hover:bg-primary/20"

                    if (isOccupied) {
                        seatClass = "seat-occupied cursor-not-allowed bg-red-500/20 text-red-500 border-red-500/20 opacity-50"
                    } else if (isSelected) {
                        seatClass = "seat-selected bg-primary text-white font-bold shadow-inner scale-110"
                    }

                    return (
                        <button
                            key={seat.id}
                            disabled={isOccupied}
                            onClick={() => setSelectedSeat(seat)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs flex items-center justify-center transition-all duration-200 ${seatClass}`}
                            title={`Row: ${seat.row}, Seat: ${seat.number}`}
                        >
                            <span className="text-[10px] opacity-70">{seat.number}</span>
                        </button>
                    )
                })}
            </div>
        ))
    }

    const handleBooking = async () => {
        if (!selectedShowing || !selectedSeat) return
        setIsBooking(true)
        if (!userId) {
            alert("Zaloguj się, aby złożyć rezerwację")
            router.push("/login")
            return 0;
        }

        const payload = {
            ShowingId: selectedShowing.id,
            SeatId: selectedSeat.id,
            UserId: userId
        }

        try {
            const result = await createReservation(payload)

            if (!result.success) {
                throw new Error(result.message)
            }

            alert("Złożono rezerwację pomyślnie!")
            router.push("/profile")
            router.refresh()

        } catch (err: any) {
            console.error("Booking failed:", err)
            alert(`Error: ${err.message}`)
        } finally {
            setIsBooking(false)
        }
    }

    return (
        <main className="w-full max-w-7xl px-4 md:px-8 py-10 mx-auto">
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden neumorphic-outset mb-12">
                <div
                    className="absolute inset-0 bg-cover bg-center movie-backdrop opacity-40 transition-all duration-700"
                    style={{
                        backgroundImage: movie.poster ? `url(${movie.poster.url})` : "none",
                        filter: "blur(20px)",
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-end w-full">
                    <div
                        className="w-48 h-72 rounded-xl neumorphic-outset bg-center bg-cover flex-shrink-0 hidden md:block shadow-2xl"
                        style={{
                            backgroundImage: movie.poster ? `url(${movie.poster.url})` : "none",
                            backgroundColor: "#333",
                        }}
                    ></div>

                    <div className="flex-1 z-10">
                        <div className="flex items-center gap-3 mb-4">
                            {movie.movieGenres?.map((mg) => (
                                <span
                                    key={mg.genre_Id}
                                    className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-lg border border-primary/20"
                                >
                                    {mg.genre?.name || "Genre"}
                                </span>
                            ))}
                            <span className="px-3 py-1 bg-text-main/10 text-text-main text-xs font-bold rounded-lg">
                                {movie.duration} min
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 text-foreground drop-shadow-lg">
                            {movie.title}
                        </h1>
                        <p className="text-foreground/90 text-lg max-w-2xl leading-relaxed drop-shadow-md">
                            {movie.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 flex flex-col gap-10">
                    <section>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">today</span> Wybierz datę
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {uniqueDates.length > 0 ? (
                                uniqueDates.map((date) => (
                                    <button
                                        key={date}
                                        onClick={() => {
                                            setSelectedDate(date)
                                            setSelectedShowing(null)
                                            setSelectedSeat(null)
                                        }}
                                        className={`px-6 py-3 rounded-xl transition-all ${
                                            selectedDate === date
                                                ? "neumorphic-inset bg-primary/10 text-primary font-bold border border-primary/20 scale-95"
                                                : "neumorphic-button hover:text-primary hover:scale-105"
                                        }`}
                                    >
                                        {new Date(date).toLocaleDateString("pl-PL")}
                                    </button>
                                ))
                            ) : (
                                <p className="text-text-main/40 italic">Brak dostępnych seansów</p>
                            )}
                        </div>
                    </section>

                    {selectedDate && (
                        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">schedule</span> Wybierz godzinę
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {filteredShowings.map((showing) => {
                                    const time = new Date(showing.date).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                    return (
                                        <button
                                            key={showing.id}
                                            onClick={() => {
                                                setSelectedShowing(showing)
                                                setSelectedSeat(null)
                                            }}
                                            className={`px-6 py-3 rounded-xl transition-all ${
                                                selectedShowing?.id === showing.id
                                                    ? "neumorphic-inset bg-primary/10 text-primary font-bold border border-primary/20 scale-95"
                                                    : "neumorphic-button hover:text-primary hover:scale-105"
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    )
                                })}
                            </div>
                        </section>
                    )}

                    {selectedShowing && (
                        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">event_seat</span> Wybierz miejsce
                            </h3>
                            <div className="flex flex-col items-center p-8 rounded-3xl neumorphic-inset bg-background/50">
                                <div className="w-full max-w-md h-1.5 bg-primary rounded-full mb-16 relative neumorphic-outset shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]">
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-bold">
                                        Ekran
                                    </span>
                                </div>

                                <div className="mb-10 w-full overflow-x-auto">
                                    {getSeatsGrid()}
                                </div>

                                <div className="flex gap-6 text-sm flex-wrap justify-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-gray-200 neumorphic-button"></div>
                                        <span className="text-foreground/60">Dostępne</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/50"></div>
                                        <span className="text-foreground/60">Zajęte</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-primary"></div>
                                        <span className="text-foreground/60">Wybrane</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                {/* PODSUMOWANIE */}
                <div className="flex flex-col gap-6">
                    <div className="p-8 rounded-3xl neumorphic-outset bg-background/50 h-fit sticky top-32 transition-all duration-300">
                        <h3 className="text-xl font-bold mb-6">Podsumowanie rezerwacji</h3>

                        {!selectedShowing ? (
                            <div className="flex flex-col items-center justify-center py-10 text-foreground/40">
                                <span className="material-symbols-outlined text-4xl mb-2">calendar_clock</span>
                                <p className="text-sm">Wybierz datę i godzinę rezerwacji</p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center py-3 border-b border-foreground/10">
                                        <span className="text-foreground/60">Film</span>
                                        <span className="font-bold text-right truncate max-w-[150px]">{movie.title}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-foreground/10">
                                        <span className="text-foreground/60">Data i godzina</span>
                                        <div className="text-right">
                                            <span className="font-bold block">
                                                {new Date(selectedShowing.date).toLocaleDateString()}
                                            </span>
                                            <span className="text-sm text-foreground/60">
                                                {new Date(selectedShowing.date).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-foreground/10">
                                        <span className="text-foreground/60">Wybrane miejsce</span>
                                        <span className="font-bold text-primary">
                                            {selectedSeat ? `R:${selectedSeat.row} / N:${selectedSeat.number}` : "-"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4">
                                        <span className="text-lg font-bold">Cena</span>
                                        <span className="text-2xl font-black text-primary">
                                            ${selectedSeat ? currentPrice.toFixed(2) : "0.00"}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBooking}
                                    disabled={!selectedSeat || isBooking}
                                    className={`w-full py-4 rounded-xl font-black text-lg shadow-lg transition-all flex items-center justify-center gap-2
                                        ${!selectedSeat || isBooking
                                        ? "bg-gray-400 cursor-not-allowed opacity-50 grayscale"
                                        : "bg-primary text-background hover:scale-[1.02] active:scale-[0.98] hover:shadow-primary/50"
                                    }`}
                                >
                                    {isBooking ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Przetwarzanie...
                                        </>
                                    ) : (
                                        "Zarezerwuj bilet"
                                    )}
                                </button>
                            </>
                        )}

                        <div className="mt-6 flex items-center gap-2 justify-center text-foreground/40 text-xs">
                            <span className="material-symbols-outlined !text-sm">verified_user</span>
                            Secure payment processed by CineSoft
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}