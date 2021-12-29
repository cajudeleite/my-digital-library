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
