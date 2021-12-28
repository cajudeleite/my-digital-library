import './styles.scss';
import UseAnimations from 'react-useanimations';
import searchToX from 'react-useanimations/lib/searchToX';
import PropTypes from 'prop-types';

// == Composant
const SearchButton = ({ method, reverse }) => {

  return (
  <div className='searchbar__form__button'>
      <button><UseAnimations animation={searchToX} reverse={reverse} onClick={method} strokeColor='#172238' /></button>
  </div>
)};

SearchButton.propTypes = {
  method: PropTypes.func.isRequired,
  reverse: PropTypes.bool.isRequired,
};

// == Export
export default SearchButton;
