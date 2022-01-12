import './styles.scss';
import PropTypes from 'prop-types';
import UseAnimations from 'react-useanimations';
import arrowLeftCircle from 'react-useanimations/lib/arrowLeftCircle';
import arrowRightCircle from 'react-useanimations/lib/arrowRightCircle';
import { useState } from 'react';

const MoreResults = ({ pages, page, method }) => {
  let pagesArray = [...Array(pages + 1).keys()];
  pagesArray.shift();
  const [leftArrowColor, setLeftArrowColor] = useState('vars.$big-stone');
  const [rightArrowColor, setRightArrowColor] = useState('vars.$big-stone');
  const abovePage = () => method(page + 1);
  const beneathPage = () => method(page - 1);


  return (
    <section className='more-results'>
      <div className="more-results__end">
        {page !== 1 && <UseAnimations animation={arrowLeftCircle} onClick={beneathPage} onMouseOver={() => { setLeftArrowColor('vars.$mariner') }} onMouseOut={() => { setLeftArrowColor('vars.$big-stone') }} strokeColor={leftArrowColor} /> }
        <h1>{page}</h1>
        {page !== pages && <UseAnimations animation={arrowRightCircle} onClick={abovePage} onMouseOver={() => { setRightArrowColor('vars.$mariner') }} onMouseOut={() => { setRightArrowColor('vars.$big-stone')}} strokeColor={rightArrowColor} /> }
      </div>
    </section>
  );
};

MoreResults.propTypes = {
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  method: PropTypes.func.isRequired,
};

export default MoreResults;
