import React, { useEffect } from 'react';
import './feed.css';
import { useGlobalContext } from '../../context/authContext/authContext';
import Post from '../post/Post';
import Share from '../share/Share';
import { BsFilePost } from 'react-icons/bs';
import { useGlobalPostContext } from '../../context/postContext/postContext';
import { AUTH_REQUIRED, FETCH_POSTS, FETCH_STARTS } from '../../constants';
import Loader from '../../contentLoader';
import { Link } from 'react-router-dom';

function Feed({ username, explorePosts, firstName }) {
  const { user, dispatch: authDispatch } = useGlobalContext();
  const { posts, dispatch, postFetching } = useGlobalPostContext();

  // first checks where it is going to be rendered (news feed or profile)
  // then fetches all posts according to that
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_STARTS });
      const response = username
        ? await fetch(`/posts/profile/${username}`)
        : explorePosts
        ? await fetch('/posts/explore')
        : await fetch(`/posts/newsfeed/${user._id}`);
      const resData = await response.json();

      if (resData.statusCode === 401) {
        return authDispatch({ type: AUTH_REQUIRED });
      }
      dispatch({ type: FETCH_POSTS, payload: resData });
    };

    fetchData();
  }, [username, user._id, authDispatch, dispatch, explorePosts]);

  return (
    <div className='container feed'>
      <div className='wrapper'>
        {!username && !explorePosts && <Share />}

        {firstName && (
          <div className='sticker'>
            <p className='profileIndicatorText'>
              {username === user.username ? 'Your' : `${firstName}'s`} timeline.
              ({posts.length} post{posts.length > 1 && 's'})
            </p>
          </div>
        )}

        {postFetching ? (
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <Loader />
            <Loader />
          </div>
        ) : posts.length > 0 ? (
          posts.map((item) => {
            return <Post key={item._id} post={item} />;
          })
        ) : (
          <div className='noPosts'>
            <BsFilePost />
            <p>No posts yet</p>
            {!username && username !== user.username && (
              <div className='noPostsBtn'>
                <Link to='/people'>
                  <button className='btn'>Find people</button>
                </Link>
                <Link to='/explore'>
                  <button className='btn'>Explore posts</button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      <div className='invisibleDiv'></div>
    </div>
  );
}

export default Feed;
