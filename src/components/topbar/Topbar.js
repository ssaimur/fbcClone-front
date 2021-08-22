import React from 'react';
import './topbar.css';
import { Search } from '@material-ui/icons';
import { ImFire } from 'react-icons/im';
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <>
      <div className='topbarContainer'>
        <div className='topbarWrapper'>
          <div className='topbarLeft'>
            <Link to='/'>
              <ImFire className='logoIcon' />
            </Link>
          </div>
          <div className='topbarCenter'>
            <div className='searchbar'>
              <input
                placeholder='Type here to search...'
                className='searchInput'
                onClick={() =>
                  alert(
                    "Currently working on 'Search' and 'Chat' functionality. Sorry for the inconvenience :("
                  )
                }
              />
              <Search className='searchIcon' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
