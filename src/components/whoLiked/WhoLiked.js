import React, { useState, useEffect } from 'react';
import './whoLiked.css';
import { Link } from 'react-router-dom';
import { LoaderPeople } from '../../contentLoader';

const WhoLiked = ({ userId, setShow }) => {
  const [user, setUser] = useState({});
  const [fetching, setFetching] = useState(false);

  const { username, dpImage, firstName, lastName, gender } = user;

  useEffect(() => {
    const fetchUser = async () => {
      setFetching(true);
      const response = await fetch(`/users?userId=${userId}`);
      const userData = await response.json();
      setUser(userData);
      setFetching(false);
    };

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
                className='profileImg imageSmall'
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
