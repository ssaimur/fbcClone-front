import React, { useState, useRef, useEffect } from 'react';
import { Close } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { useGlobalContext } from '../../context/authContext/authContext';
import { useGlobalPostContext } from '../../context/postContext/postContext';
import { handlePostUpdate } from '../../helper';
import './imageEdit.css';
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

const ImageEdit = ({ filename, show, postId, caption, setShow }) => {
  const { user } = useGlobalContext();
  const { dispatch } = useGlobalPostContext();

  const classes = useStyles();

  const { firstName } = user;
  const [desc, setDesc] = useState(caption);
  const [posting, setPosting] = useState(false);
  const textarea = useRef(null);

  useEffect(() => {
    textarea.current.focus = true;
  }, []);

  const updateCreds = { setPosting, setShow, postId, desc, dispatch };

  return (
    <div className='imageEdit'>
      <div
        className={` ${show && 'modalBackGround'}`}
        onClick={() => setShow(false)}
      ></div>
      <div className='modal imageEditFront'>
        <div className='imageEditTop'>
          <span className='imageEditTitle'>Update your post</span>

          <Close className='imageEditClose' onClick={() => setShow(false)} />
        </div>

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
                placeholder={`Want to edit caption ${firstName}?`}
                className='shareCaption'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                ref={textarea}
              />

              <div style={{ margin: '0 auto' }}>
                <div className='shareImgContainer'>
                  <img
                    className='shareImg'
                    src={`${url}/posts/file/${filename}`}
                    alt='shareImg'
                  />
                </div>
              </div>

              <div className='shareRightBottom'>
                <button
                  className={`btn shareButton ${posting && 'sharing'}`}
                  type='button'
                  onClick={() => handlePostUpdate(updateCreds)}
                  disabled={posting}
                >
                  Save
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
      </div>
    </div>
  );
};

export default ImageEdit;
