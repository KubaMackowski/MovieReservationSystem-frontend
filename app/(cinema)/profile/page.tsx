import { api } from "@/lib/api-client"
import MovieView, { Movie } from "@/app/(cinema)/_components/movie-view"
import { notFound } from "next/navigation"
import {getMe} from "@/lib/auth";
import UserReservations, {ReservationDto} from "@/app/(cinema)/_components/reservation-view";

export default async function Page() {
    const reservationData = api.get<ReservationDto[]>(`/api/reservations/my`)

    try {
        const [reservations] = await Promise.all([reservationData])

        if (!reservationData) {
            return notFound()
        }

        return <UserReservations reservations={reservations} />

    } catch (error) {
        console.error("Error fetching movie:", error)
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4">
                <div className="text-xl text-red-500 font-bold">Błąd ładowania rezerwacji</div>
                <p className="text-text-main/60">Nie można załadować danych</p>
            </div>
        )
    }
}