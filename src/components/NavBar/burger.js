import './styles.scss';
import UseAnimations from 'react-useanimations';
import menu2 from 'react-useanimations/lib/menu2';
import NavItems from './items';
import { useState } from 'react';

// == Composant
const Burger = () => {
  const [isHidden, setIsHidden] = useState(true);

  const sidebarClassName = isHidden ? 'navbar__burger__sidebar__hidden' : 'navbar__burger__sidebar'

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="navbar__burger">
      <button className='navbar__burger__button' onClick={toggleSidebar}><UseAnimations animation={menu2} size={50} strokeColor='#DCA62C' speed={1.3} /></button>
      <div className={sidebarClassName}>
        <NavItems />
      </div>
      {!isHidden && <div className="filter"></div>}
    </div>
  );
};

// == Export
export default Burger;
