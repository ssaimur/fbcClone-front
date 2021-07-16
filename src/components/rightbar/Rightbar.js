import React from 'react';
import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';

function Rightbar({ profile }) {
  console.log(profile);
  const HomeRightbar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img src='/assets/gift.png' alt='birthday' className='birthdayImg' />
          <span className='birthdayText'>
            <b>Saniya Rahman</b> and <b>9 others</b> have their birthday today.
          </span>
        </div>
        <img src='/assets/brand.jpg' alt='brand' className='rightbarAd' />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='rightbarFriendList'>
          {Users.map((item) => {
            return <Online key={item.id} users={item} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className='rightbarTitle'>User information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City:</span>
            <span className='rightbarInfoValue'>Dhaka</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From:</span>
            <span className='rightbarInfoValue'>Netrakona</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship:</span>
            <span className='rightbarInfoValue'>Single</span>
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

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
