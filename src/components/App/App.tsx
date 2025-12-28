import SearchBar from '../SearchBar/SearchBar';

import fetchMovies from '../../services/movieService.ts';
import toast, { Toaster } from 'react-hot-toast';

import { type Movie } from '../../types/movie.ts';

export default function App() {
  async function findFilms(query: string): Promise<void> {
    const arr: Movie[] = (await fetchMovies(query)) as Movie[];
    if (arr.length === 0) {
      toast('No movies found for your request.', {
        icon: '😋',
        style: {
          borderRadius: '25px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      console.log(arr);
    }
  }
  return (
    <>
      <Toaster />
      <SearchBar onSubmit={findFilms} />
    </>
  );
}
