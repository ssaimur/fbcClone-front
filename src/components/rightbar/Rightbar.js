import React from 'react';
import './rightbar.css';
import ProfileRightbar from './profileRightbar/ProfileRightbar';
import HomeRightbar from './homeRightbar/HomeRightbar';

function Rightbar({ user }) {
  console.log(user);

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {user?.username ? (
          <ProfileRightbar user={user} />
        ) : (
          <HomeRightbar user={user} />
        )}
      </div>
    </div>
  );
}

export default Rightbar;
