import { getGenresList, getMoviesList } from '@/app/actions/movie-actions';
import MovieGallery from '@/app/(cinema)/_components/moviegallery';

export default async function Home() {
  // Pobieramy równolegle gatunki i filmy
  const [genres, movies] = await Promise.all([
    getGenresList(),
    getMoviesList()
  ]);

  return (
      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark pb-20">
        {/* ... Tutaj pewnie masz jakiś Hero Section / Slider ... */}

        <div className="max-w-[1200px] w-full mx-auto">
          {/* Przekazujemy dane do komponentu klienckiego */}
          <MovieGallery movies={movies} genres={genres} />
        </div>
      </main>
  );
}