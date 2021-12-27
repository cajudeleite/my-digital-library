import './styles.scss';
import NavItems from './items';
import Burger from './burger';

// == Composant
const NavBar = () => (
  <section className="navbar">
    <h1 className='navbar__logo'>My Digital Library</h1>
    <div className="navbar__items">
      <NavItems />
    </div>
    <Burger />
  </section>
);

// == Export
export default NavBar;
