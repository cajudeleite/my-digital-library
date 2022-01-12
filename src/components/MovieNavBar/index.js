import './styles.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// == Composant
const MovieNavBar = ( {current} ) => {

  const first = () => current === 1 ? 'movie-navbar__link__current' : 'movie-navbar__link';
  const second = () => current === 2 ? 'movie-navbar__link__current' : 'movie-navbar__link';

  return (
    <section className="movie-navbar">
      <NavLink to='/' exact className={first()}>Ajouter nouveau film</NavLink>
      <NavLink to='/mymovielist' exact className={second()}>Chercher dans ma bibliothèque</NavLink>
    </section>
  );
};

MovieNavBar.propTypes = {
  current: PropTypes.number.isRequired,
};

// == Export
export default MovieNavBar;
