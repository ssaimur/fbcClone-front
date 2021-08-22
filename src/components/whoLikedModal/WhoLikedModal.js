import { Close } from '@material-ui/icons';
import React from 'react';
import { AiFillFire } from 'react-icons/ai';
import WhoLiked from '../whoLiked/WhoLiked';
import './whoLikedModal.css';

const WhoLikedModal = ({ likes, show, setShow, people, what }) => {
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
            {!what && (
              <AiFillFire style={{ color: 'gold', marginLeft: '5px' }} />
            )}
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
