import './styles.scss';
import PropTypes from 'prop-types'

const Page = ({ page, method, currentPage}) => {
  const handleClick = () => {
    method(page);
  };

  const className = currentPage === page ? 'more-results__pages__page__current' : 'more-results__pages__page';

  return (
    <section className={className}>
      <h1 onClick={handleClick}>{page}</h1>
    </section>
  );
};

Page.propTypes = {
  page: PropTypes.number.isRequired,
  method: PropTypes.func.isRequired,
};

export default Page;
