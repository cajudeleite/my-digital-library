// == Import
import './styles.scss';
import NavBar from '../NavBar';
import SearchBar from '../SearchBar';
import MovieNavBar from '../MovieNavBar';
import MoviesDbList from '../MovieDbList';
import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import { simplifyMovies, simplifyMyMovies } from '../../utils/movies';
import axios from 'axios';
import MoreResults from '../MoreResults';

// == Composant
const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [nbResults, setNbResults] = useState(0);
  const [movies, setMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [reverse, setReverse] = useState(false);
  const [placeholder, setPlaceholder] = useState('Ajouter un nouveau film à la bibliothèque');
  const [myPlaceholder, setMyPlaceholder] = useState('Chercher un film dans la bibliothèque');

  const search = (event) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    event.preventDefault();
    if (searchValue === '' && !reverse) {
      setReverse(false);
      setPlaceholder('Veuillez saisir un titre de film');
    } else if (searchValue !== '' && reverse) {
      setReverse(false);
      setPlaceholder('Ajouter un nouveau film à la bibliothèque');
      setSearchValue('');
      setMovies([]);
      setTotalPages(1);
    } else {
      setReverse(true);
      setPlaceholder('Ajouter un nouveau film à la bibliothèque');

      // on se rappelle de la dernière page demandée
      setPage(1);

      // on réinitialise le nombre de résultats total
      setNbResults(0);

      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a5b6184c80781706fbb134c3a33bf034&language=fr-FR&query=${searchValue}&page=${page}`).then( // avec the, on définit le traiement à réaliser si la promesse est tenue
        (response) => {
          // on récupère le tableau de films dans la réponse
          const moviesFromDb = response.data.results;
          // et le nombre de résultats
          const nbResultsFromDb = response.data.total_results;
          setTotalPages(response.data.total_pages);

          // on mémomorise le nombre de résultat dans la variable d'état
          setNbResults(nbResultsFromDb);

          // on formatte notre tableau de films
          const formatedMoviesFromDb = simplifyMovies(moviesFromDb);
          // on les range dans la variable d'état "movies"
          setMovies(formatedMoviesFromDb);
          // je vais indiquer à l'utilisateur le nombre de repos retournés grâce à un message
          console.log(`La recherche a retourné ${nbResultsFromDb} résultats`);
        },
      ).catch( // on définit le traitement à réaliser quand la promesse n'est pas tenue
        () => {
          console.log('Une erreur est survenue...', true);

          setMovies([]);
          setTotalPages(1);
          setPage(null);
          setNbResults(0);
        },
      );
    }
  };

  const searchMore = (page) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setPage(page);

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a5b6184c80781706fbb134c3a33bf034&language=fr-FR&query=${searchValue}&page=${page}`).then(
      (response) => {
        const moviesFromDb = response.data.results;

        const formatedMoviesFromDb = simplifyMovies(moviesFromDb);

        // ma liste de films est maitenant cette nouvelle liste
        setMovies(formatedMoviesFromDb);
      },
    ).catch( // on définit le traitement à réaliser quand la promesse n'est pas tenue
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
    event.preventDefault();
    if (searchValue === '' && !reverse) {
      setReverse(false);
      setMyPlaceholder('Veuillez saisir un titre de film');
    } else if (searchValue !== '' && reverse) {
      setReverse(false);
      setMyPlaceholder('Chercher un film dans la bibliothèque');
      setSearchValue('');
      setMovies([]);
    } else {
      setReverse(true);
      setMyPlaceholder('Chercher un film dans la bibliothèque');;

      axios.get('https://v1-my-digital-library-api.herokuapp.com/films', {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        },
        responseType: "json",
      })
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

          // on les range dans la variable d'état "movies"
          setMyMovies(searchedMovies);
        },
      ).catch( // on définit le traitement à réaliser quand la promesse n'est pas tenue
        () => {
          console.log('Une erreur est survenue...', true);
          setMyMovies([]);
        },
      );
    }
  };

  return (
    <main className="app">
      <NavBar />

      <Switch>
        <Route path='/' exact>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            method={search}
            setMovies={setMovies}
            reverse={reverse}
            setReverse={setReverse}
            placeholder={placeholder}
          />
          <MovieNavBar current={1}/>
          <MoviesDbList movies={movies} my={false}/>
          {totalPages > 1 && <MoreResults pages={totalPages} page={page} method={searchMore} />}
        </Route>
        <Route path='/mymovielist' exact>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            method={searchMyMovies}
            setMovies={setMyMovies}
            reverse={reverse}
            setReverse={setReverse}
            placeholder={myPlaceholder}
          />
          <MovieNavBar current={2} />
          <MoviesDbList movies={myMovies} my={true}/>
        </Route>
      </Switch>
    </main>
  );
};

// == Export
export default App;
