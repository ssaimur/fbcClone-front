import React, { useState, useEffect } from 'react';
import './whoLiked.css';
import { Link } from 'react-router-dom';
import { LoaderHeader, LoaderPeople, LoaderProfile } from '../../contentLoader';

const WhoLiked = ({ userId, setShow }) => {
  const [user, setUser] = useState({});
  const [fetching, setFetching] = useState(false);

  console.count('whoLiked rendered');

  const { username, dpImage, firstName, lastName, gender } = user;

  const fetchUser = async () => {
    setFetching(true);
    const response = await fetch(`/users?userId=${userId}`);
    const userData = await response.json();
    setUser(userData);
    setFetching(false);
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <>
      {fetching ? (
        <div className='whoLiked'>
          <LoaderPeople />
        </div>
      ) : (
        <div className='whoLiked'>
          <div className='whoLikdeLeft'>
            <Link to={`/${username}`} onClick={() => setShow(false)}>
              <img
                className='commentDp cmntdp'
                src={
                  dpImage
                    ? `/posts/file/${dpImage}`
                    : `/assets/persons/${
                        gender === 'Female'
                          ? 'noAvatarFemale.png'
                          : 'noAvatar.jpg'
                      }`
                }
                alt='dp'
              />
            </Link>
          </div>
          <div className='whoLikdeRight'>
            <div className='whoLikdeRightTop'>
              <Link
                to={`/${username}`}
                style={{ textDecoration: 'none', color: 'black' }}
                onClick={() => setShow(false)}
              >
                <span className='commentName whoLikedName'>
                  {(firstName || '') + ' ' + (lastName || '')}
                </span>
              </Link>
            </div>
            <div className='whoLikdeRightBottom'>
              <span className='commentUsername whoLikedUsername'>
                {username && '@'}
                {username || ''}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhoLiked;
