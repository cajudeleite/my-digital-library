import './styles.scss';
import PropTypes from 'prop-types';
import Page from './page';
import UseAnimations from 'react-useanimations';
import arrowLeftCircle from 'react-useanimations/lib/arrowLeftCircle';
import arrowRightCircle from 'react-useanimations/lib/arrowRightCircle';
import { useState } from 'react';

const MoreResults = ({ pages, page, method }) => {
  let pagesArray = [...Array(pages + 1).keys()];
  pagesArray.shift();
  const [allPages, setAllPages] = useState(false);
  const abovePage = () => method(page + 1);
  const beneathPage = () => method(page - 1);
  const toggleAllPagesOn = () => setAllPages(true);
  const toggleAllPagesOff = () => setAllPages(false);
  const hover = () => console.log('hover')

  return (
    <section className='more-results'>
      <div className="more-results__pages" onMouseOver={toggleAllPagesOn} onMouseOut={toggleAllPagesOff}>
        { allPages && pagesArray.map(
          (visualPage) => <Page key={visualPage} page={visualPage} method={method} currentPage={page} />,
        )}
      </div>
      <div className="more-results__end">
        { page !==1 && <UseAnimations animation={arrowLeftCircle} onClick={beneathPage}/> }
        <h1 onMouseOver={toggleAllPagesOn} onMouseOut={toggleAllPagesOff}>{page}</h1>
        {page !== pages && <UseAnimations animation={arrowRightCircle} onClick={abovePage} /> }
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
