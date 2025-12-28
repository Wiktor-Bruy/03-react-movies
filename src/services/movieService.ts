import axios from 'axios';
import { type Movie } from '../types/movie.ts';

interface Config {
  headers: Headers;
}

interface Headers {
  Authorization: string;
}

interface Answer {
  data: MovArr;
  Status: number;
  StatusText: string;
}

interface MovArr {
  results: Movie[];
}

export default async function fetchMovies(
  query: string
): Promise<Movie[] | unknown> {
  const token: string = import.meta.env.VITE_TMDB_TOKEN;

  const config: Config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res: Answer = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      config
    );

    return res.data.results;
  } catch (er) {
    return er;
  }
}
