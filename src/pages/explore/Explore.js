import React, { useState, useEffect } from 'react';
import './explore.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

const Explore = () => {
  return (
    <>
      <Topbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightBottom'>
            <Feed explorePosts />
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
