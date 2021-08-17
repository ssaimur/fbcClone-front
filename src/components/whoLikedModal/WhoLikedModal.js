import { Close } from '@material-ui/icons';
import React, { useState } from 'react';
import { AiFillFire, AiOutlineConsoleSql } from 'react-icons/ai';
import { CLEAR_POST_ERROR } from '../../constants';
import { useGlobalPostContext } from '../../context/postContext/postContext';
import WhoLiked from '../whoLiked/WhoLiked';
import './whoLikedModal.css';

const WhoLikedModal = ({ likes, show, setShow, people, what }) => {
  console.count('whoLikedModal rendered');

  return (
    <div className='whoLiked'>
      <div
        className={` ${show && 'modalBackGround'}`}
        onClick={() => setShow(false)}
      ></div>
      <div className='modal whoLikedFront'>
        <div className='whoLikedTop'>
          <span className='whoLikedTitle'>
            {what === 'followers'
              ? 'Followers'
              : what === 'followings'
              ? 'Followings'
              : 'People who fired'}
            <AiFillFire style={{ color: 'gold', marginLeft: '5px' }} />
          </span>

          <Close className='whoLikedClose' onClick={() => setShow(false)} />
        </div>
        <div className='whoLikedBottom'>
          {likes &&
            likes.map((item, index) => {
              return <WhoLiked userId={item} setShow={setShow} key={index} />;
            })}
          {people &&
            people.map((item, index) => {
              return <WhoLiked userId={item} setShow={setShow} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default WhoLikedModal;
