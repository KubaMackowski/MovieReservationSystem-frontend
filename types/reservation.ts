export interface ReservationDto {
    id: number;
    created_At: string; // ISO String
    userId: string;
    userEmail: string;
    showingId: number;
    movieTitle: string;
    showingDate: string; // ISO String
    seatId: number;
    seatRow: number;
    seatNumber: number;
}