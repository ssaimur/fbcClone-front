import React from 'react';
import './topbar.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/authContext/authContext';

const Topbar = () => {
  const { user } = useGlobalContext();

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className='logo'>MERN</span>
        </Link>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <input
            placeholder='Search friends by their usename'
            className='searchInput'
          />
          <Search className='searchIcon' />
        </div>
      </div>
    </div>
  );
};

export default Topbar;

{
  /* <Link to={`/${user.username}`}>
  <img
    src={
      user.dpImage
        ? `/posts/file/${user.dpImage}`
        : `/assets/persons/${
            user.gender === 'Male' ? 'noAvatar.jpg' : 'noAvatarFemale.png'
          }`
    }
    alt='dp'
    className='topbarImg'
  />
</Link>; */
}
