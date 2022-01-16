// == Import
import './styles.scss';
import NavBar from '../NavBar';
import SearchBar from '../SearchBar';
import MovieNavBar from '../MovieNavBar';
import MoviesDbList from '../MovieDbList';
import { Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { simplifyMovies, simplifyMyMovies } from '../../utils/movies';
import axios from 'axios';
import MoreResults from '../MoreResults';

// == Composant
const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nbResults, setNbResults] = useState(0);
  const [movies, setMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    axios.get('https://v1-my-digital-library-api.herokuapp.com/films')
      .then(
        (response) => {
          const moviesFromApi = response.data;
          const formatedMoviesFromApi = simplifyMyMovies(moviesFromApi);
          setAllMovies(formatedMoviesFromApi);
        },
      ).catch(
        () => {
          console.log('Une erreur est survenue...', true);
          setAllMovies([]);
        },
      );
  });

  const search = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a5b6184c80781706fbb134c3a33bf034&language=fr-FR&query=${searchValue}&page=${page}`).then( // avec the, on définit le traiement à réaliser si la promesse est tenue
      (response) => {
        const moviesFromDb = response.data.results;
        const nbResultsFromDb = response.data.total_results;
        setTotalPages(response.data.total_pages);
        setNbResults(nbResultsFromDb);
        const formatedMoviesFromDb = simplifyMovies(moviesFromDb);
        setMovies(formatedMoviesFromDb);
        console.log(`La recherche a retourné ${nbResultsFromDb} résultats`);
      },
    ).catch(
      () => {
        console.log('Une erreur est survenue...', true);

        setMovies([]);
        setTotalPages(1);
        setPage(null);
        setNbResults(0);
      },
    );
  };

  const searchMore = (page) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setPage(page);

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a5b6184c80781706fbb134c3a33bf034&language=fr-FR&query=${searchValue}&page=${page}`).then(
      (response) => {
        const moviesFromDb = response.data.results;
        const formatedMoviesFromDb = simplifyMovies(moviesFromDb);
        setMovies(formatedMoviesFromDb);
      },
    ).catch(
      () => {
        console.log('Une erreur est survenue...', true);

        setRepos([]);
        setTotalPages(1);
        setPage(null);
        setNbResults(0);

        setIsLoading(false);
      },
    );
  };

  const searchMyMovies = (event) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    axios.get('https://v1-my-digital-library-api.herokuapp.com/films')
    .then(
      (response) => {
        const moviesFromApi = response.data;
        const formatedMoviesFromApi = simplifyMyMovies(moviesFromApi);
        const searchedMovies = [];
        formatedMoviesFromApi.map(
          (movie) => {
            const movieTitle = movie.title.toLowerCase();
            if (movieTitle.includes(searchValue.toLowerCase())) {
              searchedMovies.push({
                title: movie.title,
                overview: movie.overview,
                film_id: movie.film_id,
                poster_path: movie.poster_path,
                true_id: movie.true_id,
              })
            }
          }
        );
        setMyMovies(searchedMovies);
      },
    ).catch(
      () => {
        console.log('Une erreur est survenue...', true);
        setMyMovies([]);
      },
    );
  };

  return (
    <main className="app">
      <NavBar />

      <Switch>
        <Route path='/' exact>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            submit={search}
            setMovies={setMovies}
            setTotalPages={setTotalPages}
          />
          <MovieNavBar current={1}/>
          <MoviesDbList movies={movies} my={false} method={search}/>
          {totalPages > 1 && <MoreResults pages={totalPages} page={page} method={searchMore} />}
        </Route>
        <Route path='/mymovielist' exact>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            submit={searchMyMovies}
            setMovies={setMyMovies}
          />
          <MovieNavBar current={2} />
          <MoviesDbList movies={myMovies} my={true} method={searchMyMovies}/>
        </Route>
      </Switch>
    </main>
  );
};

// == Export
export default App;
