export const simplifyMovies = (movies) => (
  movies.map(
    (repo) => ({
      film_id: repo.id,
      title: repo.title,
      overview: repo.overview,
      poster_path: repo.poster_path,
    }),
  )
);
