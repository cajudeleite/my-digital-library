export const simplifyMovies = (movies) => (
  movies.map(
    (repo) => ({
      title: repo.title,
      overview: repo.overview,
      film_id: repo.id,
      poster_path: repo.poster_path,
    }),
  )
);

export const simplifyMyMovies = (movies) => (
  movies.map(
    (movie) => ({
      title: movie.title,
      overview: movie.overview,
      film_id: movie.film_id,
      poster_path: movie.poster_path,
    }),
  )
);
