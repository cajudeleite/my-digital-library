import './styles.scss';
import SearchButton from './searchbutton';
import PropTypes from 'prop-types';

// == Composant
const SearchBar = ({ searchValue, setSearchValue, method, reverse, setReverse, placeholder }) => {

  return (
    <section className="searchbar">
      <form className='searchbar__form' action="" onSubmit={method}>
        <input
          className='searchbar__form__input'
          type='text'
          placeholder={placeholder}
          value={searchValue}
          onChange={
            (event) => {
              setSearchValue(event.target.value);
              if (searchValue.length === 1 && reverse) {console.log('switch');};
            }
          }
        />
        <SearchButton method={method} reverse={reverse} />
      </form>
    </section>
  );
};

SearchBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  method: PropTypes.func.isRequired,
  setMovies: PropTypes.func.isRequired,
  reverse: PropTypes.bool.isRequired,
  setReverse: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

// == Export
export default SearchBar;
