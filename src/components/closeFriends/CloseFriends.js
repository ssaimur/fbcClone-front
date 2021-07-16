import React from 'react';
import './closeFriends.css';

const CloseFriends = ({ user }) => {
  const { username, profilePicture } = user;
  return (
    <li className='sidebarFriend'>
      <img src={profilePicture} alt='' className='sidebarFriendImg' />
      <span className='sidebarFriendName'>{username}</span>
    </li>
  );
};

export default CloseFriends;
