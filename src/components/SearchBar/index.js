import './styles.scss';
import UseAnimations from 'react-useanimations';
import searchToX from 'react-useanimations/lib/searchToX';
import PropTypes from 'prop-types';
import { useState } from 'react';

const SearchBar = ({ searchValue, setSearchValue, submit, setMovies, setTotalPages }) => {

  const [reverse, setReverse] = useState(false);

  const buttomClick = () => {
    document.querySelector('.searchbar__form__button').click();
  };

  const handdleClick = (arg) => {
    if (!reverse && arg === 'click') {
      buttomClick();
      submit();
    } else if (reverse && arg === 'click') {
      buttomClick();
      setSearchValue('');
      setMovies([]);
      setTotalPages(1);
    } else if (arg === 'fake') {
      buttomClick();
    } else if (arg === 'submit') {
      submit();
    };
    setReverse(!reverse)
  };

  return (
    <section className="searchbar">
      <form className='searchbar__form' action="" onSubmit={(event) => {
        event.preventDefault();
        handdleClick('submit');
      }}>
        <input
          className='searchbar__form__input'
          type='text'
          placeholder='Veuillez saisir un titre de film'
          value={searchValue}
          onChange={
            (event) => {
              setSearchValue(event.target.value);
              if (reverse) {
                handdleClick('fake');
              }
            }
          }
        />
      </form>
      <div className="searchbar__form__button__ghost" onClick={() => handdleClick('click')}></div>
      <UseAnimations className='searchbar__form__button' animation={searchToX} reverse={reverse}  strokeColor='#172238' />
    </section>
  );
};

SearchBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  setMovies: PropTypes.func.isRequired,
}

export default SearchBar;
