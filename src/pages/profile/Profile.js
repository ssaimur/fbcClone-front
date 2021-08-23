import React, { useState, useEffect } from 'react';
import './profile.css';
import Feed from '../../components/feed/Feed';
import { useParams } from 'react-router-dom';
import { CgGenderMale, CgGenderFemale, CgCalendarDates } from 'react-icons/cg';
import { FaGenderless } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { GoLocation } from 'react-icons/go';
import { BsDot } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { BiUpload } from 'react-icons/bi';
import { RiImageEditFill } from 'react-icons/ri';
import { LoaderProfile } from '../../contentLoader';
import { useGlobalContext } from '../../context/authContext/authContext';
import WhoLikedModal from '../../components/whoLikedModal/WhoLikedModal';
import { useGlobalPostContext } from '../../context/postContext/postContext';
import { getDate, handlePostUpload } from '../../helper';
import url, { AUTH_REQUIRED } from '../../constants';

const Profile = () => {
  const { username } = useParams();
  const { user: currentUser, dispatch: authDispatch } = useGlobalContext();
  const { dispatch } = useGlobalPostContext();

  const [user, setUser] = useState({});
  const [fetching, setFetching] = useState(false);
  const [follows, setFollows] = useState(false);
  const [showFollows, setShowFollows] = useState(false);
  const [modalCreds, setModalCreds] = useState({});
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [posting, setPosting] = useState(false);

  const {
    firstName,
    lastName,
    email,
    followers,
    followings,
    desc,
    city,
    gender,
    createdAt,
    _id,
  } = user;
  const [img, setImg] = useState(null);

  /**
   * fetches the user of clicked profile
   */
  useEffect(() => {
    const fetchUser = async () => {
      setFetching(true);
      const response = await fetch(`${url}/users?username=${username}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      const userData = await response.json();

      if (userData.statusCode === 401) {
        return authDispatch({ type: AUTH_REQUIRED });
      }

      setUser(userData);
      setImg(userData.dpImage);
      setFetching(false);
    };

    fetchUser();
  }, [username, authDispatch]);

  /**
   *  handles the follow and unfollow command
   */

  const handleClick = () => {
    setFollows(!follows);
    fetch(`${url}/users/follow/${_id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({ userId: currentUser._id }),
    });
  };

  useEffect(() => {
    if (followers?.includes(currentUser._id)) {
      setFollows(true);
    }
  }, [followers, currentUser._id]);

  /**
   *  setting the follow modal
   */

  const handleModalClick = (what) => {
    const creds = {};
    creds.what = what === 'followers' ? 'followers' : 'followings';
    creds.people = what === 'followers' ? followers : followings;
    setModalCreds(creds);
    setShowFollows(true);
  };

  /**
   * hadle upload click
   */

  const uploadCreds = {
    file,
    dispatch,
    authDispatch,
    desc: caption,
    userId: user._id,
    setPosting,
    setFile,
    setDesc: setCaption,
    setImg,
    dp: true,
  };

  return (
    <div className='container'>
      <div className='container profile'>
        <div className='wrapper'>
          {fetching ? (
            <LoaderProfile />
          ) : (
            <>
              <div className='profileTop'>
                <div className='profileTopLeft'>
                  {!file ? (
                    <img
                      src={
                        img
                          ? `${url}/posts/file/${img}`
                          : `/assets/persons/${
                              gender === 'Female'
                                ? 'noAvatarFemale.png'
                                : 'noAvatar.jpg'
                            }`
                      }
                      alt='profileImage'
                      className='profileImg profileDp'
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      alt='profileImage'
                      className='profileImg profileDp'
                    />
                  )}
                  {currentUser._id === _id &&
                    (file ? (
                      !posting && <MdCancel onClick={() => setFile(null)} />
                    ) : (
                      <label htmlFor='file' className='shareOption'>
                        <RiImageEditFill />
                        <input
                          style={{ display: 'none' }}
                          type='file'
                          id='file'
                          accept='.jpg, .png, .jpeg'
                          onChange={(e) => setFile(e.target.files[0])}
                          required
                        />
                      </label>
                    ))}
                </div>
                <div className='profileTopRight'>
                  <div className='topInfo'>
                    <h3>{firstName + ' ' + lastName}</h3>
                    <p>@{username}</p>
                  </div>
                  {currentUser._id !== _id && (
                    <button
                      className={`btn followBtn ${follows && 'unfollowBtn'}`}
                      onClick={handleClick}
                    >
                      {follows ? 'Following' : 'Follow'}
                    </button>
                  )}
                  {file && (
                    <button
                      className={`btn uploadBtn ${posting && 'uploading'}`}
                      onClick={() => handlePostUpload(uploadCreds)}
                      disabled={posting}
                    >
                      {posting ? 'Uploading...' : 'Upload'}{' '}
                      {!posting && <BiUpload />}
                    </button>
                  )}
                </div>
              </div>
              <div className='profileBottom'>
                <span className='profileDesc desc'>{desc}</span>
                {city && (
                  <span className='profileDesc'>
                    <GoLocation />
                    <p>{city}</p>
                  </span>
                )}
                {email && (
                  <span className='profileDesc'>
                    <MdEmail />
                    <p>{email}</p>
                  </span>
                )}
                {gender && gender === 'Female' ? (
                  <span className='profileDesc'>
                    <CgGenderFemale />
                    <p>{gender}</p>
                  </span>
                ) : gender === 'Male' ? (
                  <span className='profileDesc'>
                    <CgGenderMale />
                    <p>{gender}</p>
                  </span>
                ) : (
                  <span className='profileDesc'>
                    <FaGenderless />
                    <p>{gender}</p>
                  </span>
                )}
                {createdAt && (
                  <span className='profileDesc'>
                    <CgCalendarDates />
                    <p> Joined {getDate(createdAt)}</p>
                  </span>
                )}
                <span className='profileDesc followNumbers'>
                  <div
                    className='profileFollowers'
                    onClick={() => handleModalClick('followings')}
                  >
                    <span className='number'>{followings?.length}</span>
                    <p>Following</p>
                  </div>
                  <BsDot />
                  <div
                    className='profileFollowers'
                    onClick={() => handleModalClick('followers')}
                  >
                    <span className='number'>{followers?.length}</span>
                    <p>Followers</p>
                  </div>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <Feed username={username} firstName={firstName} />
      {showFollows && (
        <WhoLikedModal
          show={showFollows}
          setShow={setShowFollows}
          what={modalCreds.what}
          people={modalCreds.people}
        />
      )}
    </div>
  );
};

export default Profile;
