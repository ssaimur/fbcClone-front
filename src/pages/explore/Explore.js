import React from 'react';
import './explore.css';
import Feed from '../../components/feed/Feed';

const Explore = () => {
  return (
    <div className='container explore'>
      <div className='wrapper'>
        <div className='sticker exploreSticker'>
          <p>Explore posts across Firegram</p>
        </div>
      </div>
      <Feed explorePosts />
    </div>
  );
};

export default Explore;
