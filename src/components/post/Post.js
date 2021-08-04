import React, { useEffect, useReducer, useState } from 'react';
import { Favorite, FavoriteBorder, MoreVert } from '@material-ui/icons';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import './post.css';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/authContext/authContext';
import Comment from '../comment/Comment';
import { likeCounter } from '../../helper';
import reducer from './postReducer';
import { COMMENT_TOGGLE, MAIN_USER_LIKES, USER_FETCHED } from '../../constants';
import OptionModal from '../optionsModal/OptionModal';
import { IconButton } from '@material-ui/core';
import ShowComments from '../showComments/ShowComments';

function Post({ post }) {
  const {
    caption,
    userId,
    fileId,
    likes,
    comments,
    filename,
    isDp,
    createdAt,
    _id,
  } = post;
  const { user: mainUser } = useGlobalContext();

  // post reducer starts here
  const initialState = {
    user: {},
    like: likes.length,
    isLiked: false,
    postComments: comments,
    isComment: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, like, isLiked, postComments, isComment } = state;
  const sortedComments = postComments.reverse();
  // post reducer ends here

  const likeCredentials = { ...state, dispatch, _id, uid: mainUser._id };

  // fetchs user of this post
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/users?userId=${userId}`);
      const userData = await response.json();
      dispatch({ type: USER_FETCHED, payload: userData });
    };

    fetchUser();
  }, [userId]);

  // checks if the logged user liked this post
  useEffect(() => {
    if (likes.includes(mainUser._id)) {
      dispatch({ type: MAIN_USER_LIKES });
    }
  }, [likes, mainUser._id]);

  // options modals goes here

  const [isModal, setIsModal] = useState(false);
  const splitDate = format(createdAt).split(' ');
  const splitFormat = splitDate[1].split('');
  let createDate = splitDate[0] + splitFormat[0];

  if (format(createdAt) === 'just now') {
    createDate = 'just now';
  }

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link
              to={`/${user.username}`}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                className='postProfileImg'
                src={
                  user.dpImage
                    ? `/posts/file/${user.dpImage}`
                    : `/assets/persons/${
                        user.gender === 'Female'
                          ? 'noAvatarFemale.png'
                          : 'noAvatar.jpg'
                      }`
                }
                alt=''
              />
            </Link>
            <div className='postTopLeftTop'>
              <span className='postUsername'>
                <Link
                  to={`/${user.username}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {user?.firstName + ' ' + user?.lastName}
                </Link>
                <span className='postType'>
                  {isDp
                    ? `Updated ${
                        mainUser.gender == 'Male'
                          ? 'his'
                          : mainUser.gender == 'Female'
                          ? 'her'
                          : 'their'
                      } profile picture`
                    : 'Uploaded a post'}
                </span>
                <span className='postDate'>{createDate}</span>
              </span>
              <span className='username'>@{user.username}</span>
            </div>
          </div>
        </div>

        <div className='postCenter'>
          <span className='postText'>{caption}</span>
          <div className='postImgBack'>
            <img
              className={isDp ? 'dpImage postImg' : 'postImg'}
              src={`/posts/file/${filename}`}
              alt='dp'
            />
          </div>
        </div>

        <div className='postBottom'>
          <div className='postBottomLeft'>
            {isLiked ? (
              <Favorite
                className='likeIcon'
                onClick={() => likeCounter(likeCredentials)}
              />
            ) : (
              <FavoriteBorder
                className='likeIcon'
                onClick={() => likeCounter(likeCredentials)}
              />
            )}
            <span className='postLikeCounter'>
              {isLiked && like === 1
                ? 'You like it'
                : isLiked && like > 1
                ? `You and ${like - 1} other people like it`
                : like === 0
                ? 'Be the first to like'
                : `${like} people like it`}
            </span>
          </div>
          {/* <div className='divider'></div> */}
          <div
            className='postBottomRight'
            onClick={() => dispatch({ type: COMMENT_TOGGLE })}
          >
            <ChatBubbleOutlineIcon
              className='likeIcon'
              style={{ color: 'black' }}
            />
            <span className='postCommentText'>
              {postComments.length} comments
            </span>
          </div>
          {userId === mainUser._id && (
            <div className='postBottomRightMore'>
              <IconButton onClick={() => setIsModal(!isModal)}>
                <MoreVert />
              </IconButton>
              {isModal && (
                <OptionModal
                  postId={_id}
                  userId={mainUser._id}
                  fileId={fileId}
                />
              )}
            </div>
          )}
        </div>
        <Comment user={mainUser} postId={_id} dispatch={dispatch} />
      </div>
      {isComment && (
        <div className='showComment'>
          {sortedComments.map((comment) => (
            <ShowComments
              comments={comment}
              postId={_id}
              key={comment.commentId}
              dispatch={dispatch}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
