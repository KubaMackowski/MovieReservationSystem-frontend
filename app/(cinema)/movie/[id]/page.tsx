import { api } from "@/lib/api-client"
import MovieView, { Movie } from "@/app/(cinema)/_components/movie-view"
import { notFound } from "next/navigation"
import {getMe} from "@/lib/auth";

async function getUserId() {
    const user = getMe()
    return user.then(u => u?.id || null);
}

interface PageProps {
    params: { id: string }
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const movieData = api.get<Movie>(`/api/movies/${id}`)
    const userIdData = getUserId()

    try {
        const [movie, userId] = await Promise.all([movieData, userIdData])

        if (!movie) {
            return notFound()
        }

        return <MovieView movie={movie} userId={userId} />

    } catch (error) {
        console.error("Error fetching movie:", error)
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4">
                <div className="text-xl text-red-500 font-bold">Błąd ładowania filmu</div>
                <p className="text-text-main/60">Nie można załadować danych</p>
            </div>
        )
    }
}