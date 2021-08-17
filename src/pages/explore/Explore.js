import React, { useState, useEffect } from 'react';
import './explore.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

const Explore = () => {
  return (
    <>
      <div className='explore'>
        <div className='exploreWrapper'>
          <div className='sticker exploreSticker'>
            <p>Explore posts across Firegram</p>
          </div>
        </div>
        <Feed explorePosts />
      </div>
    </>
  );
};

export default Explore;
