import React, { useRef, useState } from 'react';
import './share.css';
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons';
import { useGlobalContext } from '../../context/authContext/authContext';
import { useGlobalPostContext } from '../../context/postContext/postContext';
import { POST_ADDED } from '../../constants';

const Share = () => {
  const { user } = useGlobalContext();
  const { dispatch } = useGlobalPostContext();
  const { firstName, username, profilePicture } = user;
  const desc = useRef(null);
  const [file, setFile] = useState(null);

  const handleClick = async () => {
    if (!file) {
      return alert('File is missing');
    }

    console.log(desc, file);

    const formData = new FormData();

    formData.append('caption', desc.current.value);
    formData.append('file', file);
    formData.append('userId', user._id);

    setFile(null);
    desc.current.value = '';

    const response = await fetch('/posts/upload', {
      method: 'POST',
      body: formData,
    });
    const resData = await response.json();
    console.log(resData);

    dispatch({ type: POST_ADDED, payload: resData });
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            src={
              user.dpImage
                ? `/posts/file/${user.dpImage}`
                : `/assets/persons/${
                    user.gender === 'Male'
                      ? 'noAvatar.jpg'
                      : 'noAvatarFemale.png'
                  }`
            }
            alt=''
            className='shareProfileImg'
          />
          <input
            placeholder={`What's in your mind ${firstName}?`}
            className='shareInput'
            ref={desc}
            required
          />
        </div>
        <hr className='shareHr' />
        <div className='shareBottom'>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              {/* <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className='shareOptionText'>Photo or video</span> */}
              <input
                // style={{ display: 'none' }}
                type='file'
                id='file'
                accept='.jpg, .png, .jpeg'
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </label>
            {/* <div className='shareOption'>
              <Label htmlColor='blue' className='shareIcon' />
              <span className='shareOptionText'>Tag</span>
            </div>
            <div className='shareOption'>
              <Room htmlColor='green' className='shareIcon' />
              <span className='shareOptionText'>Location</span>
            </div>
            <div className='shareOption'>
              <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className='shareOptionText'>Feelings</span>
            </div> */}
          </div>
          <button className='shareButton' type='button' onClick={handleClick}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
