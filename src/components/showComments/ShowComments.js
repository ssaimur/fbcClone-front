import { Delete } from '@material-ui/icons';
import React, { useState } from 'react';
import { useGlobalContext } from '../../context/authContext/authContext';
import { format } from 'timeago.js';
import './showComments.css';
import { Link } from 'react-router-dom';
import CommentModal from '../commentModal/CommentModal';

const ShowComments = ({ comments, postId, dispatch }) => {
  const { user } = useGlobalContext();
  const { userId, username, userDp, comment, commentId, createdAt, name } =
    comments;

  const [showModal, setShowModal] = useState(false);

  const splitDate = format(createdAt).split(' ');
  const splitFormat = splitDate[1].split('');
  let createDate = splitDate[0] + splitFormat[0];

  if (format(createdAt) === 'just now') {
    createDate = 'just now';
  }

  return (
    <div className='comments'>
      <div className='commentsLeft'>
        <Link to={`/${username}`}>
          <img
            className='profileImg commentDp imageSmall'
            src={
              userDp
                ? `/posts/file/${userDp}`
                : `/assets/persons/${
                    user.gender === 'Female'
                      ? 'noAvatarFemale.png'
                      : 'noAvatar.jpg'
                  }`
            }
            alt='dp'
          />
        </Link>
      </div>
      <div className='commentsCenter'>
        <div className='commentsCenterTop'>
          <Link
            to={`/${username}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <span className='commentName'>{name}</span>
          </Link>
          <span className='postDate commentDate'>{createDate}</span>
        </div>
        <div className='commentsCenterBottom'>
          <span className='commentComment'>{comment}</span>
        </div>
      </div>
      {user._id === userId && !showModal && (
        <div className='commentsRight' onClick={() => setShowModal(!showModal)}>
          <Delete />
        </div>
      )}
      {showModal && (
        <CommentModal
          postId={postId}
          commentId={commentId}
          toggle={setShowModal}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default ShowComments;
