import React from 'react';
import { Link } from 'react-router-dom';
import './person.css';

const Person = ({ person }) => {
  const { username, dpImage, firstName, lastName, gender } = person;
  return (
    <div className='person'>
      <div className='personLeft'>
        <Link to={`/${username}`} /*onClick={() => setShow(false)}*/>
          <img
            className='commentDp personDp'
            src={
              dpImage
                ? `/posts/file/${dpImage}`
                : `/assets/persons/${
                    gender === 'Female' ? 'noAvatarFemale.png' : 'noAvatar.jpg'
                  }`
            }
            alt='dp'
          />
        </Link>
      </div>
      <div className='personRight'>
        <div className='personRightTop'>
          <Link
            to={`/${username}`}
            style={{ textDecoration: 'none', color: 'black' }}
            // onClick={() => setShow(false)}
          >
            <span className='personName'>
              {(firstName || '') + ' ' + (lastName || '')}
            </span>
          </Link>
        </div>
        <div className='personRightBottom'>
          <span className='personUsername'>
            {username && '@'}
            {username || ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Person;
