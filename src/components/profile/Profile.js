import React from 'react';
import './profile.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

const Profile = () => {
  return (
    <>
      <Topbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                src='/assets/posts/5.jpg'
                alt=''
                className='profileCoverImg'
              />
              <img
                src='/assets/persons/1.jpg'
                alt=''
                className='profileUserImg'
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>John Doe</h4>
              <span className='profileInfoDesc'>this is user description</span>
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
