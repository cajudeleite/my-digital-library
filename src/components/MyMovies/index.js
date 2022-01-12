import './styles.scss';
import PropTypes from 'prop-types'
import Item from './item';

const MoviesDbList = ({ movies }) => (
  <section className='mymovielist'>
    {movies.map(
      (movie) => <Item key={movie.film_id} {...movie} />,
    )}
  </section>
);

MoviesDbList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      film_id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default MoviesDbList;
