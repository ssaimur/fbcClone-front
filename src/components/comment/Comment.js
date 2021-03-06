import { CircularProgress } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import React, { useState } from 'react';
import { COMMENT_ADDED } from '../../constants';
import url from '../../constants';
import './comment.css';

const Comments = ({ user, postId, dispatch }) => {
  const { dpImage, firstName, lastName, _id, username } = user;
  const [isSending, setIsSending] = useState(false);
  const [comment, setComment] = useState('');

  const commentCreds = {
    userId: _id,
    name: firstName + ' ' + lastName,
    userDp: dpImage,
    comment,
    username,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const response = await fetch(`${url}/posts/comment/${postId}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(commentCreds),
    });
    const resData = await response.json();
    commentCreds.commentId = resData.buf;

    dispatch({ type: COMMENT_ADDED, payload: commentCreds });
    setComment('');
    setIsSending(false);
  };

  return (
    <div className='comment'>
      <div className='commentLeft'>
        <img
          className='profileImg commentDp'
          src={
            dpImage
              ? `${url}/posts/file/${dpImage}`
              : `/assets/persons/${
                  user.gender === 'Female'
                    ? 'noAvatarFemale.png'
                    : 'noAvatar.jpg'
                }`
          }
          alt='dp'
        />
      </div>

      <form className='commentRight' onSubmit={handleSubmit}>
        <div className='commentbar'>
          <input
            placeholder='Add a comment...'
            className='commentInput'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        {isSending ? (
          <button>
            <CircularProgress className='commentLoading' size={30} />
          </button>
        ) : (
          <button type='submit'>
            <Send className='commentIcon' />
          </button>
        )}
      </form>
    </div>
  );
};

export default Comments;
