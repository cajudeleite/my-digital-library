import './styles.scss';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Composant
const NavItem = ({name, link}) => (
  <div className="navbar__items__item">
    <NavLink to={link} exact>{name}</NavLink>
  </div>
);

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

// == Export
export default NavItem;
