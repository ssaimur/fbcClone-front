import React from 'react';
import './homeRightbar.css';
import { Users } from '../../../dummyData';
import Online from '../../online/Online';

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

export default HomeRightbar;
