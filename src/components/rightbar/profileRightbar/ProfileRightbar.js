import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context/authContext/authContext';
import './profileRightbar.css';

const ProfileRightbar = ({ user }) => {
  const { city, from, relationship, followers, followings, _id } = user;
  const { user: currentUser } = useGlobalContext();
  const [follows, setFollows] = useState(false);

  const handleClick = () => {
    setFollows(!follows);
    fetch(`/users/follow/${_id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userId: currentUser._id }),
    });
  };

  useEffect(() => {
    if (followers.includes(currentUser._id)) {
      setFollows(true);
    }
  }, [followers, currentUser._id]);
  return (
    <>
      {currentUser._id !== _id && (
        <button
          className={`rightbarFollowBtn ${follows && 'rightbarUnfollowBtn'}`}
          onClick={handleClick}
        >
          {follows ? 'Following' : 'Follow'}
        </button>
      )}
      <h4 className='rightbarTitle'>User information</h4>
      <div className='rightbarInfo'>
        <div className='rightbarInfoItem'>
          <span className='rightbarInfoKey'>City:</span>
          <span className='rightbarInfoValue'>{city}</span>
        </div>
        <div className='rightbarInfoItem'>
          <span className='rightbarInfoKey'>From:</span>
          <span className='rightbarInfoValue'>{from}</span>
        </div>
        <div className='rightbarInfoItem'>
          <span className='rightbarInfoKey'>Relationship:</span>
          <span className='rightbarInfoValue'>
            {relationship === 1
              ? 'Single'
              : relationship === 2
              ? 'Married'
              : 'Preffer not to say'}
          </span>
        </div>
      </div>

      <h4 className='rightbarTitle'>User followings</h4>
      <div className='rightbarFollowings'>
        <div className='rightbarFollowing'>
          <img
            src='/assets/persons/2.jpg'
            alt='some text'
            className='rightbarFollowingImg'
          />
          <span className='rightbarFollowingName'>John Carter</span>
        </div>
        <div className='rightbarFollowing'>
          <img
            src='/assets/persons/3.jpg'
            alt='some text'
            className='rightbarFollowingImg'
          />
          <span className='rightbarFollowingName'>John Carter</span>
        </div>
        <div className='rightbarFollowing'>
          <img
            src='/assets/persons/4.jpg'
            alt='some text'
            className='rightbarFollowingImg'
          />
          <span className='rightbarFollowingName'>John Carter</span>
        </div>
        <div className='rightbarFollowing'>
          <img
            src='/assets/persons/5.jpg'
            alt='some text'
            className='rightbarFollowingImg'
          />
          <span className='rightbarFollowingName'>John Carter</span>
        </div>
        <div className='rightbarFollowing'>
          <img
            src='/assets/persons/6.jpg'
            alt='some text'
            className='rightbarFollowingImg'
          />
          <span className='rightbarFollowingName'>John Carter</span>
        </div>
        <div className='rightbarFollowing'>
          <img
            src='/assets/persons/7.jpg'
            alt='some text'
            className='rightbarFollowingImg'
          />
          <span className='rightbarFollowingName'>John Carter</span>
        </div>
      </div>
    </>
  );
};

export default ProfileRightbar;
