import {Seat} from "@/types/seat";

export interface RoomDto {
    id: number;
    number: number;
    seats: number;
    generatedSeatsCount: number;
    seatObjects: Seat[];
}