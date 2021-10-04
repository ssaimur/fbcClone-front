import React, { useEffect, useReducer, useState, useRef } from 'react';
import { MoreVert } from '@material-ui/icons';
import { AiOutlineFire, AiFillFire } from 'react-icons/ai';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import './post.css';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/authContext/authContext';
import Comment from '../comment/Comment';
import { formatDate, likeCounter } from '../../helper';
import reducer from './postReducer';
import url, {
  COMMENT_TOGGLE,
  MAIN_USER_LIKES,
  USER_FETCHED,
} from '../../constants';
import OptionModal from '../optionsModal/OptionModal';
import { IconButton } from '@material-ui/core';
import ShowComments from '../showComments/ShowComments';
import WhoLikedModal from '../whoLikedModal/WhoLikedModal';
import { LoaderHeader } from '../../contentLoader';
import ImageEdit from '../imageEdit/ImageEdit';

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

  const { user: currentUser } = useGlobalContext();

  // post reducer starts here
  const initialState = {
    user: {},
    like: [...likes],
    isLiked: false,
    postComments: comments,
    isComment: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, like, isLiked, postComments, isComment } = state;
  const sortedComments = postComments.sort(
    (c1, c2) => new Date(c2.createdAt) - new Date(c1.createdAt)
  );
  // post reducer ends here

  const likeCredentials = { ...state, dispatch, _id, uid: currentUser._id };

  // fetchs user of this post

  const [fetchingUser, setFetchingUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setFetchingUser(true);
      const response = await fetch(`${url}/users?userId=${userId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      const userData = await response.json();
      dispatch({ type: USER_FETCHED, payload: userData });
      setFetchingUser(false);
    };

    fetchUser();
  }, [userId]);

  // checks if the logged user liked this post
  useEffect(() => {
    if (likes.includes(currentUser._id)) {
      dispatch({ type: MAIN_USER_LIKES });
    }
  }, [likes, currentUser._id]);

  // options modals goes here

  const [isModal, setIsModal] = useState(false);
  const [showWhoLiked, setShowWhoLiked] = useState(false);
  const [showImageEdit, setShowImageEdit] = useState(false);

  const deleteCreds = {
    postId: _id,
    userId: currentUser._id,
    fileId: fileId,
  };

  const updateCreds = {
    filename,
    show: showImageEdit,
    postId: _id,
    caption,
    setShow: setShowImageEdit,
  };

  // making the comment animation
  const commentRef = useRef(null);
  const commentContainerRef = useRef(null);

  useEffect(() => {
    const commentsHeight = commentRef.current.getBoundingClientRect().height;
    if (isComment) {
      commentContainerRef.current.style.height = `${commentsHeight}px`;
    } else {
      commentContainerRef.current.style.height = '0px';
    }
  }, [isComment, postComments.length]);
  // comment animation ends here

  /**
   *  profileImg height and width
   */

  const postCenter = useRef(null);
  const [width, setWidth] = useState(0);

  const postWidth = postCenter.current?.getBoundingClientRect().width;
  useEffect(() => {
    if (postWidth >= 480) {
      return setWidth((500 / 100) * 80);
    }
    setWidth((postWidth / 100) * 80);
  }, [postWidth]);

  return (
    <div className='post'>
      <div className='postWrapper'>
        {/* post top start here */}

        {fetchingUser ? (
          <LoaderHeader />
        ) : (
          <div className='postTop'>
            <div className='postTopLeft'>
              <Link
                to={`/${user.username}`}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <img
                  className='profileImg postProfileImg'
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
                />
              </Link>
              <div className='postTopLeftTop'>
                <span className='postUsername'>
                  <Link
                    to={`/${user.username}`}
                    style={{ textDecoration: 'none', color: '#78afd9' }}
                  >
                    {(user.firstName || '') + ' ' + (user.lastName || '')}
                  </Link>
                  <span className='postType'>
                    {isDp
                      ? `Updated ${
                          user.gender === 'Male'
                            ? 'his'
                            : user.gender === 'Female'
                            ? 'her'
                            : ''
                        } DP`
                      : 'Uploaded a post'}
                  </span>
                  <span className='postDate'>
                    {formatDate(format, createdAt)}
                  </span>
                </span>
                <span className='username'>@{user.username}</span>
              </div>
            </div>
          </div>
        )}

        {/* post top ends here */}

        {/* post center starts here */}

        <div className='postCenter' ref={postCenter}>
          {caption && <div className='postText'>{caption}</div>}

          {filename && (
            <img
              className={`postImg ${isDp && 'profileImg'}`}
              style={{
                [isDp && 'height']: `${width}px`,
                [isDp && 'width']: `${width}px`,
                display: 'block',
                margin: '0 auto',
                [isDp && 'objectFit']: 'cover',
              }}
              src={`${url}/posts/file/${filename}`}
              alt='dp'
            />
          )}
        </div>

        {/* post center ends here */}

        {/* post bottom starts here */}

        <div className='postBottom'>
          <div className='postBottomLeft'>
            {isLiked ? (
              <AiFillFire
                className='likeIcon'
                onClick={() => likeCounter(likeCredentials)}
              />
            ) : (
              <AiOutlineFire
                className='likeIcon'
                onClick={() => likeCounter(likeCredentials)}
              />
            )}
            <span
              className='postLikeCounter'
              onClick={() => setShowWhoLiked(like.length > 0 && true)}
            >
              {isLiked && like.length === 1
                ? 'You fired it'
                : isLiked && like.length > 1
                ? `You and ${like.length - 1} other people fired it`
                : like.length === 0
                ? 'Be the first to fire'
                : `${like.length} people fired it`}
            </span>
          </div>

          <div
            className='postBottomRight'
            onClick={() => dispatch({ type: COMMENT_TOGGLE })}
          >
            <ChatBubbleOutlineIcon
              className='likeIcon'
              style={{ color: 'white' }}
            />
            <span className='postCommentText'>
              {postComments.length} comment{postComments.length > 1 && 's'}
            </span>
          </div>
          {userId === currentUser._id && (
            <div className='postBottomRightMore'>
              <IconButton
                onClick={() => {
                  return setIsModal(!isModal);
                }}
              >
                <MoreVert className='moreIcon' />
              </IconButton>
              {isModal && (
                <OptionModal
                  deleteCreds={deleteCreds}
                  updateCreds={updateCreds}
                />
              )}
            </div>
          )}
        </div>

        {/* post Bottom ends here */}

        <Comment user={currentUser} postId={_id} dispatch={dispatch} />
      </div>

      <div className='postComments' ref={commentContainerRef}>
        <div ref={commentRef}>
          {sortedComments.map((comment) => (
            <ShowComments
              comments={comment}
              postId={_id}
              key={comment.commentId}
              dispatch={dispatch}
            />
          ))}
        </div>
      </div>
      {showWhoLiked && (
        <WhoLikedModal
          likes={like}
          show={showWhoLiked}
          setShow={setShowWhoLiked}
        />
      )}
      {showImageEdit && <ImageEdit {...updateCreds} />}
    </div>
  );
}

export default Post;
