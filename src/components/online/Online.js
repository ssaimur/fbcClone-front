import React from 'react';
import './online.css';

const Online = ({ users }) => {
  const { profilePicture, username } = users;
  return (
    <li className='rightbarFriend'>
      <div className='rightbarProfileImgContainer'>
        <img
          src={profilePicture}
          alt='alternative text'
          className='rightbarProfileImg'
        />
        <span className='rightbarOnline'></span>
      </div>
      <span className='rightbarUsername'>{username}</span>
    </li>
  );
};

export default Online;
