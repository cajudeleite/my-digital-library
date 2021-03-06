import './styles.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { simplifyMyMovies } from '../../utils/movies';

const Item = ({
  title, overview, film_id, poster_path, true_id, my, method
}) => {

  const [directorName, setDirectorName] = useState('');

  const [alreadyInList, setAlreadyInList] = useState(false);

  const history = useHistory();

  const checkInList = () => {
    axios.get('https://v1-my-digital-library-api.herokuapp.com/films')
      .then(
        (response) => {
          const moviesFromApi = response.data;

          const formatedMoviesFromApi = simplifyMyMovies(moviesFromApi);

          formatedMoviesFromApi.map(
            (movie) => {
              const movieId = movie.film_id;
              if (movieId === film_id) {
                setAlreadyInList(true);
              }
            }
          );
        },
      ).catch(
        () => {
          console.log('Une erreur est survenue...', true);
        },
      );
  };

  const buttonText = () => {
    checkInList();
    if (my) {
      return 'Supprimer de ma liste';
    } else if (alreadyInList) {
      return 'Déjà dans la liste';
    };
    return 'Ajouter à ma liste';
  };

  const postMovie = () => {
    axios.post('https://v1-my-digital-library-api.herokuapp.com/films', {
      title: title,
      overview: overview,
      film_id: film_id,
      poster_path: poster_path,
    })
    .then(
      (response) => {
        console.log(response);
      }
    )
    .catch(
      (error) => {
        console.log(error);
      }
    );
  };

  const deleteMovie = () => {
    axios.delete(`https://v1-my-digital-library-api.herokuapp.com/films/${true_id}`)
    .then(
      (response) => {
        console.log(response, 'deleted');
      }
    )
    .catch(
      (error) => {
        console.log(error);
      }
    );
  };

  const handdleClick = () => {
    checkInList();
    if (my) {
      deleteMovie();
      method();
    } else if (alreadyInList) {
      console.log('Tu l\'as déjà');
    } else {
      postMovie();
      checkInList();
    };
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const getDirectors = () => {
    const directors = [];
    axios.get(`https://api.themoviedb.org/3/movie/${film_id}/credits?api_key=a5b6184c80781706fbb134c3a33bf034&language=fr-FR`).then(
      (response) => {
        const crew = response.data.crew;
        crew.map(
          (person) => {
            if (person.job === 'Director') {
              directors.push(person.name);
            };
          }
        )
        setDirectorName(directors.join(', '));
      },
    ).catch(
      () => {
        directors.push('Pas de directeur');
      },
    );
  };

  const trimOverview = () => {
    if (overview.length > 600) {
      return overview.substring(0, 600) + '...';
    }
    return overview;
  };

  const posterImage = () =>{
    if (poster_path === null) {
      return 'https://ualr.edu/elearning/files/2020/10/No-Photo-Available.jpg';
    }
    return `https://image.tmdb.org/t/p/original${poster_path}`;
  };

  useEffect(() => getDirectors());

  return (
    <div className='movielist__card'>
      <img className='movielist__card__image' src={posterImage()} alt={title} />
      <div className="movielist__card__header">
        <h2 className="movielist__card__header__title">{title}</h2>
        <h3 className="movielist__card__header__directors">{directorName}</h3>
        <p className="movielist__card__header__overview">{trimOverview(650)}</p>
        <button className="movielist__card__header__button" onClick={() => handdleClick()}>{buttonText()}</button>
      </div>
    </div>
  );
};

Item.defaultProps = {
  overview: 'Ce film n\'a pas de description',
  poster_path: 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
  true_id: 0,
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string,
  poster_path: PropTypes.string,
  film_id: PropTypes.number.isRequired,
  true_id: PropTypes.number,
  my: PropTypes.bool.isRequired,
  method: PropTypes.func.isRequired,
};

export default Item;
