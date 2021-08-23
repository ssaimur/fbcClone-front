import React, { useEffect, useState } from 'react';
import './navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../context/authContext/authContext';
import {
  ArrowDropUp,
  Explore,
  Home,
  MailOutline,
  People,
} from '@material-ui/icons';
import ProfileOptions from '../profileOptions/ProfileOptions';
import url from '../../constants';

const Navbar = () => {
  const { user } = useGlobalContext();
  const [active, setActive] = useState({});
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  let pathname = location.pathname.split('').slice(1).join('');
  if (pathname === '') {
    pathname = 'home';
  }

  useEffect(() => {
    const active = {};
    active[pathname] = true;
    setActive(active);
  }, [location, pathname]);

  return (
    <div className='navbarContainer'>
      <div className='navbarWrapper'>
        <Link to='/'>
          <div className={`center ${active.home && 'active'}`}>
            <Home className='navItem' />
          </div>
        </Link>
        <Link to='/explore'>
          <div className={`center ${active.explore && 'active'}`}>
            <Explore className='navItem' />
          </div>
        </Link>
        <Link to='people'>
          <div className={`center ${active.people && 'active'}`}>
            <People className='navItem' />
          </div>
        </Link>
        <Link to='chat'>
          <div className={`center ${active.chat && 'active'}`}>
            <MailOutline className='navItem' />
          </div>
        </Link>
        <div className='center navImg' onClick={() => setShowModal(!showModal)}>
          <img
            className='profileImg navProfileImg'
            src={
              user.dpImage
                ? `${url}/posts/file/${user.dpImage}`
                : `/assets/persons/${
                    user.gender === 'Female'
                      ? 'noAvatarFemale.png'
                      : 'noAvatar.jpg'
                  }`
            }
            alt='dp'
          />
          <ArrowDropUp className='navItem navUpArrow' />
          {showModal && <ProfileOptions />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
