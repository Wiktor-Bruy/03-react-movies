import axios from 'axios';
import { type Movie } from '../types/movie.ts';

interface Config {
  headers: Headers;
}

interface Headers {
  Authorization: string;
}

interface Answer {
  dada: MovArr;
  Status: number;
  StatusText: string;
}

interface MovArr {
  results: Movie[];
}

export default function fetchMovies(query: string) {
  const config: Config = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTkzMjRjZTQ0MDBkZjM0YjgwYzg5OWM4MTRiODA3YSIsIm5iZiI6MTc2Njg0MDQ2MC42Niwic3ViIjoiNjk0ZmQ4OGM2ZGZkODE0MDY3MTU1MjU3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.3JDqMgTFd8aZnX-hJZbXqLjN6LIyG_eXe3RN3QQVu0Q',
    },
  };

  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      config
    )
    .then(res => res.data.results)
    .catch(er => er);
}
