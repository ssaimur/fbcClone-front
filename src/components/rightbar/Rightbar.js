import React from 'react';
import './rightbar.css';
import { Search } from '@material-ui/icons';
import People from '../../pages/people/People';

function Rightbar({ user }) {
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {/* searchbar here */}

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

        {/* searchbar ends here */}

        <div className='box-1'>
          <div className='header'>
            <h2>For you to follow</h2>
          </div>
          <div className='body'>
            <People sidebar />
          </div>
        </div>
        <div className='box-1'>
          <div className='header'>
            <h2>Trending in firegram</h2>
          </div>
          <div className='body'>
            <p className='noTrend'>Nothing in trendeing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
