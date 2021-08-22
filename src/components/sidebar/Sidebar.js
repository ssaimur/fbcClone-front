import React, { useEffect, useState } from 'react';
import './sidebar.css';
import { BiHomeCircle } from 'react-icons/bi';
import { MdExplore } from 'react-icons/md';
import { TiMessages } from 'react-icons/ti';
import { IoPeopleOutline } from 'react-icons/io5';
import { BsBookmark } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { IoPower } from 'react-icons/io5';
import { ImFire } from 'react-icons/im';

import { Link, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../context/authContext/authContext';
import { DIALOG_LOGOUT } from '../../constants';
import { useGlobalDialogContext } from '../../context/dialogContext/dialogContext';

function Sidebar() {
  const { user } = useGlobalContext();
  const { username, dpImage, firstName, lastName, gender } = user;
  const { dispatch } = useGlobalDialogContext();

  const [active, setActive] = useState({});
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

  const style = { textDecoration: 'none' };
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarTop'>
          <div className='logoLarge'>
            {/* <img src='/assets/logo.png' className='logo' /> */}
            <Link to='/' style={style}>
              <ImFire className='logoIcon' />
            </Link>
            {/* <Link to='/' style={style}>
              <h1>firegram</h1>
            </Link> */}
          </div>
          <ul className='sidebarItems'>
            <Link to='/' style={style}>
              <li className={`sidebarItem ${active.home && 'sidebarActive'}`}>
                <BiHomeCircle />
                <p>Home</p>
              </li>
            </Link>
            <Link to='/explore' style={style}>
              <li
                className={`sidebarItem ${active.explore && 'sidebarActive'}`}
              >
                <MdExplore />
                <p>Explore</p>
              </li>
            </Link>
            <Link to='/chat' style={style}>
              <li className={`sidebarItem ${active.chat && 'sidebarActive'}`}>
                <TiMessages />
                <p>Messages</p>
              </li>
            </Link>
            <Link to='/people' style={style}>
              <li className={`sidebarItem ${active.people && 'sidebarActive'}`}>
                <IoPeopleOutline />
                <p>People</p>
              </li>
            </Link>
            <Link to='#' style={style}>
              <li className='sidebarItem'>
                <BsBookmark />
                <p>Bookmarks</p>
              </li>
            </Link>
            <Link to='#' style={style}>
              <li className='sidebarItem'>
                <CgMoreO />
                <p>More</p>
              </li>
            </Link>
            <li
              className='sidebarItem logOut'
              onClick={() => dispatch({ type: DIALOG_LOGOUT })}
            >
              <IoPower />
              <p>Log out</p>
            </li>
          </ul>
        </div>

        {/* divider between top and bottom */}
        {/* divider between top and bottom */}
        {/* divider between top and bottom */}

        <Link to={`/${user.username}`} style={style}>
          <div className='sidebarBottom'>
            <div className='sidebarBottomLeft'>
              <img
                className='profileImg sidebarDp'
                src={
                  dpImage
                    ? `/posts/file/${dpImage}`
                    : `/assets/persons/${
                        gender === 'Female'
                          ? 'noAvatarFemale.png'
                          : 'noAvatar.jpg'
                      }`
                }
                alt='dp'
              />
            </div>
            <div className='sidebarBottomRight'>
              <div className='sidebarBottomRightTop'>
                <span className='sidebarBottomName'>
                  {(firstName || '') + ' ' + (lastName || '')}
                </span>
              </div>
              <div className='sidebarBottomRightBottom'>
                <span className='sidebarBottomUsername'>
                  {username && '@'}
                  {username || ''}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
