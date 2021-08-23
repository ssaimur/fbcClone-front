import React, { useState } from 'react';
import './share.css';
import { PermMedia, Cancel } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { useGlobalContext } from '../../context/authContext/authContext';
import { useGlobalPostContext } from '../../context/postContext/postContext';
import { handlePostUpload } from '../../helper';
import url from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    position: 'sticky',
    top: '50px',
  },
}));

const Share = () => {
  const { user } = useGlobalContext();
  const { dispatch } = useGlobalPostContext();

  const classes = useStyles();

  const { firstName } = user;
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);

  const uploadCreds = {
    file,
    dispatch,
    desc,
    userId: user._id,
    setPosting,
    setFile,
    setDesc,
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareLeft'>
          <img
            src={
              user.dpImage
                ? `${url}/posts/file/${user.dpImage}`
                : `/assets/persons/${
                    user.gender === 'Female'
                      ? 'noAvatarFemale.png'
                      : 'noAvatar.jpg'
                  }`
            }
            alt=''
            className='profileImg shareProfileImg'
          />
        </div>

        <div className='shareRight'>
          <textarea
            placeholder={`How was your day ${firstName}?`}
            className='shareCaption'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          {file && (
            <div style={{ margin: '0 auto' }}>
              <div className='shareImgContainer'>
                <img
                  className='shareImg'
                  src={URL.createObjectURL(file)}
                  alt='shareImg'
                />
                <Cancel className='cancelShare' onClick={() => setFile(null)} />
              </div>
            </div>
          )}
          <div className='shareRightBottom'>
            {!file && (
              <label htmlFor='file' className='shareOption'>
                <PermMedia className='shareIcon' />
                <span className='shareOptionText'>Upload a photo </span>
                <input
                  style={{ display: 'none' }}
                  type='file'
                  id='file'
                  accept='.jpg, .png, .jpeg'
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </label>
            )}
            <button
              className={`btn shareButton ${posting && 'sharing'}`}
              type='button'
              onClick={() => handlePostUpload(uploadCreds)}
              disabled={posting}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      {posting && (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      )}
    </div>
  );
};

export default Share;
