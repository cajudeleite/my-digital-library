import './styles.scss';
import PropTypes from 'prop-types'
import Item from './item';

const MoviesDbList = ({ movies, my }) => (
  <section className='movielist'>
    {movies.map(
      (movie) => <Item key={movie.film_id} {...movie} my={my} />,
    )}
  </section>
);

MoviesDbList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      film_id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  my: PropTypes.bool.isRequired,
};

export default MoviesDbList;
