import SearchBar from '../SearchBar/SearchBar.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';

import fetchMovies from '../../services/movieService.ts';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

import { type Movie } from '../../types/movie.ts';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isMovies, setIsMovies] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  async function findFilms(query: string): Promise<void> {
    setIsLoad(true);
    setIsMovies(false);
    setIsErr(false);
    try {
      const arr: Movie[] = (await fetchMovies(query)) as Movie[];
      if (arr === undefined) {
        setIsLoad(false);
        setIsErr(true);
        return;
      }
      if (arr.length === 0) {
        toast('No movies found for your request.', {
          icon: '😋',
          style: {
            borderRadius: '25px',
            background: '#333',
            color: '#fff',
          },
        });
        setMovies([]);
        setIsLoad(false);
      } else {
        setIsLoad(false);
        setIsMovies(true);
        setMovies(arr);
      }
    } catch {
      setMovies([]);
      setIsErr(true);
      setIsLoad(false);
    }
  }

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={findFilms} />
      {isMovies && <MovieGrid movies={movies} />}
      {isErr && <ErrorMessage />}
      {isLoad && <Loader />}
    </>
  );
}
