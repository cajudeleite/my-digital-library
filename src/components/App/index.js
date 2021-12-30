// == Import
import './styles.scss';
import NavBar from '../NavBar';
import SearchBar from '../SearchBar';
import MoviesDbList from '../MovieDbList';
import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import { simplifyMovies } from '../../utils/movies';
import axios from 'axios';
import MoreResults from '../MoreResults';

// == Composant
const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [nbResults, setNbResults] = useState(0);
  const [movies, setMovies] = useState([]);
  const [reverse, setReverse] = useState(false);
  const [placeholder, setPlaceholder] = useState('Ajouter un nouveau film à la bibliothèque');

  const search = (event) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    event.preventDefault();
    if (searchValue === '' && !reverse) {
      setReverse(false);
      setPlaceholder('Veuillez saisir un titre de film');
    } else if (searchValue !== '' && reverse) {
      setReverse(false);
      setPlaceholder('Veuillez saisir un titre de film');
      setSearchValue('');
      setMovies([]);
    } else {
      setReverse(true);
      setPlaceholder('Veuillez saisir un titre de film');

      // on se rappelle de la dernière page demandée
      setPage(1);

      // on réinitialise le nombre de résultats total
      setNbResults(0);

      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a5b6184c80781706fbb134c3a33bf034&language=fr-FR&query=${searchValue}&page=${page}`).then( // avec the, on définit le traiement à réaliser si la promesse est tenue
        (response) => {
          // on récupère le tableau de films dans la réponse
          const moviesFromApi = response.data.results;
          // et le nombre de résultats
          const nbResultsFromApi = response.data.total_results;
          setTotalPages(response.data.total_pages);

          // on mémomorise le nombre de résultat dans la variable d'état
          setNbResults(nbResultsFromApi);

          // on formatte notre tableau de films
          const formatedMoviesFromApi = simplifyMovies(moviesFromApi);
          // on les range dans la variable d'état "movies"
          setMovies(formatedMoviesFromApi);
          // je vais indiquer à l'utilisateur le nombre de repos retournés grâce à un message
          console.log(`La recherche a retourné ${nbResultsFromApi} résultats`);
        },
      ).catch( // on définit le traitement à réaliser quand la promesse n'est pas tenue
        () => {
          console.log('Une erreur est survenue...', true);

          setMovies([]);
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
        const moviesFromApi = response.data.results;

        const formatedMoviesFromApi = simplifyMovies(moviesFromApi);

        // ma liste de films est maitenant cette nouvelle liste
        setMovies(formatedMoviesFromApi);
      },
    ).catch( // on définit le traitement à réaliser quand la promesse n'est pas tenue
      () => {
        console.log('Une erreur est survenue...', true);

        setRepos([]);
        setPage(null);
        setNbResults(0);

        setIsLoading(false);
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
            method={search}
            setMovies={setMovies}
            reverse={reverse}
            setReverse={setReverse}
            placeholder={placeholder}
          />
          <MoviesDbList movies={movies} nbResults={nbResults} />
          {totalPages > 1 && <MoreResults pages={totalPages} page={page} method={searchMore} />}
        </Route>
        <Route path='/lol' exact>
          <h1>Composant : Lol</h1>
        </Route>
      </Switch>

    </main>
  );
};

// == Export
export default App;
