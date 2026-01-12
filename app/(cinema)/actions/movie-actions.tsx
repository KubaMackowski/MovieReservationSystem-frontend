"use server"

import { api } from "@/lib/api-client" // Ścieżka do Twojego api-client
import { revalidatePath } from "next/cache"

// Definicja typu payloadu dla rezerwacji
interface ReservationPayload {
    ShowingId: number
    SeatId: number
    UserId: string
}

export async function createReservation(payload: ReservationPayload) {
    try {
        // Używamy Twojego api-client (działa tu, bo to środowisko serwerowe)
        await api.post("/api/reservations", payload)

        // Opcjonalnie: odświeżamy cache dla ścieżki filmów, żeby zaktualizować zajęte miejsca
        revalidatePath("/movies/[id]", "page")

        return { success: true }
    } catch (error: any) {
        console.error("Booking error in Server Action:", error)
        return { success: false, message: error.message || "Failed to create reservation" }
    }
}